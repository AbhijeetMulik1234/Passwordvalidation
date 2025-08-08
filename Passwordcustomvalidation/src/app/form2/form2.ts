import { CommonModule, JsonPipe } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-form2',
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, FormsModule],
  templateUrl: './form2.html',
  styleUrl: './form2.css',
})
export class Form2 {
  RegistrationForm: FormGroup;
  accountTypes = ['Minor Account', 'Adult Account'];
  Gender = ['Male', 'Female'];
  Interests = ['sports', 'music', 'travel', 'reading'];

  Form2: any;

  constructor(private fb: FormBuilder) {
    this.RegistrationForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      dateofbirth: ['', [Validators.required]],
      age: ['', Validators.required],
      accountType: ['', Validators.required],
      gender: ['', Validators.required],
      interest: ['', Validators.required],
      guardianname: [''],
      selectAccountType: [''],
    });
  }
  get selectAccountType(): String {
    debugger;
    return this.Form2.get('accountType')?.value;
  }

  onSubmit() {
    console.log('Form Submitted:');
  }
}
