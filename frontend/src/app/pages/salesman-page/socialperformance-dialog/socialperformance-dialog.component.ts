import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Salesman } from '../../../models/Salesman';
import { PerformanceRecord } from '../../../models/PerformanceRecord';
import { PerformanceRecordService } from '../../../services/record/performance-record.service';

@Component({
    selector: 'app-socialperformance-dialog',
    templateUrl: './socialperformance-dialog.component.html',
    styleUrls: ['./socialperformance-dialog.component.css'],
    providers: [PerformanceRecordService],
})
export class SocialperformanceDialogComponent implements OnInit {
    interval: number[];
    // PerformanceRecord
    description: string;
    targetValue: number;
    actualValue: number;
    year: number;
    private performanceRecordOfSalesman: PerformanceRecord[];
    private date: Date;

    constructor(
        public dialogRef: MatDialogRef<SocialperformanceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Salesman,
        private service: PerformanceRecordService,
    ) {}

    ngOnInit(): void {
        this.date = new Date();
        this.getYearsOfPerformance();
        this.getPerformanceRecordOfSalesman();
    }

    savePerformanceRecord() {
        this.service
            .addPerformanceRecord({
                sid: this.data.governmentid,
                description: this.description,
                targetValue: this.targetValue,
                actualValue: this.actualValue,
                year: this.year,
            })
            .subscribe(
                () => {},
                () => {},
                () => {
                    alert(
                        `The Social Performance Evaluation for ${this.data.firstname} ${this.data.lastname} has been saved!`,
                    );
                },
            );

        this.dialogRef.close();
    }

    getPerformanceRecordOfSalesman() {
        this.service
            .getPerformanceRecords(this.data.governmentid)
            .subscribe((data) => {
                console.log(data);
                this.performanceRecordOfSalesman = data;
            });
    }

    getTargetAndActualValue(year: number, description: string) {
        let hasValues = false;

        this.performanceRecordOfSalesman.forEach((value) => {
            if (value.year == year && value.description == description) {
                this.targetValue = value.targetValue;
                this.actualValue = value.actualValue;
                hasValues = true;
            }
        });

        if (!hasValues) this.targetValue = this.actualValue = null;
    }

    resetValues() {
        this.description = this.targetValue = this.actualValue = null;
    }

    private getYearsOfPerformance(): void {
        let current = this.date.getFullYear();
        let years = [];

        for (let i = 0; i < 5; i++) {
            years.push(current - i);
        }

        this.interval = years;
    }
}
