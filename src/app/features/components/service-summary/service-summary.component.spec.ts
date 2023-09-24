import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSummaryComponent } from './service-summary.component';

describe('ServiceSummaryComponent', () => {
  let component: ServiceSummaryComponent;
  let fixture: ComponentFixture<ServiceSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServiceSummaryComponent]
    });
    fixture = TestBed.createComponent(ServiceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
