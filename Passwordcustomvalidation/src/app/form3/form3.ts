import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form3',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form3.html',
  styleUrl: './form3.css',
})
export class Form3 {
  Userform: FormGroup;

  constructor(private fb: FormBuilder) {
    this.Userform = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      adress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pinCode: ['', Validators.required],
      }),
      contact: this.fb.group({
        phoneno: ['', Validators.required],
        alternativephoneno: ['', Validators.required],
        emergencycontactname: ['', Validators.required],
        emergencycontactnumber: ['', Validators.required],
      }),
      onSubmit() {
        console.log('Form Submitted');
      },
    });
  }
}
