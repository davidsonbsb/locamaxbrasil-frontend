import { Routes } from '@angular/router';
import { ExtratoComponent } from '../extrato/extrato.component';

export const routes: Routes = [
    {
        path: '',
        component: ExtratoComponent,
        data: {
        title: $localize`Extrato / Extrato`
        }
    },
    {
      path: 'extrato',
      component: ExtratoComponent,
      data: {
          title: $localize`Extrato `
      }
    }
];
