import { Routes } from '@angular/router';
import { LancamentoComponent } from '../financeiro/lancamento/lancamento.component';

export const routes: Routes = [
  {
    path: 'lancamentos',
    component: LancamentoComponent,
    data: {
      title: $localize`Financeiro / Lançamento`
    }
  }
];
