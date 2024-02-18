import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanPageComponent } from './salesman-page.component';

describe('SalesmanPageComponent', () => {
    let component: SalesmanPageComponent;
    let fixture: ComponentFixture<SalesmanPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SalesmanPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SalesmanPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
