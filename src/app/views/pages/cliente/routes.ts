import { Routes } from '@angular/router';
import { CreateClienteComponent } from './create-cliente/create-cliente.component';
import { IndexClienteComponent } from './index-cliente/index-cliente.component';
import { ShowClienteComponent } from './show-cliente/show-cliente.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexClienteComponent,
    data: {
      title: $localize`Clientes`
    }
  },
  {
    path: 'cadastrar',
    component: CreateClienteComponent,
    data: {
      title: $localize`Clientes / Cadastrar`
    }
  },
  {
    path: 'show',
    component: ShowClienteComponent,
    data: {
      title: $localize`Clientes / Cadastrar`
    }
  }
];
