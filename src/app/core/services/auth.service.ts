import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    http = inject(HttpClient)

    token?: any;
    apiHost: any = localStorage.getItem('apiHost');
    host: any = localStorage.getItem('host');
    //private apiHost = 'http://localhost:8000';

    constructor () {
      this.token = localStorage.getItem('token');
    }

    register(name: string, email:string, password:string, password_confirmation: string): Observable<any> {
      return this.http.post<any>(`${this.host}/register`, {name, email, password, password_confirmation}, { withCredentials: true });
  }

    login(email:string, password:string): Observable<any> {
        return this.http.post<any>(`${this.apiHost}/login`, {email, password}, { withCredentials: true });
    }

    setToken(token: string): void {
        this.token = token;
        localStorage['token'] = token;
    }

    logout(): void {
        localStorage.removeItem('token');
        this.token = null;
        this.http.get<any>(`${this.apiHost}/logout`);
    }

    getToken(): string | undefined {
        return this.token;
    }

    isAuthenticated(): boolean {
        // Verifique se o token está presente e se ainda é válido
        return !!this.token && !this.isTokenExpired(this.token);
    }

    private isTokenExpired(token: string): boolean {

      let status = this.http.get<any>(`${this.apiHost}/check-token`);

      status.subscribe({
        next: response => {
          if(response.status) {
            return true
          }
            return false

        },
        error: err => {
          console.error('err: ', err.error);
          return false;

        }
      })

      return false;

    }

}
