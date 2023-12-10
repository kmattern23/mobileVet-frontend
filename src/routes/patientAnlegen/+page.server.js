import { redirect } from '@sveltejs/kit';
import {backend_url} from '$env/static/private';
import fetch from 'node-fetch';
import {  getToken } from '../authService.js';

const base = backend_url;

// laden der owner

export const load = async() =>{

    const fetchOwner = async() =>{
        const result = await fetch(`${base}/owner/getAll`, {
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json',
              }
        });
        const data = await result.json();
        return data;
    }

    const ownerData = await fetchOwner();

    // consolen ausgabe
    //console.log('loadedData:' , {owner : ownerData});

    return{
        owner: ownerData,
    }
}

export const actions ={
    default : async ({ request }) => {
        const reqeustDataPatient = await request.formData();
        let statusCode = false;
        let species = reqeustDataPatient.get('species');
        let name = reqeustDataPatient.get('name');
        let identNumber = reqeustDataPatient.get('identNumber');
        let ownerID = reqeustDataPatient.get('ownerID');

        try{
            const patientData = {
              species,
              name,
              identNumber,
              ownerID,
      
            };
            console.log('Anfrage Body:', patientData);
            const response = await fetch(`${base}/patient/create`, {
              method: 'POST',
              headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json',
                
              },
              body: JSON.stringify(patientData),
            });
      
            if (response.ok) {
              // Erfolgreiche Antwort vom Server
              console.log('Daten erfolgreich gesendet!');
              statusCode=true;
              
            } else {
              // Fehlerhafte Antwort vom Server
              console.error('Fehler beim Senden der Daten:', response.statusText);
            }
          } catch (error) {
            console.error('Fehler beim Senden der Daten:', error);
          }
          if(statusCode == true){
            throw redirect(303,'../menueTierarzt');
          }
    }

    
}