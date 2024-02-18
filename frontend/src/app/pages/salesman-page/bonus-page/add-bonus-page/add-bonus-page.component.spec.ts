import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBonusPageComponent } from './add-bonus-page.component';

describe('AddBonusPageComponent', () => {
  let component: AddBonusPageComponent;
  let fixture: ComponentFixture<AddBonusPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBonusPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBonusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
