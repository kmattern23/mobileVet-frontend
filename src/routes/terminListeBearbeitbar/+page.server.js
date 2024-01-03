import { backend_url } from '$env/static/private';
import fetch from 'node-fetch';
import {  getToken, getVetID } from '../authService.js';
import { redirect } from '@sveltejs/kit';


const base = backend_url;


export const load = async () => {
    const fetchUnbilledAppointments = async () =>{
        const result = await fetch(`${base}/billing/getUnbilledVet`,{
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json',
            }      
        });
        const data = await result.json()

        return data;
    }
    
     //laden der Medikamente
     const fetchDrugs = async() =>{
        const result = await fetch(`${base}/drug/getAll`, {
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json',
              }
        });
        const data = await result.json()
        return data;
    }
    //laden der GOT Tabelle
    const fetchGOT = async() =>{
        const result = await fetch(`${base}/got/getAll`, {
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json',
              }
        });
        const data = await result.json()
        return data;
    } 
    const drugsData = await fetchDrugs();
    const gotData = await fetchGOT();
    const unbilledAppointment = await fetchUnbilledAppointments();
    
    //console.log(unbilledAppointment)
    
    for (let i = 0; i < unbilledAppointment.length; i++) {
        const result = await fetch(`${base}/patient/get/${unbilledAppointment[i].patient}`,{
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json',
              }
        });
        const patientData = await result.json();
        unbilledAppointment[i].patient = patientData
        //console.log(unbilledAppointment)
    }
    
    return {
        unbilledAppointment : unbilledAppointment,
        drugs : drugsData,
        gots : gotData,
    }

    
}

export const actions ={
    default : async ({request}) =>{
        const requestUpdateDataAppointent = await request.formData();
        //console.log(requestUpdateDataAppointent)
        let appointmentID = requestUpdateDataAppointent.get('appointmentID')
        let date = requestUpdateDataAppointent.get('date')
        let updatedTaetigkeiten  = []
        updatedTaetigkeiten = JSON.parse(requestUpdateDataAppointent.get('updateTaetigkeiten'))
        let priceVariant = updatedTaetigkeiten.map(item => item.option)
        let gotIDs = updatedTaetigkeiten.map(item => item.gotID)
        let diagnose = requestUpdateDataAppointent.get('diagnose')
        let patient = requestUpdateDataAppointent.get('PatientId')
        let image = requestUpdateDataAppointent.get('image')
        let picturePath = null
        let drugs = []
        drugs = JSON.parse(requestUpdateDataAppointent.get('updateDrugs'))
        let drugIDs = drugs.map(item => item.drugID)
        let vetID = getVetID()
        let statusCode = false;   
        console.log(image)
        
        if ( image !== '') {


        // Convert base64 in Blob Object
        const base64Data = image.split(';base64,').pop();
        const binaryString = atob(base64Data);
        const length = binaryString.length;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Erstelle ein Blob-Objekt aus dem Uint8Array
        const blob = new Blob([bytes], { type: 'application/octet-stream' }); 

     
        try{
          const bildupload = await fetch (`${base}/image/uploadImage`,{
            method: 'POST',
            headers: {
              'Authorization': getToken(),
              'Content-Type': 'application/octet-stream',
            },
            body : blob
          });

          if (bildupload.ok) {
            // Erfolgreiche Antwort vom Server
            console.log('Daten erfolgreich gesendet!');
            
            console.log(bildupload.headers.get('content-disposition'))
            const contentDisposition = bildupload.headers.get('content-disposition');
            if (contentDisposition) {
              const start = contentDisposition.indexOf('"') + 1;
              const end = contentDisposition.lastIndexOf('"');
              picturePath = contentDisposition.substring(start, end);
              //console.log(picturePath); // Gibt den Dateinamen aus
            }

            
          } else {
            // Fehlerhafte Antwort vom Server
            console.error('Fehler beim Senden der Daten:', response.statusText);
          }
        } catch (error) {
            console.error('Fehler beim Senden der Daten:', error);
            }

        }  
        try{
            const appointmentData ={
                appointmentID,
                date,
                priceVariant,
                picturePath,
                diagnose,
                patient,
                vetID,
                drugIDs,
                gotIDs
            };
            const response = await fetch(`${base}/appointment/edit`, {
                method: 'POST',
                headers: {
                  'Authorization': getToken(),
                  'Content-Type': 'application/json',
                  
                },
                body: JSON.stringify(appointmentData),
              });
            
              if (response.ok) {
                console.log('Daten erfolgreich gesendet!');
                statusCode=true;
              } else {
                console.error('Fehler beim Senden der Daten: 123', response.statusText);
              }
            console.log(appointmentData)
            } catch (error) {
            console.error('Fehler beim Senden der Daten:', error);
            }
            if(statusCode == true){
                throw redirect(303,'../menueTierarzt');
              }
              
    }
}