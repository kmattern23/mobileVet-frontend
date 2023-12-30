<script>

  import { Input, Label, Button, Select, Table,
        TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Textarea,Fileupload  } from 'flowbite-svelte';
  import '../standart.css';
  export let data;

  const {drugs} = data;
  const {gots} = data;
  const {patients} = data;

  let searchTermTaetigkeit = '';
  let searchTermDrug = '';
  let searchTermPatient = '';
  $: filteredPatienten = patients.filter((item) => item.name.toLowerCase().indexOf(searchTermPatient.toLowerCase()) !== -1);
  $: filteredTaetigkeiten = gots.filter((item) => item.description.toLowerCase().indexOf(searchTermTaetigkeit.toLowerCase()) !== -1);
  $: filteredMedikamente = drugs.filter((item) => item.name.toLowerCase().indexOf(searchTermDrug.toLowerCase()) !== -1);
  let selectedPatient ={};
  let selectedTaetigkeit = [];
  let selectedMedikament = [];

  let currentDate= new Date();
  let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  let formattedDate = date.toISOString().substring(0, 10);

// bild hinzufügen 
let image = null ;
  function handleImageUpload(event) {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        image = reader.result; 
      };
      reader.readAsDataURL(file);
      
    }

</script>

<h1 class = "titel">Behandlungstermin anlegen</h1>
<header>
    <nav>
      <a style="margin-left:95%;" href="/" >Abmelden</a>
    </nav>
</header>
<form style="margin-left: 2%; max-width : 75%" method="POST">
    <br>
    <div>
        <h2>Patienten auswählen</h2>
    </div>    
    <br>        
    <div class="container">
        <TableSearch placeholder="suche nach Tiername" hoverable={true} bind:inputValue={searchTermPatient}>
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
    <!-- Patient ID unnd Datum an Serverseite übergeben-->
    <input type="hidden" name="selectedPatientId" value="{selectedPatient.patientID}">
    <input type="hidden" name="date" value="{formattedDate}">
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
    <Textarea id="textarea-id" placeholder="Hier die Dieagnose des Patienten eintragen" rows="5" name="diagnose" />
    <br><br>
    <h2>Tätigkeiten</h2>
    <br>
    <div class="container">
        <TableSearch placeholder="suche nach Grundleistung" hoverable={true} bind:inputValue={searchTermTaetigkeit}>
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
                        let price;
                        let option;
                        if (item.selectedOption === 'einfach') {
                            price = item.price1;
                            option = 1;
                        } else if (item.selectedOption === 'zweifach') {
                            price = item.price2;
                            option = 2;
                        } else if (item.selectedOption === 'dreifach') {
                            price = item.price3;
                            option = 3;
                        }
                        selectedTaetigkeit.push({
                                  gotID: item.gotID,
                                  description: item.description,
                                  option: option,
                                  price : price
                        });
                          selectedTaetigkeit = [...selectedTaetigkeit];
                          
                          console.log(selectedTaetigkeit);  
                              
                        item.selectedOption = '';
                             }} disabled={!item.selectedOption || selectedTaetigkeit.some(usedTaetigkeiten => usedTaetigkeiten.gotID === item.gotID)}>Hinzufügen</Button>
                      </TableBodyCell>
                  </TableBodyRow>
                {/each}
              </TableBody>
            
          </TableSearch>
    </div>
    <!-- Übergeben der Array an die Serverseite dürch das Form Element-->
    <input type="hidden" name="selectedTaetigkeiten" value="{JSON.stringify(selectedTaetigkeit)}">
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
                {#each selectedTaetigkeit as item }
                <TableBodyRow>
                    <TableBodyCell>
                      {item.gotID}
                    </TableBodyCell>
                    <TableBodyCell style=" width: 50%; white-space: pre-wrap; word-wrap: break-word;">
                      {item.description}
                    </TableBodyCell>
                    <TableBodyCell>
                      {item.price} &euro;
                    </TableBodyCell>
                    <TableBodyCell>
                      <Button on:click={() => {
                        const index = selectedTaetigkeit.indexOf(item);
                        
                        if (index !== -1) {
                          selectedTaetigkeit.splice(index, 1);
                          selectedTaetigkeit = [...selectedTaetigkeit];
                         
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
      <TableSearch placeholder="suche nach Bezeichnung" hoverable={true} bind:inputValue={searchTermDrug}>
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
                          
                           }}
                           disabled={selectedMedikament.some(usedDrug => usedDrug.drugID === item.drugID)}
                           >Hinzufügen</Button>
                    </TableBodyCell>
                </TableBodyRow>
              {/each}
            </TableBody>
          
        </TableSearch>
  </div>
  <input type="hidden" name="selectedDrugs" value="{JSON.stringify(selectedMedikament)}">
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
<!-- bild hinzufügen-->
<Label class="space-y-2 mb-2">
  <span>Upload file</span>
  <Fileupload type="file"  accept="image/*" on:change={handleImageUpload} />

</Label>
{#if image}
  <img src={image} alt="Uploaded preview" />
{:else}
  <p>No image uploaded yet</p>
{/if}
<input type="hidden" name="image" value="{image}">
<br><br>
<Button type="submit" style="min-width: 50%; ">Termin anlegen</Button>
<br><br><br>
<Button type="submit" style="min-width: 50%;" href="../menueTierarzt" >Hauptmenü</Button>
   
</form>