
<script>
    import { Input, Label, Button, Select,
      TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';
    import '../standart.css';
    
    let selected;
  let tierart = [
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
  let items = [
  { id: 1, firstname:'Max' , lastname : 'Musterman' , street: 'testhausen' , houseNr : 22},
  { id: 1, firstname:'Lisa' , lastname : 'Mayer' , street: 'testhausen' , houseNr : 21}
  ];
  $: filteredItems = items.filter((item) => item.lastname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
let selectedItem ={};

</script>
<header>
  <nav>
    <a style="margin-left:95%;" href="/" >Abmelden</a>
  </nav>
</header>
<h1 class = "titel">Patient anlegen</h1>

<br><br>

<form style="margin-left:5%;  max-width: 50%;" >
    <div  >
        <Label>
            Tierart wählen
            <Select   items={tierart} bind:value={selected} />
        </Label>
    
        <br>

        <Label  for="tiername">Tiername</Label>
        <Input type="text" id="tiername"  required />
    
        <br>
    
        <Label for="idn-nr" >Ident Nr.</Label>
        <Input type="text" id="idn-nr"  required />
    
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
                {#each filteredItems as item}
                  <TableBodyRow style=" max-height: 100px; overflow-y: auto;" on:click={() => selectedItem = item}>
                    <TableBodyCell>{item.id}</TableBodyCell>
                    <TableBodyCell>{item.firstname}</TableBodyCell>
                    <TableBodyCell>{item.lastname}</TableBodyCell>
                    <TableBodyCell>{item.street}</TableBodyCell>
                    <TableBodyCell>{item.houseNr}</TableBodyCell>
                  </TableBodyRow>
                {/each}
              </TableBody>
              <div slot="header">
                <br>
                <Button type="submit" style="min-width: 30%; " href= "../halterAnlegen">Halter anlegen</Button>
              </div>
          </TableSearch>
        </div>
    
        <br><br>
       
          
    </div>
    <br>

    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
    
      <div>
        <Label for="itemMaker" >Vorname</Label>
        <Input type="text" id="itemMaker" bind:value={selectedItem.firstname} readonly />
      </div>

      <div>
        <Label for="itemMaker" >Nachname</Label>
        <Input type="text" id="itemMaker" bind:value={selectedItem.lastname} readonly />
      </div>
      
    </div>
    
    <br><br>

    <Button type="submit" style="min-width: 50%; ">Patienten anlegen</Button>
    
  

</form>





