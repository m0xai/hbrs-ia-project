import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../services/employee/employee.service";
import {Employee} from "../../models/Employee";
import {NotifyService} from "../../services/_core/notify.service";

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
    private notifyService: NotifyService,
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
        error: (err) => {
          this.notifyService.error(
            "There is a problem occurred while getting employee data. " + err,
          );
        },
      });
    } else {
      this.notifyService.error("Employee ID is not valid.");
    }
  }

  testNotify() {
    this.notifyService.info("Was geht ab?");
  }
}
