import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {Observable, Observer} from "rxjs";
import {UserService} from "./user.service";
import {User} from "../models/User";
import {NotifyService} from "./_core/notify.service";

@Injectable({
  providedIn: "root",
})
export class RoleGuardService implements CanActivate {
  private user: User;
  private urls = {
    hr: ["salesman", "salesman,bonus", "salesman,bonus,add-bonus", "ceobonus"],
    ceo: ["ceobonus", "ceobonus,ceobonusdetail"], // CEO
    salesman: [],
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private notifyService: NotifyService,
  ) {}

  canActivate(router: ActivatedRouteSnapshot): Observable<boolean> {
    let url: string = router.url.toString();
    let isAllowedToEnter: boolean = true;

    this.userService.getOwnUser().subscribe(
      (user) => {
        this.user = user;
      },
      () => {},
      () => {
        if (this.user.role === "hr") {
          isAllowedToEnter = this.urls.hr.includes(url);
          if (!isAllowedToEnter) {
            this.router.navigate([""]).then((r) => {
              this.notifyService.error(`Access denied! \n url: ${url}`);
            });
          }
        } else if (this.user.role === "ceo") {
          isAllowedToEnter = this.urls.ceo.includes(url);
          if (!isAllowedToEnter) {
            this.router.navigate([""]).then((r) => {
              this.notifyService.error(`Access denied! \n url: ${url}`);
            });
          }
        } else if (this.user.role === "salesman") {
          this.router.navigate([""]).then((r) => {
            this.notifyService.error(`Access denied! \n url: ${url}`);
          });
        } else {
          isAllowedToEnter = true;
        }
      },
    );

    return new Observable<boolean>((observer: Observer<boolean>): void => {
      observer.next(isAllowedToEnter);
      observer.complete();
    });
  }
}
