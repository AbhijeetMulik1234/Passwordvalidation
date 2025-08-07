import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-form2',
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, NgModule],
  templateUrl: './form2.html',
  styleUrl: './form2.css',
})
export class Form2 {
  RegistrationForm: FormGroup;
  accountTypes = ['Minor Account', 'Adult Account'];
  Gender = ['Male', 'Female'];
  interests = {
    sports: false,
    music: false,
    travel: false,
    reading: false,
  };

  constructor(private fb: FormBuilder) {
    this.RegistrationForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dateofbirth: ['', [Validators.required]],
      age: ['', Validators.required],
      accountTypes: ['', Validators.required],
      gender: ['', Validators.required],
      interests: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.RegistrationForm.valid) {
      console.log('Form Submitted:', this.RegistrationForm.value);
      alert('Registration Successful');
    } else {
      alert('please fill all the required field');
    }
  }
}
