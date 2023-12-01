<script>

import { Input, Label, Button, Select, Table,
      TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Textarea,Dropzone  } from 'flowbite-svelte';
import '../standart.css';


export let data;

const {drugs} = data;
const {gots} = data;
const {patients} = data;

let searchTerm = '';
$: filteredPatienten = patients.filter((item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
$: filteredTaetigkeiten = gots.filter((item) => item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
$: filteredMedikamente = drugs.filter((item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
let selectedPatient ={};
let selectedTätigkeit = [];
let selectedMedikament = [];

let currentDate= new Date();
let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
let picturePath = ''; 
let diagnose = ''; 
let got = [...selectedTätigkeit];
let patient = ''; 
let usedDrugs = [...selectedMedikament]; 
let vetID = 1; 
let lastName = 'Doe'; 
let firstName = 'John';

  
$: {
    patient = selectedPatient.patientID
  }




const terminAnlegen = async () =>{
  try {
      const terminData = {
        date,
        picturePath,
        diagnose,
        got,
        patient,
        usedDrugs,
        vetID,
        lastName,
        firstName,

      };

      console.log('Anfrage Body:', terminData);
      const response = await fetch(`http://131.173.88.199:8080/REST-1.0-SNAPSHOT/api/appointment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('token'),
        },
        body: JSON.stringify(terminData),
        
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
}

  

let value = [];
const dropHandle = (event) => {
  value = [];
  event.preventDefault();
  if (event.dataTransfer.items) {
    [...event.dataTransfer.items].forEach((item, i) => {
      if (item.kind === 'file') {
        const file = item.getAsFile();
        value.push(file.name);
        value = value;
      }
    });
  } else {
    [...event.dataTransfer.files].forEach((file, i) => {
      value = file.name;
    });
  }
};

const handleChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    value.push(files[0].name);
    value = value;
  }
};

const showFiles = (files) => {
  if (files.length === 1) return files[0];
  let concat = '';
  files.map((file) => {
    concat += file;
    concat += ',';
    concat += ' ';
  });

  if (concat.length > 40) concat = concat.slice(0, 40);
  concat += '...';
  return concat;
};

</script>

<h1 class = "titel">Behandlungstermin anlegen</h1>
<header>
    <nav>
      <a style="margin-left:95%;" href="/" >Abmelden</a>
    </nav>
</header>

<form style="margin-left: 2%; max-width : 75%">
   
    <br>
    <div>
        <h2>Patienten auswählen</h2>
    </div>    
    <br>        
    <div class="container">
        <TableSearch placeholder="suche nach Tiername" hoverable={true} bind:inputValue={searchTerm}>
            <TableHead>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>Tierart</TableHeadCell>
              <TableHeadCell>Tiername</TableHeadCell>
              <TableHeadCell>IdentNr</TableHeadCell>
              <TableHeadCell>Halter Vroname</TableHeadCell>
              <TableHeadCell>Halter Nachname</TableHeadCell>
            </TableHead>
              <TableBody >
                {#each filteredPatienten as item}
                  <TableBodyRow style=" max-height: 100px; overflow-y: auto;" on:click={() => selectedPatient = item}>
                    <TableBodyCell>{item.patientID}</TableBodyCell>
                    <TableBodyCell>{item.species}</TableBodyCell>
                    <TableBodyCell>{item.name}</TableBodyCell>
                    <TableBodyCell>{item.identNumber}</TableBodyCell>
                    <TableBodyCell>{item.ownerFirstName}</TableBodyCell>
                    <TableBodyCell>{item.ownerLastName}</TableBodyCell>
                  </TableBodyRow>
                {/each}
              </TableBody>
            
          </TableSearch>
    </div>

    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
    
        <div style="max-width: 70%;" >
          <Label >Tiername</Label>
          <Input type="text" bind:value={selectedPatient.name} readonly />
        </div>
  
        <div style="max-width: 70%;">
          <Label >Tierart</Label>
          <Input type="text"bind:value={selectedPatient.species} readonly />
        </div>
        <div style="max-width: 70%;">
            <Label  >Vorname des Halters</Label>
            <Input type="text" bind:value={selectedPatient.ownerFirstName} readonly />
        </div>
        
        <div style="max-width: 70%;">
            <Label >Nachname des Haltern</Label>
            <Input type="text" bind:value={selectedPatient.ownerLastName} readonly />
        </div>
    </div>

    <br>

    <Label for="textarea-id" class="mb-2">Diagnose</Label>
    <Textarea id="textarea-id" placeholder="Hier die Dieagnose des Patienten eintragen" rows="5" name="message" bind:value = {diagnose} />

    <br><br>
    <h2>Tätigkeiten</h2>

    <div class="container">
        <TableSearch placeholder="suche nach Grundleistung" hoverable={true} bind:inputValue={searchTerm}>
            <TableHead>
              <TableHeadCell>GOT Nr</TableHeadCell>
              <TableHeadCell>Grundleistung</TableHeadCell>
              <TableHeadCell>Kosten</TableHeadCell>
            </TableHead>
              <TableBody >
                {#each filteredTaetigkeiten as item}
                  <TableBodyRow style=" max-height: 100px; overflow-y: auto;" >
                    <TableBodyCell>
                        {item.gotID}
                    </TableBodyCell>  
                    <TableBodyCell style=" width: 50%; white-space: pre-wrap; word-wrap: break-word;">{item.description}</TableBodyCell>
                    <TableBodyCell>
                        <Select  bind:value={item.selectedOption}>
                            <option value="einfach">1-Fach : {item.price1}  &euro;</option>
                            <option value="zweifach">2-Fach :{item.price2} &euro;</option>
                            <option value="dreifach">3-Fach  : {item.price3} &euro;</option>
                          </Select>
                    </TableBodyCell>
                    <TableBodyCell>
                        <Button on:click={() => {
                            selectedTätigkeit.push(item);
                            selectedTätigkeit = [...selectedTätigkeit];
                            item.selectedOption = '';
                             }} disabled={!item.selectedOption}>Hinzufügen</Button>
                      </TableBodyCell>
                  </TableBodyRow>
                {/each}
              </TableBody>
            
          </TableSearch>
    </div>

    <br>
    <h3> geleistete Tätigkeiten</h3>
    <div class="container">
        <Table>
            <TableHead>
                <TableHeadCell>GOT Nr</TableHeadCell>
                <TableHeadCell>Grundleistung</TableHeadCell>
                <TableHeadCell>Kosten</TableHeadCell>
            </TableHead>
            <TableBody >
                {#each selectedTätigkeit as item }
                <TableBodyRow>
                    <TableBodyCell>
                      {item.gotID}
                    </TableBodyCell>
                    <TableBodyCell style=" width: 50%; white-space: pre-wrap; word-wrap: break-word;">
                      {item.description}
                    </TableBodyCell>
                    <TableBodyCell>
                      {item.selectedOption === 'einfach' ? item.price1 : (item.selectedOption === 'zweifach' ? item.price2 : item.price3)} &euro;
                    </TableBodyCell>
                    <TableBodyCell>
                      <Button on:click={() => {
                        const index = selectedTätigkeit.indexOf(item);
                        if (index !== -1) {
                          selectedTätigkeit.splice(index, 1);
                          selectedTätigkeit = [...selectedTätigkeit];
                        }
                      }}>Entfernen</Button>
                    </TableBodyCell>
                </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </div>
    <br>
    <h2>Medikamente</h2>
    <br>
    <div class="container">
      <TableSearch placeholder="suche nach Bezeichnung" hoverable={true} bind:inputValue={searchTerm}>
          <TableHead>
            <TableHeadCell>Medikamenten ID</TableHeadCell>
            <TableHeadCell>Beziechnung</TableHeadCell>
            <TableHeadCell>Kosten</TableHeadCell>
          </TableHead>
            <TableBody >
              {#each filteredMedikamente as item}
                <TableBodyRow style=" max-height: 100px; overflow-y: auto;" >
                  <TableBodyCell>{item.drugID}</TableBodyCell>  
                  <TableBodyCell>{item.name}</TableBodyCell>
                  <TableBodyCell>{item.price} &euro;</TableBodyCell>
                  <TableBodyCell>
                      <Button on:click={() => {
                          selectedMedikament.push(item);
                          selectedMedikament = [...selectedMedikament];
                          item.selectedOption = '';
                           }}>Hinzufügen</Button>
                    </TableBodyCell>
                </TableBodyRow>
              {/each}
            </TableBody>
          
        </TableSearch>
  </div>
  <br>
  <h3>Verschriebene Medikamente</h3>
  <br>
  <div class="container">
    <Table>
      <TableHead>
        <TableHeadCell>Medikamenten ID</TableHeadCell>
        <TableHeadCell>Beziechnung</TableHeadCell>
        <TableHeadCell>Kosten</TableHeadCell>
      </TableHead>
        <TableBody >
            {#each selectedMedikament as item }
            <TableBodyRow>
                <TableBodyCell>
                  {item.drugID}
                </TableBodyCell>
                <TableBodyCell>
                  {item.name}
                </TableBodyCell>
                <TableBodyCell>
                  {item.price} &euro;
                </TableBodyCell>
                <TableBodyCell>
                  <Button on:click={() => {
                    const index = selectedMedikament.indexOf(item);
                    if (index !== -1) {
                      selectedMedikament.splice(index, 1);
                      selectedMedikament = [...selectedMedikament];
                    }
                  }}>Entfernen</Button>
                </TableBodyCell>
            </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</div>

<br>
<h2>Bild Hinzufügen</h2>
<br>

<div style="max-width: 50%;">
  <Dropzone
  id="dropzone"
  on:drop={dropHandle}
  on:dragover={(event) => {
    event.preventDefault();
  }}
  on:change={handleChange} >
  <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
  {#if value.length === 0}
    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
  {:else}
    <p>{showFiles(value)}</p>
  {/if}
</Dropzone>

</div>
<br><br>

<Button type="submit" style="min-width: 50%; " on:click = {terminAnlegen}>Termin anlegen</Button>
   
</form>