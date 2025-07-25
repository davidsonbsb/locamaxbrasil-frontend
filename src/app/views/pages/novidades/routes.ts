import { Routes } from '@angular/router';
import { NovidadesComponent } from '../novidades/novidades.component';

export const routes: Routes = [
    {
        path: '',
        component: NovidadesComponent,
        data: {
        title: $localize`Novidades / Novidades`
        }
    },
    {
      path: 'novidades',
      component: NovidadesComponent,
      data: {
          title: $localize`Novidades `
      }
    }
];
