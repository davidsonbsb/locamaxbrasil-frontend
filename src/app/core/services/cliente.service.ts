import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

    http = inject(HttpClient);

    apiHost: any = localStorage.getItem('apiHost');
    //apiHost: any = 'http://127.0.0.1:8000/api';

    clientesTotal(): Observable<any> {
        return this.http.get(`${this.apiHost}/clientes/total`);
    }

    clientesTotalApps(): Observable<any> {
      return this.http.get(`${this.apiHost}/clientes/totalApps`);
    }

    clientesTotalStatus(): Observable<any> {
      return this.http.get(`${this.apiHost}/clientes/totalStatus`);
    }

    clientesApps(): Observable<any> {
      return this.http.get(`${this.apiHost}/clientesApps`);
    }

    renovar(id: number): Observable<any> {
      return this.http.get(`${this.apiHost}/cliente/${id}/renovar`);
  }

}
