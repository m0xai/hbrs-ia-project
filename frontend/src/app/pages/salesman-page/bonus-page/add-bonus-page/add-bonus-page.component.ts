import { Component, OnInit } from '@angular/core';
import { Salesman } from '../../../../models/Salesman';
import { PerformanceRecord } from '../../../../models/PerformanceRecord';
import { Router } from '@angular/router';
import { Bonus } from '../../../../models/Bonus';
import { OpenCRXService } from '../../../../services/orders/orders.service';
import { PerformanceRecordService } from '../../../../services/record/performance-record.service';
import { BonusService } from '../../../../services/bonus/bonus.service';

@Component({
    selector: 'app-add-bonus-page',
    templateUrl: './add-bonus-page.component.html',
    styleUrls: ['./add-bonus-page.component.css'],
    providers: [OpenCRXService, PerformanceRecordService, BonusService],
})
export class AddBonusPageComponent implements OnInit {
    products: any;
    salesOrders: any;
    customersData: any[] = [];
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

    constructor(
        private serviceOpenCRX: OpenCRXService,
        private servicePerformanceRecord: PerformanceRecordService,
        private serviceBonus: BonusService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.salesman = history.state.salesman;
        this.bonuses = history.state.bonuses;
        this.salesOrders = history.state.salesOrders;
        this.products = history.state.products;

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

    getCustomerByCustomerID(customerUID: string): any {
        let value;
        this.customersData.forEach((val) => {
            if (val.uid === customerUID) {value = val; }
        });

        return value;
    }

    getNameByCustomerID(customerUID: string): string {
        return this.getCustomerByCustomerID(customerUID).fullName;
    }

    getRankingByCustomerID(uid: string) {
        const customer = this.getCustomerByCustomerID(uid);
        let value;

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

    getBonusmultiplikator(uid: string) {
        const customer = this.getCustomerByCustomerID(uid);
        let value;

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
        pricePerUnit: any,
        quantity: any,
        bonusmultiplikator: any,
    ) {
        return pricePerUnit * quantity * bonusmultiplikator;
    }

    calculatePerformanceBonus(targetValue: any, actualValue: any) {
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

    calculateTotalOrderBonus() {
        let totalBonus = 0;

        for (const element of document
            .getElementsByClassName('orderBonus')
            [Symbol.iterator]()) {
            totalBonus += parseFloat(element.value);
        }

        return totalBonus;
    }

    calculateTotalPerformanceBonus() {
        let totalBonus = 0;

        for (const element of document
            .getElementsByClassName('performanceBonus')
            [Symbol.iterator]()) {
            totalBonus += parseFloat(element.value);
        }

        return totalBonus;
    }

    calculateTotalBonusSum() {
        let totalBonusSum = 0;
        for (const element of document
            .getElementsByClassName('totalBonus')
            [Symbol.iterator]()) {
            totalBonusSum += parseFloat(element.value);
        }
        return totalBonusSum;
    }

    showMissingCategories() {
        const descriptions = [];

        for (const performanceRecord of this.performanceRecordsOfSalesman) {
            if (performanceRecord.year == this.year) {
                descriptions.push(performanceRecord.description);
            }
        }

        const missingCategories = this.categories.filter((value) => !descriptions.includes(value));

        return missingCategories.length ? missingCategories.toString() : 'none';
    }

    sendBonusRequest() {
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

    private getDataOfCustomers() {
        this.serviceOpenCRX.listCustomers().subscribe((data) => {
            this.customersData = data;
            console.log('Alle CustomerData:');
            console.log(data);
        });
    }

    private getPerformanceRecordOfSalesman() {
        this.servicePerformanceRecord
            .getPerformanceRecords(this.salesman.governmentid)
            .subscribe((data) => {
                this.performanceRecordsOfSalesman = data;
            });
    }
}
