import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialMovingDetailComponent } from './residential-moving-detail.component';

describe('QuotationComponent', () => {
  let component: ResidentialMovingDetailComponent ;
  let fixture: ComponentFixture<ResidentialMovingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ResidentialMovingDetailComponent]
    });
    fixture = TestBed.createComponent(ResidentialMovingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
