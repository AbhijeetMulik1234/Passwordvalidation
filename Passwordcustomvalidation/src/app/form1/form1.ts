import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { calculateAge } from '../Validators/age-calculation.validator';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-form1',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './form1.html',
  styleUrl: './form1.css',
})
export class Form1 {
  protected readonly title = signal('Passwordcustomvalidation');
  bankForm: FormGroup;
  accountTypes = ['Minor Account', 'Adult Account'];

  constructor(private fb: FormBuilder) {
    this.bankForm = this.fb.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      accountType: ['', [Validators.required]],
    });

    // Listen for DOB changes to update account type rules dynamically
    this.bankForm.get('dob')?.valueChanges.subscribe((dobValue) => {
      const age = calculateAge(dobValue);
      const accountControl = this.bankForm.get('accountType');

      if (age > 0 && age < 18) {
        // Force selection of Minor Account
        accountControl?.setValidators([
          Validators.required,
          this.mustBeMinorAccountValidator(),
        ]);
      } else if (age >= 18) {
        // Force selection of Adult Account
        accountControl?.setValidators([
          Validators.required,
          this.mustBeAdultAccountValidator(),
        ]);
      } else {
        // No DOB yet, just require selection
        accountControl?.setValidators([Validators.required]);
      }

      accountControl?.updateValueAndValidity({ emitEvent: false });
    });
  }

  // Custom validator: must choose Minor Account
  mustBeMinorAccountValidator() {
    return (control: any) => {
      return control.value === 'Minor Account' ? null : { mustBeMinor: true };
    };
  }

  // Custom validator: must choose Adult Account
  mustBeAdultAccountValidator() {
    return (control: any) => {
      return control.value === 'Adult Account' ? null : { mustBeAdult: true };
    };
  }

  onSubmit() {
    if (this.bankForm.valid) {
      alert('Form submitted successfully!');
      console.log(this.bankForm.value);
    } else {
      this.bankForm.markAllAsTouched();
    }
  }
}
