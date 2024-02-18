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
  displayedColumns: string[] = ["employeeId", "fullName", "unit", "jobTitle", "supervisor"];
  employeeSearchModel: string;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.list().subscribe({
      next: (response) => {
        // NOTE: Data source has extra field, which is _id and not included in displayedColumns
        this.dataSource = response;
      },
    });
  }

  onSearchInput(val: string) {
    console.log("Searched id: ", val);
  }
}
