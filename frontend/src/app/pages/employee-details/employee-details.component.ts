import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../services/employee/employee.service";
import {Employee} from "../../models/Employee";

@Component({
  selector: "app-employee-details",
  templateUrl: "./employee-details.component.html",
  styleUrls: ["./employee-details.component.css"],
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | null = null;
  employeeId: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
  ) {}

  @Input() set id(val: string) {
    this.employeeId = val;
  }

  ngOnInit() {
    if (this.employeeId) {
      this.employeeService.get(this.employeeId).subscribe({
        next: (v) => {
          this.employee = v;
        },
      });
    } else {
    }
  }
}
