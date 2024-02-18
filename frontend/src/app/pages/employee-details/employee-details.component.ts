import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../models/Employee';
import { NotifyService } from '../../services/_core/notify.service';
import { ReviewService } from '../../services/review/review.service';
import { Review } from '../../models/Review';

@Component({
    selector: 'app-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
    employee: Employee | null = null;
    displayedColumns = ['period', 'opinionSum', 'remarks'];
    employeeId: string = '';
    reviews: Review[] = [];

    constructor(
        private notifyService: NotifyService,
        private employeeService: EmployeeService,
        private reviewService: ReviewService,
    ) {}

    @Input() set id(val: string) {
        this.employeeId = val;
    }

    ngOnInit() {
        this.fetchEmployee();
        this.reviewService.list().subscribe({
            next: (value) => (this.reviews = value),
            error: (err) => console.info(err),
        });
    }

    fetchEmployee() {
        if (this.employeeId) {
            this.employeeService.get(this.employeeId).subscribe({
                next: (v) => {
                    this.employee = v;
                },
                error: (err) => {
                    this.notifyService.error(
                        'There is a problem occurred while getting employee data. ' +
                            err,
                    );
                },
            });
        } else {
            this.notifyService.error('Employee ID is not valid.');
        }
    }

    testNotify() {
        this.notifyService.info('Was geht ab?');
    }
}
