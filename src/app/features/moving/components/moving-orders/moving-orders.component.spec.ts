import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingOrdersComponent } from './moving-orders.component';

describe('MovingOrdersComponent', () => {
  let component: MovingOrdersComponent;
  let fixture: ComponentFixture<MovingOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovingOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
