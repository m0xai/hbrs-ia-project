import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PerformanceRecord } from '../../models/PerformanceRecord';

@Injectable({
    providedIn: 'root',
})
export class PerformanceRecordService {
    constructor(private http: HttpClient) {}

    addPerformanceRecord(
        performanceRecord: PerformanceRecord,
    ): Observable<ArrayBuffer> {
        return this.http.post<PerformanceRecord>(
            environment.apiEndpoint + '/api/performancerecord/create',
            performanceRecord,
            // @ts-ignore
            { responseType: 'text', withCredentials: true },
        );
    }

    getAllPerformanceRecords(): Observable<PerformanceRecord[]> {
        return this.http.get<PerformanceRecord[]>(
            environment.apiEndpoint + '/api/performancerecord',
            {
                withCredentials: true,
            },
        );
    }

    getPerformanceRecords(sid): Observable<PerformanceRecord[]> {
        return this.http.get<PerformanceRecord[]>(
            environment.apiEndpoint + `/api/performancerecord/${sid}`,
            { withCredentials: true },
        );
    }
}
