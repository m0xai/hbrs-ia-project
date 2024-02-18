import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bonus } from '../../models/Bonus';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BonusService {
    constructor(private http: HttpClient) {}

    getBonusesOfSalesman(id: number | string): Observable<Bonus[]> {
        return this.http.get<Bonus[]>(
            environment.apiEndpoint + `/api/salesman/${id}/bonussalary`,
            {
                withCredentials: true,
            },
        );
    }

    postUnverifiedBonusSalary(bonus: Bonus): Observable<ArrayBuffer> {
        return this.http.post<Bonus>(
            environment.apiEndpoint +
                `/api/salesman/${bonus.sid}/unverified/bonussalary`,
            bonus,
            // @ts-ignore
            { responseType: 'text', withCredentials: true },
        );
    }

    postVerifiedBonusSalary(bonus: Bonus): Observable<ArrayBuffer> {
        return this.http.post<Bonus>(
            environment.apiEndpoint + `/api/salesman/${bonus.sid}/bonussalary`,
            bonus,
            // @ts-ignore
            { responseType: 'text', withCredentials: true },
        );
    }

    getAllBonuses(): Observable<Bonus[]> {
        return this.http.get<Bonus[]>(
            environment.apiEndpoint + `/api/bonussalary`,
            {
                withCredentials: true,
            },
        );
    }

    deleteBonusOfSalesmanFromMongoDB(
        id: number | string,
        year: number | string,
    ): Observable<ArrayBuffer> {
        return this.http.delete<{
            year: number | string;
        }>(
            environment.apiEndpoint + `/api/salesman/${id}/bonussalary/mongoDB`,
            // @ts-ignore
            {
                responseType: 'text',
                body: { year: year },
                withCredentials: true,
            },
        );
    }

    getVerifiedAndUnverifiedBonusesOfSalesman(
        id: number | string,
    ): Observable<Bonus[]> {
        return this.http.get<Bonus[]>(
            environment.apiEndpoint + `/api/bonussalary/${id}`,
            {
                withCredentials: true,
            },
        );
    }

    deleteBonusOfSalesmanFromOrangeHRM(
        id: number | string,
        year: number | string,
        value: number | string,
    ): Observable<ArrayBuffer> {
        return this.http.delete<{
            year: number | string;
            value: number | string;
        }>(
            environment.apiEndpoint +
                `/api/salesman/${id}/bonussalary/orangeHRM`,
            // @ts-ignore
            {
                responseType: 'text',
                body: { year: year, value: value },
                withCredentials: true,
            },
        );
    }
}
