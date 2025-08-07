import { Routes } from '@angular/router';
import { Form1 } from './form1/form1';
import { Form2 } from './form2/form2';

export const routes: Routes = [
  {
    path: 'form1',
    component: Form1,
  },
  { path: 'form2', component: Form2 },
];
