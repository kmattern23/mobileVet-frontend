<script>
  import { Input, Label, Button, Select,
      TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';
  import '../standart.css'; 
 

  let animalType = [
    { value: 'Pferd', name: 'Pferd' },
    { value: 'Hausequiden', name: 'Hausequiden' },
    { value: 'Kameliden', name: 'Kameliden' },
    { value: 'Rind', name: 'Rind' },
    { value: 'Kalb', name: 'Kalb' },
    { value: 'kleine Hauswiederkäuer', name: 'kleine Hauswiederkäuer' },
    { value: 'Ferkel', name: 'Ferkel' },
    { value: 'Mastschwein', name: 'Mastschwein' },
    { value: 'Zuchtschwein', name: 'Zuchtschwein' },
    { value: 'Pelztiere', name: 'Pelztiere' },
    { value: 'Zuchtkaninchen', name: 'Zuchtkaninchen' },
    { value: 'Mastkaninchen', name: 'Mastkaninchen' },
    { value: 'Nutzgeflügel', name: 'Nutzgeflügel' },
    { value: 'Rassegeflügel', name: 'Rassegeflügel' },
    { value: 'Volierenvögel', name: 'Volierenvögel' },
    { value: 'Stubenvögel', name: 'Stubenvögel' },
    { value: 'Großpsittaciden', name: 'Großpsittaciden' },
    { value: 'Hund', name: 'Hund' },
    { value: 'Katze', name: 'Katze' },
    { value: 'Frettchen', name: 'Frettchen' },
    { value: 'Heimsäugetiere', name: 'Heimsäugetiere' },
    { value: 'Reptilien', name: 'Reptilien' },
    { value: 'Amphibien', name: 'Amphibien' },
    { value: 'Fische', name: 'Fische' },
    { value: 'Nicht domestizierte Tiere', name: 'Nicht domestizierte Tiere (wilde Tiere)' }
  ];
  let searchTerm = '';
  export let data;
  const {owner} = data;
  $: filteredOwner = owner.filter((item) => item.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  let selectedItem ={};
  let species;  

</script>
<header>
  <nav>
    <a style="margin-left:95%;" href="/" >Abmelden</a>
  </nav>
</header>
<h1 class = "titel">Patient anlegen</h1>

<br><br>

<form style="margin-left:5%;  max-width: 50%;"  method="POST">
    <div  >
        <Label >
            Tierart wählen
            <Select   items={animalType} bind:value={species} />
        </Label>
        <input type="hidden" name="species" value="{species}">
        <br>

        <Label  for="tiername">Tiername</Label>
        <Input type="text" id="tiername" name="name" required />
    
        <br>
    
        <Label for="idn-nr" >Ident Nr.</Label>
        <Input type="text" id="idn-nr" name="identNumber" required />
    
        <br><br>
        
        <h2>Halter auswählen</h2>
        <br>
        <div class="container">
        <TableSearch placeholder="suche nach nachname" hoverable={true} bind:inputValue={searchTerm}>
            <TableHead>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>Vorname</TableHeadCell>
              <TableHeadCell>Nachname</TableHeadCell>
              <TableHeadCell>Straße</TableHeadCell>
              <TableHeadCell>Hausnummer</TableHeadCell>
            </TableHead>
              <TableBody >
                {#each filteredOwner as item}
                  <TableBodyRow style=" max-height: 100px; overflow-y: auto;" on:click={() => selectedItem = item}>
                    <TableBodyCell>{item.ownerID}</TableBodyCell>
                    <TableBodyCell>{item.firstName}</TableBodyCell>
                    <TableBodyCell>{item.lastName}</TableBodyCell>
                    <TableBodyCell>{item.street}</TableBodyCell>
                    <TableBodyCell>{item.houseNumber}</TableBodyCell>
                  </TableBodyRow>
                {/each}
              </TableBody>
              <div slot="header">
                <br>
                <Button  style="min-width: 30%; " href= "../halterAnlegen">Halter anlegen</Button>
              </div>
          </TableSearch>
        </div>
    
        <br><br>
       
          
    </div>
    <br>

    <div style="max-width: 49%;">
      <Label for="itemMaker" >Owner ID</Label>
      <Input type="text" id="itemMaker" name="ownerID" bind:value={selectedItem.ownerID} readonly />
    </div>
    <br>

    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
    
      <div>
        <Label for="itemMaker" >Vorname</Label>
        <Input type="text" id="itemMaker" bind:value={selectedItem.firstName} readonly />
      </div>

      <div>
        <Label for="itemMaker" >Nachname</Label>
        <Input type="text" id="itemMaker" bind:value={selectedItem.lastName} readonly />
      </div>
      
    </div>
    
    <br><br>

    <Button type="submit" style="min-width: 50%;" >Patienten anlegen</Button>
    
  

</form>