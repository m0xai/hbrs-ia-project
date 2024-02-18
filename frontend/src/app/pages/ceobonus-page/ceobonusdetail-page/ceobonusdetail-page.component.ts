import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../../../models/User";
import {Salesman} from "../../../models/Salesman";
import {Bonus} from "../../../models/Bonus";
import {BonusService} from "../../../services/bonus/bonus.service";

@Component({
  selector: "app-ceobonusdetail-page",
  templateUrl: "./ceobonusdetail-page.component.html",
  styleUrls: ["./ceobonusdetail-page.component.css"],
  providers: [BonusService],
})
export class CeoBonusDetailComponent implements OnInit {
  user: User;
  bonus: Bonus;
  salesman: Salesman;

  constructor(
    private bonusService: BonusService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.bonus = history.state.bonus;
    this.salesman = history.state.salesman;
    this.user = history.state.user;

    console.log(this.user);
  }

  deleteUnverifiedBonus() {
    this.bonusService.deleteBonusOfSalesmanFromMongoDB(this.bonus.sid, this.bonus.year).subscribe(
      () => {},
      () => {},
      () => {
        this.router.navigateByUrl("ceobonus").then(() => {
          alert(
            `The bonus of ${this.salesman.firstname} ${this.salesman.lastname} for ${this.bonus.year} has been deleted successfully!`,
          );
        });
      },
    );
  }

  verifyAndSaveBonus() {
    // @ts-ignore
    this.bonus.remark = document.getElementById("remark-textfield").value;

    this.bonusService.postVerifiedBonusSalary(this.bonus).subscribe(
      () => {},
      () => {},
      () => {
        this.router.navigateByUrl("ceobonus").then(() => {
          alert(
            `The bonus of ${this.salesman.firstname} ${this.salesman.lastname} for ${this.bonus.year} has been verified successfully!`,
          );
        });
      },
    );
  }
}
