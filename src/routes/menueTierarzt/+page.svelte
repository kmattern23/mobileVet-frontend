<script>
    import '../standart.css';
    import { Button } from 'flowbite-svelte';
</script>

<form >
   
    <h1 class = "titel horizontalZentrieren">Menü</h1>
    <header>
        <nav>
          <a style="margin-left:95%;" href="/" >Abmelden</a>
        </nav>
      </header>
</form>


<br><br>
<form  style="text-align: center;" >
    <nav >
        <Button style="min-width: 25%;" href="../patientAnlegen">Patient anlegen</Button>
        <br><br>
        <Button style="min-width: 25%;" href="../terminAnlegen" >Behandlungstermin erstellen</Button>
        <br><br>
        <Button style="min-width: 25%;" >Behandlungstermin bearbeiten</Button>
    </nav>
    
 
</form>

      
      
