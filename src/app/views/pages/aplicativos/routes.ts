import { Routes } from '@angular/router';
import { AplicativosComponent } from './aplicativos.component';

export const routes: Routes = [
  {
    path: '',
    component: AplicativosComponent,
    data: {
      title: $localize`Aplicativos`
    }
  }
];
