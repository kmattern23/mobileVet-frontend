import { backend_url } from '$env/static/private';
import fetch from 'node-fetch';
import { getToken } from '../authService.js';


const base = backend_url;


export const load = async () => {
    const fetchUnbilledAppointments = async () =>{
        const result = await fetch(`${base}/billing/getUnbilled`,{
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json',
            }      
        });
        const data = await result.json()

        return data;
    }
    const unbilledAppointment = await fetchUnbilledAppointments();

    return {
        unbilledAppointment : unbilledAppointment,
    }

    
}

export const actions = {
    default: async ({ request }) => {
        try {
            const requestDates = await request.formData();
            console.log(requestDates);
            
            let startDate = requestDates.get('startDate');
            let endDate = requestDates.get('endDate');

            const fetchOffeneRechnung = async () => {
               const result = await fetch(`${base}/billing/getBilling/${startDate}/${endDate}`, {
                    headers: {
                        'Authorization': getToken(),
                        'Content-Type': 'application/json',
                    }
                });
                const data = await result.json();
                return data;
            }

            const rechnungen = await fetchOffeneRechnung();

            console.log(rechnungen)
           // console.log(rechnungen.lastName);

           rechnungen.forEach(rechnungen => {
    const vetID = rechnungen.vetID;
    console.log(`Vet ID: ${vetID}`);
    
});


            
            } catch (error) {
            console.error('Error:', error);
            return {
                error: 'fetch anfrage fehlerhaft', 
            };
            }
    }
}
