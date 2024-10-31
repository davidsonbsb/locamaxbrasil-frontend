import { Routes } from '@angular/router';
import { FormLancamentoComponent } from './form-lancamento/form-lancamento.component';
import { IndexLancamentoComponent } from './index-lancamento/index-lancamento.component';
import { LancamentoComponent } from './lancamento/lancamento.component';

export const routes: Routes = [
    {
        path: '',
        component: IndexLancamentoComponent,
        data: {
        title: $localize`Lancamento / Lançamentos`
        }
    },
    {
        path: 'cadastrar',
        component: FormLancamentoComponent,
        data: {
            title: $localize`Lancamento / Cadastrar`
        }
    },
    {
        path: 'visualizar/:id',
        component: FormLancamentoComponent,
        data: {
            title: $localize`Lancamento / Visualizar`
        }
    },
    {
        path: 'editar/:id',
        component: FormLancamentoComponent,
        data: {
            title: $localize`Lancamento / Editar`
        }
    },
    {
      path: 'teste',
      component: LancamentoComponent,
      data: {
          title: $localize`Lancamento / Editar`
      }
  }
];
