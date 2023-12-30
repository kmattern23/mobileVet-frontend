import { redirect } from '@sveltejs/kit';
import { getToken } from '../authService.js';

export const actions ={
    default: async ({ request }) => {
        const reqeustDataOwner = await request.formData();
        console.log(reqeustDataOwner);
        let statusCode = false;
        let firstName = reqeustDataOwner.get('firstName');
        let lastName = reqeustDataOwner.get('lastName');
        let street = reqeustDataOwner.get('street');
        let houseNumber = reqeustDataOwner.get('houseNumber');
        let zipCode = reqeustDataOwner.get('zipCode');
        let place = reqeustDataOwner.get('place');
        let email = reqeustDataOwner.get('email');
        let phoneNumber = reqeustDataOwner.get('phoneNumber');

        try {
            const ownerData = {
              lastName,
              firstName,
              place,
              zipCode,
              street,
              houseNumber,
              email,
              phoneNumber
            };
      
            console.log('Anfrage Body:', ownerData);
            const response = await fetch(`http://131.173.88.199:8080/REST-1.0-SNAPSHOT/api/owner/create`, {
              method: 'POST',
              headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(ownerData),
            });
            
            if (response.ok) {
              // Erfolgreiche Antwort vom Server
              console.log('Daten erfolgreich gesendet!');
              statusCode = true;
              
              //throw redirect(303,'./patinetAnlegen');
              
            } else {
              // Fehlerhafte Antwort vom Server
              console.error('Fehler beim Senden der Daten:', response.statusText);
            }
          } catch (error) {
            console.error('Fehler beim Senden der Daten:', error);
          }

          if(statusCode == true){
            throw redirect(303,'../patientAnlegen');
          }
    }
    
};
