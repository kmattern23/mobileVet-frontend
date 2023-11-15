

<script>
      import { Input, Label, Button
       } from 'flowbite-svelte';
    import '../standart.css';
    


let firstName = '';
let lastName = '';
let street = '';
let houseNumber = '';
let zipCode = '';
let place = '';
let email = '';
let phoneNumber = '';

const halterAnlegen = async () => {
    try {
      const formData = {
        lastName,
        firstName,
        place,
        zipCode,
        street,
        houseNumber,
        email,
        phoneNumber
      };

      console.log('Anfrage Body:', formData);
      const response = await fetch(`http://131.173.88.199:8080/REST-1.0-SNAPSHOT/api/owner/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Erfolgreiche Antwort vom Server
        console.log('Daten erfolgreich gesendet!');
        
        // Hier die Navigation durchführen
        window.location.href = '../patientAnlegen';
      } else {
        // Fehlerhafte Antwort vom Server
        console.error('Fehler beim Senden der Daten:', response.statusText);
      }
    } catch (error) {
      console.error('Fehler beim Senden der Daten:', error);
    }
  };
</script>


<header>
    <nav>
      <a style="margin-left:95%;" href="/" >Abmelden</a>
    </nav>
  </header>
  <h1 class = "titel">Halter anlegen</h1>
  
  <br><br>

  <form style="margin-left: 5%; max-width: 50%;">

    <div style="max-width: 50%;">
        <Label  for="firstname">Vorname</Label>
        <Input type="text" id="firstname" bind:value ={firstName}  required />

        <br>
        <Label  for="lastname">Nachname</Label>
        <Input type="text" id="lastname" bind:value ={lastName}   required />   
    </div>

    <br>
    <h2>Adresse</h2>
    <br>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">

        <div style="max-width: 80%;">
            <Label  for="street">Straße</Label>
            <Input type="text" id="street" bind:value ={street}  required />
        </div>

        <div style="max-width: 80%;">
            <Label  for="housnr">Haus-Nr</Label>
            <Input  id="housnr" bind:value ={houseNumber}  required />
        </div>

        <div style="max-width: 80%;">
            <Label  for="plz">Postleitzahl</Label>
            <Input id="plz" bind:value={zipCode}  required />
        </div>

        <div style="max-width: 80%;">
            <Label  for="ort">Ort</Label>
            <Input type="text" id="ort" bind:value ={place}   required />
        </div>
    </div>
    <br>
    <h2>Kontaktdaten</h2>
    <br>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">

        <div style="max-width: 80%;">
            <Label  for="email">E-Mail Adresse</Label>
            <Input type="email" id="email" bind:value ={email}   required />
        </div>

        <div style="max-width: 80%;">
            <Label  for="phone">Tel. Nr</Label>
            <Input  id="phone" bind:value ={phoneNumber}   required />
        </div>

    </div>
    <br>
    <br>

    <Button type="submit" style="min-width: 30%;" on:click={halterAnlegen}>
        Halter anlegen
    </Button>
  </form>
