import {  redirect } from '@sveltejs/kit';
import { setVetID, getVetID, setToken } from './authService.js';






export const actions = {
	default: async ({  request }) => {
		const loginData = await request.formData();
        console.log(loginData)
        let statusCode = false;
        try {
            const response = await fetch('http://131.173.88.199:8080/REST-1.0-SNAPSHOT/api/users/login', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                username: loginData.get('username'),
                password: loginData.get('password')
              },
             
            });
            
      
            if (response.ok) {
              const token = response.headers.get('Authorization');
              const vetID = response.headers.get('vetID');
              console.log('VetID', vetID);
              console.log('Bearer-Token:', token);
              statusCode = true;
              setVetID(vetID)
              setToken(token)
           
              
            } else {
              console.error('Login fehlgeschlagen!');
              
            }
        } catch (error) {
            console.error('Fehler beim Anmelden:', error);
        }

        if (statusCode == true){
          if (getVetID() === '-1') {
            throw redirect(303,'/menueRechnungsmitarbeiter');
          } else {
            throw redirect(303,'/menueTierarzt');
        }

        }
      
	}
    
};







