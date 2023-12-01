import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
    selector: 'app-employee-list-page',
    templateUrl: './employee-list-page.component.html',
    styleUrls: ['./employee-list-page.component.css']
})

export class EmployeeListPageComponent implements OnInit {
    dataSource: Employee[] = [
        new Employee({ firstName: 'John', lastName: 'Doe', age: 31, department: 'Sales' }),
        new Employee({ firstName: 'Jane', lastName: 'Done', age: 21, department: 'Marketing' }),
        new Employee({ firstName: 'Joe', lastName: 'Does', age: 34, department: 'HR' }),
        new Employee({ firstName: 'Johnny', lastName: 'Dont', age: 19, department: 'Sales' })
    ];
    displayedColumns: string[] = ['firstName', 'lastName', 'age', 'department'];

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit() {
        this.employeeService.list().subscribe({
            next: () => {
                console.log('Eyy');
            }
        });
    }
}
