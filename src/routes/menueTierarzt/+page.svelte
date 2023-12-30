<script>
    import '../standart.css';
    import { Button } from 'flowbite-svelte';
    import { logout ,} from '../authService.js';

    
</script>

<form >
   
    <h1 class = "titel horizontalZentrieren">Menü</h1>
    <header>
        <nav>
          <a style="margin-left:95%;" href="/" on:click={logout} >Abmelden</a>
          
        </nav>
      </header>
</form>


<br><br>
<div style="text-align: center;" >
    <Button style="min-width: 25%;" href="../patientAnlegen">Patient anlegen</Button>
    <br><br>
    <Button style="min-width: 25%;" href="../terminAnlegen" >Behandlungstermin erstellen</Button>
    <br><br>
    <Button style="min-width: 25%;" href="../terminListeBearbeitbar">Behandlungstermin bearbeiten</Button>
</div>  
    
    
    
 


      
      
