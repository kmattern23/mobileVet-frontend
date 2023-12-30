<script>
    import '../standart.css';
    import { Button , Datepicker ,Input , Table ,TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from 'flowbite-svelte';
    let termine = [];
    export let data;

    const {unbilledAppointment} = data;
</script>

<h1 class = "titel">Rechnungen erstellen</h1>
<header>
    <nav>
      <a style="margin-left:95%;" href="/" >Abmelden</a>
    </nav>
</header>

<form style="margin-left: 2%; max-width : 75%" method="POST">
    <br><br><br>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
        <div style="max-width: 50%;">
            <label for="startDate">Startdatum:</label>
            <Input type="date" name="startDate" id ="startDate" />
        </div>
        <div style="max-width: 50%;">
            <label for="endDate">Enddatum:</label>
            <Input type="date" name="endDate" id ="endDate" />
        </div>
    </div>
    <br><br><br>
    <h2>Offene Rechnungen:</h2>
    <br>
    <div class="container">
        <Table>
          <TableHead>
            <TableHeadCell>Termin ID</TableHeadCell>
            <TableHeadCell>Datum</TableHeadCell>
            <TableHeadCell>Patient</TableHeadCell>
          </TableHead>
            <TableBody >
                {#each unbilledAppointment as item }
                <TableBodyRow>
                    <TableBodyCell>{item.appointmentID}</TableBodyCell>
                    <TableBodyCell>{item.date}</TableBodyCell>
                    <TableBodyCell>{item.patient}</TableBodyCell>
                    
                </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </div>
    <br><br>
    <div style="max-width: 50%;">
        <Button type="submit" style="min-width: 30%;" >
            Rechnungen erstellen
        </Button>
        <br><br><br>
        <Button type="submit" style="min-width: 30%;" href="../menueRechnungsmitarbeiter" >Hauptmenü</Button>
    </div>
    


</form>