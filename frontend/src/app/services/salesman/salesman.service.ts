import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Salesman } from '../../models/Salesman';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SalesmanService {
    constructor(private http: HttpClient) {}

    getSalesman(id: string | number): Observable<Salesman> {
        return this.http.get<Salesman>(
            environment.apiEndpoint + `/api/salesman/${id}`,
            {
                withCredentials: true,
            },
        );
    }

    getAllSalesman(): Observable<Salesman[]> {
        return this.http.get<Salesman[]>(
            environment.apiEndpoint + `/api/salesman`,
            {
                withCredentials: true,
            },
        );
    }
}
