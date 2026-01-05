import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  http = inject(HttpClient);

  apiHost: any = localStorage.getItem('apiHost');

  lancamentosCliente(id: number): Observable<any> {
    return this.http.get(`${this.apiHost}/lancamentos/cliente/${id}`);
  }

  getTotalLancamentos(mes: number): Observable<any> {
    return this.http.get(`${this.apiHost}/totalLancamentoBancoMes/${mes}`);
  }

  getTotalLancamentosDia(mes: number): Observable<any> {
    return this.http.get(`${this.apiHost}/totalLancamentoBancoDia/${mes}`);
  }

}
