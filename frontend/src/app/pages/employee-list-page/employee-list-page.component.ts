import {Component, OnInit} from "@angular/core";
import {Employee} from "../../models/Employee";
import {EmployeeService} from "../../services/employee/employee.service";

@Component({
  selector: "app-employee-list-page",
  templateUrl: "./employee-list-page.component.html",
  styleUrls: ["./employee-list-page.component.css"],
})
export class EmployeeListPageComponent implements OnInit {
  dataSource: Employee[] = [];
  displayedColumns: string[] = ["_id", "firstName", "lastName", "age", "department"];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.list().subscribe({
      next: (response) => {
        this.dataSource = response;
      },
    });
  }
}
