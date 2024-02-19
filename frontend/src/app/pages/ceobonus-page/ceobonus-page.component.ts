import { Component, OnInit } from '@angular/core';
import { Bonus } from '../../models/Bonus';

import { Salesman } from '../../models/Salesman';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/User';
import { SalesmanService } from '../../services/salesman/salesman.service';
import { BonusService } from '../../services/bonus/bonus.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-ceobonus-page',
    templateUrl: './ceobonus-page.component.html',
    styleUrls: ['./ceobonus-page.component.css'],
    providers: [BonusService, SalesmanService],
})
export class CeoBonusComponent implements OnInit {
    displayedColumns: any = [
        'id',
        'firstname',
        'lastname',
        'year',
        'bonusValue',
        'actions',
    ];
    dataSource: MatTableDataSource<Bonus> = new MatTableDataSource<Bonus>();

    user: User;
    bonuses: any;
    allSalesman: Salesman[];

    constructor(
        private bonusService: BonusService,
        private userService: UserService,
        private salesmanService: SalesmanService,
    ) {}

    ngOnInit(): void {
        this.userService.getOwnUser().subscribe((val): void => {
            this.user = val;
            console.log('User Role: ', this.user.role);
        });

        this.getAllSalesman();
        this.getAllBonuses();
    }

    getDataFromSalesman(employeeid: number, property: string): object {
        let data: object;

        this.allSalesman.forEach((salesman): void => {
            if (salesman.employeeid === employeeid) {
                data = salesman[property];
            }
        });

        return data;
    }

    getSalesmanWithID(employeeid: number): Salesman {
        let data: Salesman;

        this.allSalesman.forEach((salesman): void => {
            if (salesman.employeeid === employeeid) {
                data = salesman;
            }
        });

        return data;
    }

    private getAllBonuses(): void {
        this.bonusService.getAllBonuses().subscribe(
            (data): void => {
                const unverifiedBonuses = data.filter(
                    (value): boolean => !value.verified,
                );
                this.dataSource = new MatTableDataSource<Bonus>(
                    unverifiedBonuses,
                );
            },
            (): void => {},
            (): void => {},
        );
    }

    private getAllSalesman(): void {
        this.salesmanService.getAllSalesman().subscribe((data): void => {
            this.allSalesman = data;
        });
    }
}
