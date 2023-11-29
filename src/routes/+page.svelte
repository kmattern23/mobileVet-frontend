<script>
    import './standart.css';
    import { Navbar,  NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    import { Input, Label,  Button } from 'flowbite-svelte';

    let username = '';
    let password = '';

    const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch('http://131.173.88.199:8080/REST-1.0-SNAPSHOT/api/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        username: username,
        password: password
      },
     
    });

    if (response.ok) {
      console.log(response.headers.get('Authorization'))
      const token = response.headers.get('Authorization');
      
      console.log('Bearer-Token:', token)
  
    } else {
      console.error('Login fehlgeschlagen!');
    }
  } catch (error) {
    console.error('Fehler beim Anmelden:', error);
  }
};


</script>

<svelte:head>
    <title>Die mobile Tierarztpraxis</title>
</svelte:head>


<!-- diese nutze ich später um die jeweiligen seiten zu testen-->
<Navbar let:NavContainer color="primary">
    <NavContainer class="border px-5 py-2 rounded-lg bg-white dark:bg-gray-600">
     
      <NavHamburger />
      <NavUl>
        <NavLi href="/menueTierarzt">menue Tierarzt</NavLi>
        <NavLi href="/menueRechnungsmitarbeiter">menue Rechnungsmitarbeiter</NavLi>
        
      </NavUl>
    </NavContainer>
  </Navbar>


  <form class="center" on:submit={handleSubmit}>

    <h1 class="titel" style = "border-radius: 15px; " > Die mobile Tierarztpraxis</h1>
    <br><br> 
    <div>
        <Label for="login" >Login-ID</Label>
        <Input type="text" id="login" style="width: 200px;" autocomplete="off" required bind:value={username}/>
      </div>
      <br><br> 
     <div>
      <Label for="confirm_password">Confirm password</Label>
      <Input type="password" id="confirm_password" placeholder="" required bind:value={password}/>
      </div> 
    <br><br>
    <Button type="submit">Anmelden</Button>
  </form>