import {Component, OnInit} from "@angular/core";
import {Bonus} from "../../models/Bonus";

import {Salesman} from "../../models/Salesman";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../models/User";
import {SalesmanService} from "../../services/salesman/salesman.service";
import {BonusService} from "../../services/bonus/bonus.service";

@Component({
  selector: "app-ceobonus-page",
  templateUrl: "./ceobonus-page.component.html",
  styleUrls: ["./ceobonus-page.component.css"],
  providers: [BonusService, SalesmanService],
})
export class CeoBonusComponent implements OnInit {
  displayedColumns: any = ["id", "firstname", "lastname", "year", "bonusValue", "actions"];
  dataSource: MatTableDataSource<Bonus> = new MatTableDataSource<Bonus>();

  user: User;
  bonuses: any;
  allSalesman: Salesman[];

  constructor(
    private bonusService: BonusService,
    private salesmanService: SalesmanService,
  ) {}

  ngOnInit(): void {
    this.user = history.state.user;

    this.getAllSalesman();
    this.getAllBonuses();
  }

  getDataFromSalesman(employeeid: number, property: string) {
    let data;

    this.allSalesman.forEach((salesman) => {
      if (salesman.employeeid == employeeid) {
        data = salesman[property];
      }
    });

    return data;
  }

  getSalesmanWithID(employeeid: number) {
    let data;

    this.allSalesman.forEach((salesman) => {
      if (salesman.employeeid == employeeid) {
        data = salesman;
      }
    });

    return data;
  }

  private getAllBonuses() {
    this.bonusService.getAllBonuses().subscribe(
      (data) => {
        let unverifiedBonuses = data.filter((value) => {
          return !value.verified;
        });
        this.dataSource = new MatTableDataSource<Bonus>(unverifiedBonuses);
      },
      () => {},
      () => {},
    );
  }

  private getAllSalesman() {
    this.salesmanService.getAllSalesman().subscribe((data) => {
      this.allSalesman = data;
    });
  }
}
