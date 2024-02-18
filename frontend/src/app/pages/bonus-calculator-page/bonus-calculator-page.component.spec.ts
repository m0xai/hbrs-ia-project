import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusCalculatorPageComponent } from './bonus-calculator-page.component';

describe('BonusCalculatorPageComponent', () => {
    let component: BonusCalculatorPageComponent;
    let fixture: ComponentFixture<BonusCalculatorPageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BonusCalculatorPageComponent],
        });
        fixture = TestBed.createComponent(BonusCalculatorPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
