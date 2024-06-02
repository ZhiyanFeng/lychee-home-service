import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallMovingDetailComponent } from './small-moving-detail.component';

describe('SmallMovingQuotationComponent', () => {
  let component: SmallMovingDetailComponent;
  let fixture: ComponentFixture<SmallMovingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SmallMovingDetailComponent]
    });
    fixture = TestBed.createComponent(SmallMovingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
