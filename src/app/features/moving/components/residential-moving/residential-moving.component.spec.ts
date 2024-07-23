import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialMovingComponent } from './residential-moving.component';

describe('QuotationComponent', () => {
  let component: ResidentialMovingComponent ;
  let fixture: ComponentFixture<ResidentialMovingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ResidentialMovingComponent]
    });
    fixture = TestBed.createComponent(ResidentialMovingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
