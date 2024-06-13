import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms'; //
import { FirebaseService } from 'src/app/servizi/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { matDialogAnimations } from '@angular/material/dialog';

export interface PeriodicElement {
  id: string;
  modello: string;
  alimentazione: string;
  potenza: number;
  colore: string;
  cilindrata: number;
  prezzo: number;
}

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.css']
})
export class Pagina1Component implements OnInit {

  inputForm!: FormGroup;
  modelli: PeriodicElement[] = [];
  modello: any;
  dataSource: MatTableDataSource<PeriodicElement>;
  selectedElement: any;
  id: string | undefined;
  myForm: any;
  selectedElements: string[] = [];
  form: any;
  dialog: any;

  constructor(private firebase: FirebaseService) {


    this.dataSource = new MatTableDataSource<PeriodicElement>(this.modelli);
  }


  ngOnInit(): void {
    this.firebase.getPersone('https://app-angular-21bc4-default-rtdb.firebaseio.com/modelli.json').subscribe((data: any) => {
      this.modelli = Object.keys(data).map((key) => {
        data[key]['id'] = key;
        console.log(data[key].id);
        this.id = data[key].id;
        return data[key];
      });
      this.dataSource.data = this.modelli;
      console.log(this.modelli);
    });
  }

  onSubmit(form: NgForm) {
    const modello = form.value.modello;
    const alimentazione = form.value.alimentazione;
    const potenza = form.value.potenza;
    const cilindrata = form.value.cilindrata;
    const colore = form.value.colore;
    const prezzo = form.value.prezzo;
    this.firebase.insertModello('https://app-angular-21bc4-default-rtdb.firebaseio.com/modelli.json', { modello, alimentazione, potenza, cilindrata, colore, prezzo }).subscribe((data: any) => {
      console.log(data);
      form.reset();
      window.location.reload();
    });
  }

  // onSelectedElement(id: string) {
  //   this.selectedElement = id;
  //   console.log(this.selectedElement);
  // }


  selectAll() {
    this.selectedElements = [];
    this.modelli.forEach(element => {
      this.selectedElements.push(element.id);
      console.log(this.selectedElements);
    })
  }


  onSelectedElement(id: string) {
    // Controlla se l'elemento è già presente nell'array
    const index = this.selectedElements.indexOf(id);
    if (index >= 0) {
      // Rimuovi l'elemento se è già stato selezionato
      this.selectedElements.splice(index, 1);
    } else {
      // Aggiungi l'elemento se non è già stato selezionato
      this.selectedElements.push(id);
      console.log(this.selectedElements);
    }
    if (this.selectedElements.length > 1) {
      return
    }
  }


  onDeleteModello() {
    if (this.selectedElements.length === 0) {
      alert('Seleziona un elemento!');
      return;
    }
    alert("Confermi di voler eliminare l'elemento selezionato?");
    this.selectedElements.forEach(elementId => {
      const url = `https://app-angular-21bc4-default-rtdb.firebaseio.com/modelli/${elementId}.json`;
      this.firebase.deleteModello(url).subscribe((data: any) => {
        console.log(data);
        window.location.reload();
      });
    })
  }


  onPatchModello(form: NgForm) {
    const modello = form.value.modello;
    const alimentazione = form.value.alimentazione;
    const potenza = form.value.potenza;
    const cilindrata = form.value.cilindrata;
    const colore = form.value.colore;
    const prezzo = form.value.prezzo;

    if (this.selectedElements.length === 0) {
      alert('Seleziona un elemento!');
      return;
    }

    const url = `https://app-angular-21bc4-default-rtdb.firebaseio.com/modelli/${this.selectedElements}.json`;

    this.firebase.getModello(url).subscribe((data: any) => {
      if (!data) {
        alert("Elemento non trovato!");
        return;
      }

      if (modello !== "") {
        data.modello = modello;
      }
      if (alimentazione !== "") {
        data.alimentazione = alimentazione;
      }
      if (potenza !== "") {
        data.potenza = potenza;
      }
      if (cilindrata !== "") {
        data.cilindrata = cilindrata;
      }
      if (colore !== "") {
        data.colore = colore;
      }
      if (prezzo !== "") {
        data.prezzo = prezzo;
      }

      this.firebase.patchModello(url, data).subscribe((response: any) => {
        console.log(response);
        window.location.reload();
      });
    });
  }




  displayedColumns: string[] = ['checkbox', 'i', 'modello', 'alimentazione', 'potenza', 'cilindrata', 'colore', 'prezzo'];
}

