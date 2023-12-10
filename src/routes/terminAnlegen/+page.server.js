import {  getToken, getVetID } from '../authService.js';
import {backend_url} from '$env/static/private';
import fetch from 'node-fetch';
import { redirect } from '@sveltejs/kit';
const base = backend_url;

// laden aller benötigten Daten
export const load = async () =>{
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
    //laden der Patienten 

    const fetchPatient = async() => {
        const result = await fetch(`${base}/patient/getAll`, {
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json',
              }
        });
        const data = await result.json()
        return data;
    }
    

    //aufruf der funktiionen um daten zurückzugeben
    const drugsData = await fetchDrugs();
    const gotData = await fetchGOT();
    const patientData = await fetchPatient();

    // Logge den Wert von loadedData in der Konsole
  //console.log('loadedData:', { drugs: drugsData });
  //console.log('loadedData:', {got : gotData})
  //console.log('loadedData:', { patient : patientData})

    //return um daten weiter zu verabreiten

    return{
        drugs : drugsData,
        gots : gotData,
        patients : patientData,
    }
}

export const actions ={
    default : async ({request}) =>{
        const requestDataAppointent = await request.formData();
        let date = requestDataAppointent.get('date')
        let selectedTaetigkeiten  = []
        selectedTaetigkeiten = JSON.parse(requestDataAppointent.get('selectedTaetigkeiten'))
        let priceVariant = selectedTaetigkeiten.map(item => item.option)
        let gotIDs = selectedTaetigkeiten.map(item => item.gotID)
        let diagnose = requestDataAppointent.get('diagnose')
        let patient = requestDataAppointent.get('selectedPatientId')
        let picturePath = null
        let drugs = []
        drugs = JSON.parse(requestDataAppointent.get('selectedDrugs'))
        let drugIDs = drugs.map(item => item.drugID)
        let vetID = getVetID()
        let statusCode = false;
        try{
            const appointmentData ={
                date,
                priceVariant,
                picturePath,
                diagnose,
                patient,
                vetID,
                drugIDs,
                gotIDs
            };
            const response = await fetch(`${base}/appointment/create`, {
                method: 'POST',
                headers: {
                  'Authorization': getToken(),
                  'Content-Type': 'application/json',
                  
                },
                body: JSON.stringify(appointmentData),
              });
            
              if (response.ok) {
                // Erfolgreiche Antwort vom Server
                console.log('Daten erfolgreich gesendet!');
                statusCode=true;
                
              } else {
                // Fehlerhafte Antwort vom Server
                console.error('Fehler beim Senden der Daten:', response.statusText);
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