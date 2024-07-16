import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CrudService {

    http = inject(HttpClient);

    //apiHost: any = localStorage.getItem('apiHost');
    apiHost: any = 'http://127.0.0.1:8000/api';

    getAll(filtro?: any, endpoint?: string): Observable<any> {
        return this.http.post(`${this.apiHost}/${endpoint}`, filtro);
    }
    getPaginator(page?: number, filtro?: any, endpoint?: string): Observable<any> {
        return this.http.post(`${this.apiHost}/${endpoint}?page=` + page, filtro);
    }
    getById(id: number, endpoint?: string): Observable<any> {
        return this.http.get(`${this.apiHost}/${endpoint}/${id}`);
    }
    show(id: number, endpoint?: string): Observable<any> {
        return this.http.get(`${this.apiHost}/${endpoint}/${id}`);
    }
    edit(id: number, endpoint?: string): Observable<any> {
        return this.http.get(`${this.apiHost}/${endpoint}/${id}`);
    }
    store(obj: object, endpoint?: string): Observable<any> {
        return this.http.post(`${this.apiHost}/${endpoint}/`, obj);
    }
    update(id: number, obj: object, endpoint?: string): Observable<any> {
        return this.http.put(`${this.apiHost}/${endpoint}/${id}`, obj);
    }
    delete(id: number, endpoint?: string): Observable<any> {
        return this.http.delete(`${this.apiHost}/${endpoint}/${id}`);
    }

}
