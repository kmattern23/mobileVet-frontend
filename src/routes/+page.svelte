<script>
  import './standart.css';
  import { Input, Label,  Button } from 'flowbite-svelte'

  export let data;
  const {statusCode} = data;
  
</script>

<svelte:head>
    <title>Die mobile Tierarztpraxis</title>
</svelte:head>

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