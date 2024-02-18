import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialperformanceDialogComponent } from './socialperformance-dialog.component';

describe('SocialperformanceDialogComponent', () => {
  let component: SocialperformanceDialogComponent;
  let fixture: ComponentFixture<SocialperformanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialperformanceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialperformanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
