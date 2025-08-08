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
import { calculateAge } from '../Validators/age-calculation.validator';
import { minimumAgeValidator } from '../Validators/age.validator';

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
    });
    this.RegistrationForm.get('dateofbirth')?.valueChanges.subscribe((dob) => {
      const age = calculateAge(dob);
      this.RegistrationForm.get('age')?.setValue(age, { emitevent: false });
      this.setAccountTypeValidator(age);
    });
  }
  setAccountTypeValidator(age: number) {
    const accountControl = this.RegistrationForm.get('accountType');

    if (!accountControl) return;

    if (age >= 18) {
      accountControl.setValidators([
        Validators.required,
        this.mustBeAdultAccountValidator(),
      ]);
    } else {
      accountControl.setValidators([
        Validators.required,
        this.mustBeMinorAccountValidator(),
      ]);
    }
    accountControl.updateValueAndValidity({ emitEvent: false });
  }

  mustBeMinorAccountValidator() {
    return (control: any) => {
      return control.value === 'Minor Account' ? null : { mustBeMinor: true };
    };
  }
  mustBeAdultAccountValidator() {
    return (control: any) => {
      return control.value === 'Adult Account' ? null : { mustBeAdult: true };
    };
  }

  // get selectAccountType(): String {
  //   debugger;
  //   return this.RegistrationForm.get('accountType')?.value;
  // }

  onSubmit() {
    console.log('Form Submitted:');
  }
}
