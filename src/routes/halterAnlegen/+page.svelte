

<script>
      import { Input, Label, Button
       } from 'flowbite-svelte';
    import '../standart.css';
    
</script>


<header>
    <nav>
      <a style="margin-left:95%;" href="/" >Abmelden</a>
    </nav>
  </header>
  <h1 class = "titel">Halter anlegen</h1>
  
  <br><br>

  <form style="margin-left: 5%; max-width: 50%;" method="POST">

    <div style="max-width: 50%;">
        <Label  for="firstname">Vorname</Label>
        <Input type="text" id="firstname" name="firstName" required />

        <br>
        <Label  for="lastname">Nachname</Label>
        <Input type="text" id="lastname" name = "lastName"   required />   
    </div>

    <br>
    <h2>Adresse</h2>
    <br>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">

        <div style="max-width: 80%;">
            <Label  for="street">Straße</Label>
            <Input type="text" id="street" name="street"  required />
        </div>

        <div style="max-width: 80%;">
            <Label  for="housnr">Haus-Nr</Label>
            <Input  id="housnr" name="houseNumber"  required />
        </div>

        <div style="max-width: 80%;">
            <Label  for="plz">Postleitzahl</Label>
            <Input id="plz" name="zipCode"  required />
        </div>

        <div style="max-width: 80%;">
            <Label  for="ort">Ort</Label>
            <Input type="text" id="ort" name="place"  required />
        </div>
    </div>
    <br>
    <h2>Kontaktdaten</h2>
    <br>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">

        <div style="max-width: 80%;">
            <Label  for="email">E-Mail Adresse</Label>
            <Input type="email" id="email" name="email"   required />
        </div>

        <div style="max-width: 80%;">
            <Label  for="phone">Tel. Nr</Label>
            <Input  id="phone" name="phoneNumber"   required />
        </div>

    </div>
    <br>
    <br>

    <Button type="submit" style="min-width: 30%;" >
        Halter anlegen
    </Button>
  </form>
