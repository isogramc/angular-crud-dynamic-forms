import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  buyTicketForm: FormGroup;

  ngOnInit() {
    this.buyTicketForm = new FormGroup({
      emailControl: new FormControl(null, [Validators.required]),
      phoneControl: new FormControl(null)
    });
  }

  buyTickets() {
    if (this.buyTicketForm.status === 'VALID') {
      console.log(this.buyTicketForm.value);
    } else {
      console.log('form is not valid');
    }
  }
}
