import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseModel } from '../../models/_core/BaseModel';

@Injectable({
    providedIn: 'root',
})
export class ApiService<T extends BaseModel<T>> {
    public apiURL = '';
    public apiBase = 'http://localhost:8080/api/';

    constructor(
        private httpClient: HttpClient,
        public tConstructor: { new (m: Partial<T>, ...args: unknown[]): T },
        private apiPath: string,
    ) {
        this.apiURL = this.apiBase + apiPath;
    }

    public create(resource: Partial<T> & { toJson: () => T }): Observable<T> {
        return this.httpClient
            .post<T>(`${this.apiURL}`, resource.toJson(), {
                withCredentials: true,
            })
            .pipe(map((result) => new this.tConstructor(result)));
    }

    public list(): Observable<T[]> {
        return this.httpClient
            .get<T[]>(this.apiURL, { withCredentials: true })
            .pipe(map((result) => result.map((i) => new this.tConstructor(i))));
    }

    public get(id: string): Observable<T> {
        return this.httpClient
            .get<T>(`${this.apiURL}${id}/`, { withCredentials: true })
            .pipe(map((result) => new this.tConstructor(result)));
    }

    public update(resource: Partial<T> & { toJson: () => T }): Observable<T> {
        return this.httpClient
            .put<T>(`${this.apiURL}${resource.id}/`, resource.toJson(), {
                withCredentials: true,
            })
            .pipe(map((result) => new this.tConstructor(result)));
    }

    public partialUpdate(
        resource: Partial<T> & { toJson: () => T },
    ): Observable<T> {
        return this.httpClient
            .patch<T>(`${this.apiURL}${resource.id}/`, resource.toJson(), {
                withCredentials: true,
            })
            .pipe(map((result) => new this.tConstructor(result)));
    }

    public delete(id: string): Observable<T> {
        return this.httpClient.delete<T>(`${this.apiURL}${id}/`, {
            withCredentials: true,
        });
    }
}
