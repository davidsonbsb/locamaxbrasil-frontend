import { Routes } from '@angular/router';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { IndexClienteComponent } from './index-cliente/index-cliente.component';

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
    component: FormClienteComponent,
    data: {
      title: $localize`Clientes / Cadastrar`
    }
  },
  {
    path: 'visualizar/:id',
    component: FormClienteComponent,
    data: {
      title: $localize`Clientes / Visualizar`
    }
  },
  {
    path: 'editar/:id',
    component: FormClienteComponent,
    data: {
      title: $localize`Clientes / Editar`
    }
  }
];
