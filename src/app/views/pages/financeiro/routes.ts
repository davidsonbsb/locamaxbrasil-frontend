import { Routes } from '@angular/router';
import { FormFinanceiroComponent } from './form-financeiro/form-financeiro.component';
import { IndexFinanceiroComponent } from './index-financeiro/index-financeiro.component';

export const routes: Routes = [
    {
        path: '',
        component: IndexFinanceiroComponent,
        data: {
        title: $localize`Financeiro / Lançamentos`
        }
    },
    {
        path: 'cadastrar',
        component: FormFinanceiroComponent,
        data: {
            title: $localize`Financeiro / Cadastrar`
        }
    },
    {
        path: 'visualizar/:id',
        component: FormFinanceiroComponent,
        data: {
            title: $localize`Financeiro / Visualizar`
        }
    },
    {
        path: 'editar/:id',
        component: FormFinanceiroComponent,
        data: {
            title: $localize`Financeiro / Editar`
        }
    }
];
