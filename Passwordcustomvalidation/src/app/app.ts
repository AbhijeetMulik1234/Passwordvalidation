import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { calculateAge } from './Validators/age-calculation.validator';
import { CommonModule } from '@angular/common';
import { Form1 } from './form1/form1';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Form1],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
