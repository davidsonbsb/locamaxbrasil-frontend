import { Routes } from '@angular/router';
import { CreateClienteComponent } from './create-cliente/create-cliente.component';

export const routes: Routes = [
  {
    path: 'cadastrar',
    component: CreateClienteComponent,
    data: {
      title: $localize`Cliente / Cadastrar`
    }
  }
];
