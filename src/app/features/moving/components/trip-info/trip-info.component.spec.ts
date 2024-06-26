import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripInfoComponent} from './trip-info.component';

describe('RouteFormComponent', () => {
  let component: TripInfoComponent;
  let fixture: ComponentFixture<TripInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TripInfoComponent]
    });
    fixture = TestBed.createComponent(TripInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
