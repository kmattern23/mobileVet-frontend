<script>
    import '../standart.css';
    import { Button , Table ,TableBody, TableSearch, Select, Textarea,Fileupload ,
        Input, TableBodyCell, TableBodyRow, TableHead, TableHeadCell ,Label } from 'flowbite-svelte';
    export let data;

    const {unbilledAppointment} = data;
    const {drugs} = data;
    const {gots} = data;
    let selectedAppointment =null ;
    let searchTermTaetigkeit = '';
    let searchTermDrug = '';
    $: filteredTaetigkeiten = gots.filter((item) => item.description.toLowerCase().indexOf(searchTermTaetigkeit.toLowerCase()) !== -1);
    $: filteredMedikamente = drugs.filter((item) => item.name.toLowerCase().indexOf(searchTermDrug.toLowerCase()) !== -1);
    
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

    const preiseZuweisen = (selectedAppointment) => {
        for (let i = 0; i < selectedAppointment.got.length; i++) {
           
            let gotPosition = 0;
           for(let z = 0 ; z< gots.length ; z++){
                if(selectedAppointment.got[i].gotID == gots[z].gotID){
                    break
                } else{
                    gotPosition ++;
                }
            }
            let price;
            let option;
            if (selectedAppointment.priceVariant[i] == 1) {
                price = gots[gotPosition].price1;
                option = 1;
            } else if (selectedAppointment.priceVariant[i] == 2) {
                price = gots[gotPosition].price2;
                option = 2;
            } else {
                price = gots[gotPosition].price3;
                option = 3;
            }
            selectedAppointment.got[i].price = price;
            selectedAppointment.got[i].option = option;
            
        }
    };
</script>

<h1 class = "titel">Termine bearbeiten</h1>
<header>
    <nav>
      <a style="margin-left:95%;" href="/" >Abmelden</a>
    </nav>
</header>

{#if selectedAppointment === null}
<br><br>
    <div  class="container">
        <Table>
          <TableHead>
            <TableHeadCell>Termin ID</TableHeadCell>
            <TableHeadCell>Datum</TableHeadCell>
            <TableHeadCell>Patient</TableHeadCell>
            <TableHeadCell>Halter</TableHeadCell>
          </TableHead>
            <TableBody >
                {#each unbilledAppointment as item }
                <TableBodyRow>
                    <TableBodyCell>{item.appointmentID}</TableBodyCell>
                    <TableBodyCell>{item.date}</TableBodyCell>
                    <TableBodyCell>{item.patient.name}</TableBodyCell>
                    <TableBodyCell>{item.patient.ownerFirstName}  {item.patient.ownerLastName}</TableBodyCell>
                    <TableBodyCell>
                        <Button on:click={() => {
                        selectedAppointment = item;
                        preiseZuweisen(selectedAppointment);
                        }}>Bearbeiten</Button>
                      </TableBodyCell>
                </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </div>
    <br><br><br>
    <Button type="submit" style="min-width: 30%;" href="../menueTierarzt" >Hauptmenü</Button>
{:else}
<br><br>
<form style="margin-left: 2%; max-width : 75%" method="POST">
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
        <div style="max-width: 70%;" >
            <Label >Tiername</Label>
            <Input type="text" bind:value={selectedAppointment.patient.name} readonly />
          </div>

          <div style="max-width: 70%;">
            <Label >Tierart</Label>
            <Input type="text"bind:value={selectedAppointment.patient.species} readonly />
          </div>
          <div style="max-width: 70%;">
              <Label  >Vorname des Halters</Label>
              <Input type="text" bind:value={selectedAppointment.patient.ownerFirstName} readonly />
          </div>
          
          <div style="max-width: 70%;">
              <Label >Nachname des Haltern</Label>
              <Input type="text" bind:value={selectedAppointment.patient.ownerLastName} readonly />
          </div>
    </div>

    <input type="hidden" name="PatientId" value="{selectedAppointment.patient.patientID}">
    <input type="hidden" name="date" value="{selectedAppointment.date}">
    <input type="hidden" name="appointmentID" value = "{selectedAppointment.appointmentID}">
    <Label for="textarea-id" class="mb-2">Diagnose</Label>
    <Textarea id="textarea-id"  rows="5" name="diagnose" bind:value={selectedAppointment.diagnose} />

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
                        selectedAppointment.got.push({
                                  gotID: item.gotID,
                                  description: item.description,
                                  option: option,
                                  price : price
                        });
                        selectedAppointment.got = [...selectedAppointment.got];
                          
                          //console.log(selectedTaetigkeit);  
                              
                        item.selectedOption = '';
                             }} disabled={!item.selectedOption || selectedAppointment.got.some(usedTaetigkeiten => usedTaetigkeiten.gotID === item.gotID) }>Hinzufügen</Button>
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
                {#each selectedAppointment.got as item }
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
                        const index = selectedAppointment.got.indexOf(item);
                        
                        if (index !== -1) {
                            selectedAppointment.got.splice(index, 1);
                            selectedAppointment.got = [...selectedAppointment.got];
                         
                        }
                      }
                      }>Entfernen</Button>
                    </TableBodyCell>
                </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </div>

    <input type="hidden" name="updateTaetigkeiten" value="{JSON.stringify(selectedAppointment.got)}">

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
                    <Button
                    on:click={() => {
                        selectedAppointment.usedDrugs.push(item);
                        selectedAppointment.usedDrugs = [...selectedAppointment.usedDrugs];
                    }}
                    disabled={selectedAppointment.usedDrugs.some(usedDrug => usedDrug.drugID === item.drugID)}>
                    Hinzufügen
                </Button>
                
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
              {#each selectedAppointment.usedDrugs as item }
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
                      const index = selectedAppointment.usedDrugs.indexOf(item);
                      if (index !== -1) {
                        selectedAppointment.usedDrugs.splice(index, 1);
                        selectedAppointment.usedDrugs = [...selectedAppointment.usedDrugs];
                      }
                    }}>Entfernen</Button>
                  </TableBodyCell>
              </TableBodyRow>
              {/each}
          </TableBody>
      </Table>
  </div>
  
  <input type="hidden" name="updateDrugs" value="{JSON.stringify(selectedAppointment.usedDrugs)}">

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

    <Button type="submit" style="min-width: 50%; ">Termin ändern</Button>
    <br><br><br>
    <Button type="submit" style="min-width: 50%;" href="../menueTierarzt">Hauptmenü</Button>  
</form>
{/if}

