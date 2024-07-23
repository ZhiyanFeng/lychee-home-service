import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallMovingComponent } from './small-moving.component';

describe('SmallMovingQuotationComponent', () => {
  let component: SmallMovingComponent;
  let fixture: ComponentFixture<SmallMovingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SmallMovingComponent]
    });
    fixture = TestBed.createComponent(SmallMovingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
