import { Component, OnInit } from '@angular/core';
import { Salesman } from '../../../../models/Salesman';
import { PerformanceRecord } from '../../../../models/PerformanceRecord';
import { Router } from '@angular/router';
import { Bonus } from '../../../../models/Bonus';
import { OpenCRXService } from '../../../../services/orders/orders.service';
import { PerformanceRecordService } from '../../../../services/record/performance-record.service';
import { BonusService } from '../../../../services/bonus/bonus.service';

interface CustomizedState {
    salesman: Salesman;
    bonuses: Bonus[];
    orders: object[];
    products: object[];
    salesOrders: object[];
}

@Component({
    selector: 'app-add-bonus-page',
    templateUrl: './add-bonus-page.component.html',
    styleUrls: ['./add-bonus-page.component.css'],
    providers: [OpenCRXService, PerformanceRecordService, BonusService],
})
export class AddBonusPageComponent implements OnInit {
    products: object[];
    salesOrders: object[];
    customersData: object[] = [];
    salesman: Salesman;
    interval: number[];
    year: number;
    readonly = true;
    categories: string[] = [
        'Leadership Competence',
        'Openness to Employee',
        'Social Behaviour to Employee',
        'Attitude towards Client',
        'Communication Skills',
        'Integrity to Company',
    ];
    performanceRecordsOfSalesman: PerformanceRecord[];
    private date: Date;
    private bonuses: Bonus[];
    private state: CustomizedState;

    constructor(
        private serviceOpenCRX: OpenCRXService,
        private servicePerformanceRecord: PerformanceRecordService,
        private serviceBonus: BonusService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.state = history.state as CustomizedState;
        this.salesman = this.state.salesman;
        this.bonuses = this.state.bonuses;
        this.salesOrders = this.state.salesOrders;
        this.products = this.state.products;

        this.getDataOfCustomers();
        this.getPerformanceRecordOfSalesman();

        this.date = new Date();
        this.getYearsOfPerformance();

        console.log('Alle Bonuses:');
        console.log(this.bonuses);

        console.log('Alle Products:');
        console.log(this.products);

        console.log('Alle Salesorders:');
        console.log(this.salesOrders);
    }

    getCustomerByCustomerID(customerUID: string): { accountRating: number } {
        let value;
        this.customersData.forEach((val): void => {
            if (val.uid === customerUID) {
                value = val;
            }
        });

        return value;
    }

    getNameByCustomerID(customerUID: string): string {
        return this.getCustomerByCustomerID(customerUID).fullName as string;
    }

    getRankingByCustomerID(uid: string): string {
        const customer = this.getCustomerByCustomerID(uid);
        let value: string;

        switch (customer?.accountRating) {
            case 1:
                value = 'excellent';
                break;
            case 2:
                value = 'very good';
                break;
            case 3:
                value = 'good';
                break;
            default:
                value = 'No rating available!';
                break;
        }

        return value;
    }

    getBonusmultiplikator(uid: string): number {
        const customer = this.getCustomerByCustomerID(uid);
        let value: number;

        switch (customer?.accountRating) {
            case 1:
                value = 0.09;
                break;
            case 2:
                value = 0.06;
                break;
            case 3:
                value = 0.03;
                break;
            default:
                value = 1;
                break;
        }

        return value;
    }

    /** Calculation methods ↓ */

    calculateOrderBonus(
        pricePerUnit: number,
        quantity: number,
        bonusmultiplikator: number,
    ) {
        return pricePerUnit * quantity * bonusmultiplikator;
    }

    calculatePerformanceBonus(
        targetValue: number,
        actualValue: number,
    ): number {
        let bonus = 0;
        if (targetValue < actualValue) {
            bonus = 100;
        } else if (targetValue == actualValue) {
            bonus = 50;
        } else if (targetValue - actualValue == 1) {
            bonus = 20;
        } else {
            // if target+actual>1
            bonus = 0;
        }

        return bonus;
    }

    calculateTotalOrderBonus(): number {
        let totalBonus = 0;

        for (const element of document
            .getElementsByClassName('orderBonus')
            [Symbol.iterator]()) {
            totalBonus += parseFloat(element.value);
        }

        return totalBonus;
    }

    calculateTotalPerformanceBonus(): number {
        let totalBonus = 0;

        for (const element of document
            .getElementsByClassName('performanceBonus')
            [Symbol.iterator]()) {
            totalBonus += parseFloat(element.value);
        }

        return totalBonus;
    }

    calculateTotalBonusSum(): number {
        let totalBonusSum = 0;
        for (const element of document
            .getElementsByClassName('totalBonus')
            [Symbol.iterator]()) {
            totalBonusSum += parseFloat(element.value);
        }
        return totalBonusSum;
    }

    showMissingCategories(): string {
        const descriptions: string[] = [];

        for (const performanceRecord of this.performanceRecordsOfSalesman) {
            if (performanceRecord.year == this.year) {
                descriptions.push(performanceRecord.description);
            }
        }

        const missingCategories: string[] = this.categories.filter(
            (value) => !descriptions.includes(value),
        );

        return missingCategories.length ? missingCategories.toString() : 'none';
    }

    sendBonusRequest(): void {
        this.serviceBonus
            .postUnverifiedBonusSalary({
                sid: this.salesman.employeeid,
                year: this.year,
                value: this.calculateTotalBonusSum(),
                remark: '',
                verified: false,
            })
            .subscribe();

        alert(
            `Successfully sent a bonus-salary request for ${this.salesman.firstname} ${this.salesman.lastname}!`,
        );
        void this.router.navigate(['salesman']);
    }

    hasAlreadyBonusSalaryForYear(): boolean {
        let disable = false;

        this.bonuses.forEach((bonus) => {
            if (bonus.year == this.year) {
                disable = true;
            }
        });

        return disable;
    }

    private getYearsOfPerformance(): void {
        const current = this.date.getFullYear();
        const years = [];

        for (let i = 0; i < 5; i++) {
            years.push(current - i);
        }

        this.interval = years;
    }

    private getDataOfCustomers(): void {
        this.serviceOpenCRX
            .listCustomers()
            .subscribe((data: object[]): void => {
                this.customersData = data;
                console.log('Alle CustomerData:');
                console.log(data);
            });
    }

    private getPerformanceRecordOfSalesman(): void {
        this.servicePerformanceRecord
            .getPerformanceRecords(this.salesman.governmentid)
            .subscribe((data): void => {
                this.performanceRecordsOfSalesman = data;
            });
    }
}
