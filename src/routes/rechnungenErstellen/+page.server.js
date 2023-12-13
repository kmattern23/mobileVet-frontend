import {backend_url} from '$env/static/private';
import fetch from 'node-fetch';
import {  getToken } from '../authService.js';
export const actions ={
    default : async ({request})=>{

        const requestDates = await request.formData();
        console.log(requestDates);

        let startDate = requestDates.get('startDate');
        let endDate = requestDates.get('endDate')

            const fetchOffeneRechnung = async() =>{
                const result = await fetch(`${base}/getBilling/${startDate}/${endDate}`, {
                    headers: {
                        'Authorization': getToken(),
                        'Content-Type': 'application/json',
                      }
                });
                const data = await result.json()
                return data;
            }
          
    }
}