import { Routes } from '@angular/router';
import { IndexFinanceiroComponent } from './index-financeiro/index-financeiro.component';
import { ShowFinanceiroComponent } from './show-financeiro/show-financeiro.component';

export const routes: Routes = [
    {
        path: 'lancamentos',
        component: IndexFinanceiroComponent,
        data: {
        title: $localize`Financeiro / Lançamentos`
        }
    },
    {
        path: 'visualizar/:id',
        component: ShowFinanceiroComponent,
        data: {
          title: $localize`Financeiro / Visualizar`
        }
    }
];
