import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    http = inject(HttpClient)

    token?: any;
    private baseURL = 'http://localhost:8000';


    register(name: string, email:string, password:string, password_confirmation: string): Observable<any> {
      return this.http.post<any>(`${this.baseURL}/register`, {name, email, password, password_confirmation}, { withCredentials: true });
  }

    login(email:string, password:string): Observable<any> {
        return this.http.post<any>(`${this.baseURL}/api/login`, {email, password}, { withCredentials: true });
    }

    setToken(token: string): void {
        this.token = token;
        localStorage['token'] = token;
    }

    logout(): void {
        localStorage.removeItem('token');
        this.token = null;
    }

    getToken(): string | undefined {
        return this.token;
    }

    isAuthenticated(): boolean {
        // Verifique se o token está presente e se ainda é válido
        return !!this.token && !this.isTokenExpired(this.token);
    }

    private isTokenExpired(token: string): boolean {
        /* const decodedToken: { exp: number } = jwt_decode(token);
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(decodedToken.exp);

        return expirationDate.valueOf() < new Date().valueOf(); */

        return true;
    }

}
