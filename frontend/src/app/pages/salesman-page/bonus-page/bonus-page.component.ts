import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Salesman } from '../../../models/Salesman';
import { Bonus } from '../../../models/Bonus';
import { Router } from '@angular/router';
import { OpenCRXService } from '../../../services/orders/orders.service';
import { BonusService } from '../../../services/bonus/bonus.service';

let ELEMENT_DATA: Bonus[];

@Component({
    selector: 'app-bonus',
    templateUrl: './bonus-page.component.html',
    styleUrls: ['./bonus-page.component.css'],
    providers: [BonusService, OpenCRXService],
})
export class BonusPageComponent implements OnInit {
    products: object;

    bonuses: Bonus[];
    salesOrders: object[];
    salesOrdersData: object[] = [];

    salesman: Salesman;
    displayedColumns: string[] = ['year', 'value', 'delete'];
    dataSource: MatTableDataSource<Bonus> = new MatTableDataSource(
        ELEMENT_DATA,
    );
    private salesmanAccount: object;
    private button: HTMLElement;
    private loadingInfo: HTMLElement;

    constructor(
        private serviceBonus: BonusService,
        private serviceOpenCRX: OpenCRXService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.button = document.getElementById('button');
        this.loadingInfo = document.getElementById('loadingInfo');

        this.salesman = history.state.salesman; // Der Salesman wird von Salesman Page transferiert
        this.fetchVerifiedBonusData(this.salesman.employeeid); // Der Bonus wird gefetcht { year: string, value: string }

        this.getProducts();

        this.collectDataFromSalesman().then();
    }

    deleteBonusOfSalesman(
        employeeid: string | number,
        year: string | number,
        value: string | number,
    ): void {
        this.serviceBonus
            .deleteBonusOfSalesmanFromOrangeHRM(employeeid, year, value)
            .subscribe(
                () => {},
                () => {},
                () => {
                    this.deleteBonusOfSalesmanFromMongoDB(employeeid, year);
                },
            );
    }

    private getLoadingInfo(): void {
        this.loadingInfo.innerHTML = this.button.hasAttribute('disabled')
            ? '<i>  loading data...</i>'
            : '<i>  data loaded ✅</i>';
    }

    private fetchVerifiedBonusData(id: string | number): void {
        // Fetch the bonus salary
        this.serviceBonus.getBonusesOfSalesman(id).subscribe(
            (data): void => {
                ELEMENT_DATA = data;
                this.dataSource = new MatTableDataSource<Bonus>(ELEMENT_DATA);
            },
            (): void => {},
            (): void => {
                this.fetchUnverifiedAndVerifiedBonusData();
            },
        );
    }

    private fetchUnverifiedAndVerifiedBonusData(): void {
        this.serviceBonus
            .getVerifiedAndUnverifiedBonusesOfSalesman(this.salesman.employeeid)
            .subscribe((data): void => {
                this.bonuses = data;
            });
    }

    private getProducts(): void {
        this.serviceOpenCRX.listProducts().subscribe((data) => {
            this.products = data;
        });
    }

    // 1. First collect data from Salesman
    private async collectDataFromSalesman(): Promise<void> {
        this.serviceOpenCRX.listAccounts().subscribe(
            (data): void => {
                this.salesmanAccount = data[0].filter(
                    (value): boolean =>
                        value.governmentId === this.salesman.governmentid,
                )[0];
                console.log('SA: ', this.salesmanAccount);
            },
            (error) => {},
            async () => {
                /** Insert all necessary methods here! salesmanAccount is initialized in this area */
                if (this.salesmanAccount) {
                    this.getLoadingInfo();
                    await this.getContractsFromSalesman();
                } else {
                    this.setInfoForNoData();
                }
            },
        );
    }

    // 2. Then collect data about contracts of salesman
    private async getContractsFromSalesman(): Promise<void> {
        this.serviceOpenCRX
            .getSalesmanContracts(this.salesmanAccount.uid)
            .subscribe(
                (data): void => {
                    console.log('SO: ', data);
                    this.salesOrders = data;
                },
                (): void => {
                    this.setInfoForNoData();
                },
                (): void => {
                    if (this.salesOrders) {
                        this.getSpecificDetailsOfSalesOrders(this.salesOrders);
                    } else {
                        this.setInfoForNoData();
                    }
                },
            );
    }

    // 3. Then collect specific data of each sales order
    private getSpecificDetailsOfSalesOrders(salesOrders, i: number = 0): void {
        if (i >= this.salesOrders.length) {
            this.getPositionOfSalesOrder(this.salesOrdersData);
            return;
        }

        this.serviceOpenCRX
            .getSalesOrderData(salesOrders[i].contractID)
            .subscribe(
                (data): void => {
                    this.salesOrdersData.push(data);
                },
                (): void => {
                    this.setInfoForNoData();
                },
                (): void => {
                    this.getSpecificDetailsOfSalesOrders(salesOrders, i + 1);
                },
            );
    }

    // Result → this.salesOrderData = [ [{ DataOfSalesOrder }, [ ...{ ProductsOfSalesOrder } ]], ... ]
    // Remark: We need to call the method in the Observable to make sure, that the variables are initialized
    // The recursive calls allow us to fetch the data one by one from OpenCRX.

    // 4. Then collect data about the products of each sales order
    private getPositionOfSalesOrder(salesOrdersData, i: number = 0): void {
        if (i >= this.salesOrdersData.length) {
            /** The End ↓ */
            this.setButtonAttribute();
            this.getLoadingInfo();
            return;
        }

        this.serviceOpenCRX
            .getSalesOrderPosition(salesOrdersData[i][0].contractID)
            .subscribe(
                (data): void => {
                    // @ts-ignore
                    let data_: any[] = data;

                    // If [{A}] then [{A},{}]
                    // If [{B}] then [{},{B}]
                    // If [{A},{B}] then [{A},{B}]
                    // If [] then [{},{}]
                    for (const [index, product] of this.products.entries()) {
                        if (
                            !data_[index] ||
                            product.productID !== data_[index]?.productID
                        ) {
                            if (!index && data_.length < 1) {
                                data_.push({}, {});
                                break;
                            } else if (index) {
                                data_.push({});
                            } else {
                                const tmp = [{}, data_.pop()];
                                data_ = tmp;
                            }
                        }
                    }

                    this.salesOrdersData[i].push(data_);
                },
                () => {
                    this.setInfoForNoData();
                },
                () => {
                    this.getPositionOfSalesOrder(salesOrdersData, i + 1);
                },
            );
    }

    // Some CSS Styling for "Add Bonus"-Button
    private setButtonAttribute(): void {
        this.button.removeAttribute('disabled');
        this.button.style.color = '#fff';
        this.button.style.cursor = 'pointer';
    }

    private deleteBonusOfSalesmanFromMongoDB(
        employeeid: string | number,
        year: string | number,
    ): void {
        this.serviceBonus
            .deleteBonusOfSalesmanFromMongoDB(employeeid, year)
            .subscribe(
                () => {},
                () => {},
                () => {
                    alert(
                        `Bonus from Salesman \'${this.salesman.firstname} ${this.salesman.lastname}\' of ${year} has been deleted!`,
                    );
                    void this.router.navigate(['/salesman']);
                },
            );
    }

    private setInfoForNoData(): void {
        this.loadingInfo.innerHTML = '<i>  No data available! ❌</i>';
        this.button.style.cursor = 'no-drop';
    }
}
