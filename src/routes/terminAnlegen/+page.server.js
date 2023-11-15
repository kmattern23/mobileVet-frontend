import {backend_url} from '$env/static/private';
import fetch from 'node-fetch';

const base = backend_url;

// laden aller benötigten Daten
export const load = async () =>{
    //laden der Medikamente
    const fetchDrugs = async() =>{
        const result = await fetch(`${base}/drug/getAll`);
        const data = await result.json()
        return data;
    }
    //laden der GOT Tabelle
    const fetchGOT = async() =>{
        const result = await fetch(`${base}/got/getAll`);
        const data = await result.json()
        return data;
    }
    //laden der Patienten 

    const fetchPatient = async() => {
        const result = await fetch(`${base}/patient/getAll`);
        const data = await result.json()
        return data;
    }

    //aufruf der funktiionen um daten zurückzugeben
    const drugsData = await fetchDrugs();
    const gotData = await fetchGOT();
    const patientData = await fetchPatient();

    // Logge den Wert von loadedData in der Konsole
  console.log('loadedData:', { drugs: drugsData });
  console.log('loadedData:', {got : gotData})
  console.log('loadedData:', { patient : patientData})

    //return um daten weiter zu verabreiten

    return{
        drugs : drugsData,
        got : gotData,
        patient : patientData,
    }
}