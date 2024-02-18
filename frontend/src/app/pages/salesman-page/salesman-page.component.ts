import {Component, OnInit} from "@angular/core";
import {Salesman} from "../../models/Salesman";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {SocialperformanceDialogComponent} from "./socialperformance-dialog/socialperformance-dialog.component";
import {Bonus} from "../../models/Bonus";
import {BonusService} from "../../services/bonus/bonus.service";
import {SalesmanService} from "../../services/salesman/salesman.service";

let ELEMENT_DATA: Salesman[];

@Component({
  selector: "app-salesman-page",
  templateUrl: "./salesman-page.component.html",
  styleUrls: ["./salesman-page.component.css"],
  providers: [SalesmanService],
})
export class SalesmanPageComponent implements OnInit {
  /*
         The buttons in the baseline area of webpage
        */
  buttons: {title: string; action: string}[] = [];

  id: number;
  displayedColumns: string[] = [
    "id",
    "firstname",
    "lastname",
    "unit",
    "socialperformance",
    "bonus",
  ];
  dataSource: MatTableDataSource<Salesman> = new MatTableDataSource(ELEMENT_DATA);
  private bonuses: Bonus[];
  private salesmen: Salesman[];

  constructor(
    private service: SalesmanService,
    private bonusService: BonusService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.fetchBonusData();
    ELEMENT_DATA = [];
  }

  showSalesman(id: number): void {
    ELEMENT_DATA = []; // Empty the table

    this.service.getSalesman(id).subscribe((data) => {
      const {firstname, lastname, employeeid, unit, governmentid} = data;
      data["unit"] === "Sales"
        ? ELEMENT_DATA.push({firstname, lastname, employeeid, unit, governmentid})
        : null;
      this.dataSource = new MatTableDataSource<Salesman>(ELEMENT_DATA);
    });
  }

  showAllSalesman(): void {
    ELEMENT_DATA = []; // Empty the table

    for (const info of this.salesmen) {
      ELEMENT_DATA.push(info);
    }

    this.dataSource = new MatTableDataSource<Salesman>(ELEMENT_DATA);
  }

  showSalesmenWithBonuses(): void {
    ELEMENT_DATA = []; // Empty the table

    for (const info of this.salesmen) {
      for (const bonus of this.bonuses) {
        if (info.employeeid == bonus.sid) {
          ELEMENT_DATA.push(info);
          break;
        }
      }
    }

    this.dataSource = new MatTableDataSource<Salesman>(ELEMENT_DATA);
  }

  showSalesmenWithoutBonuses(): void {
    let salesmenWithBonuses = [];
    ELEMENT_DATA = []; // Empty the table

    for (const info of this.salesmen) {
      for (const bonus of this.bonuses) {
        if (info.employeeid == bonus.sid) {
          salesmenWithBonuses.push(info);
          break;
        }
      }
    }

    ELEMENT_DATA = this.salesmen.filter((salesman) => {
      return !salesmenWithBonuses.includes(salesman);
    });

    this.dataSource = new MatTableDataSource<Salesman>(ELEMENT_DATA);
  }

  openDialog(data: Salesman) {
    const dialogRef = this.dialog.open(SocialperformanceDialogComponent, {data});

    dialogRef.afterClosed().subscribe((result) => {
      // alert( `The Social Performance for ${ data.firstname } ${ data.lastname } has been saved!` )
    });
  }

  // Button-Click-Event-Evaluation
  performAction(fun): void {
    // The reason, why we implemented the performAction method, is because the methods of the class are
    // initialized later than the buttons-variable declaration. Therefor, the compiler fails to use the client
    // declaration, because it is injected AFTER calling the specific method of the assigned button
    eval(fun); // -> Here, it evaluates the given string in the field action
  }

  private fetchBonusData() {
    this.bonusService.getAllBonuses().subscribe(
      (bonuses: Bonus[]) => {
        this.bonuses = bonuses.filter((bonus) => {
          return bonus.verified;
        });
      },
      () => {},
      () => {
        this.fetchSalesmenData();
      },
    );
  }

  private fetchSalesmenData(): void {
    this.service.getAllSalesman().subscribe(
      (salesmen: Salesman[]) => {
        this.salesmen = salesmen;
      },
      () => {},
      () => {
        this.buttons.push(
          {title: "Show all salesman", action: "this.showAllSalesman()"},
          {title: "Show salesmen without bonuses", action: "this.showSalesmenWithoutBonuses()"},
          {title: "Show salesmen with bonuses", action: "this.showSalesmenWithBonuses()"},
        );
      },
    );
  }
}
