import { Injectable } from '@angular/core';
import { ApiService } from '../_core/api.service';
import { Employee } from '../../models/Employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends ApiService<Employee> {

    constructor(private http: HttpClient) {
        super(http, Employee, 'employees/');
    }
}
