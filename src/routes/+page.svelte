<script>
  import './standart.css';
  import { Navbar,  NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  import { Input, Label,  Button } from 'flowbite-svelte';
  

  export let data;
  const {status} = data;
  if(status == false){
    console.log('FALSCH')
  }
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


  <form class="center" method="POST"  >

    <h1 class="titel" style = "border-radius: 15px; " > Die mobile Tierarztpraxis</h1>
    <br><br> 
    
    <div>
      <Label for="username">Username
        <Input id="username" name="username" 
          type="text" 
          required
          placeholder="User-Name"/>
      </Label>
    </div>
      <br><br> 
     <div>
    	<Label for="password">Password
        <Input id="password" name="password" 
            type="password" 
            placeholder="password"
            required />
      </Label>
      </div> 
    <br><br>
    <Button type="submit">Anmelden</Button>
  </form>