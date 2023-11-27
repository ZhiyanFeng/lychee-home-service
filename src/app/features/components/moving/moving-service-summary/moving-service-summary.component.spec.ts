import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingServiceSummaryComponent} from './moving-service-summary.component';

describe('MovingServiceSummaryComponent', () => {
  let component: MovingServiceSummaryComponent;
  let fixture: ComponentFixture<MovingServiceSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MovingServiceSummaryComponent]
    });
    fixture = TestBed.createComponent(MovingServiceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
