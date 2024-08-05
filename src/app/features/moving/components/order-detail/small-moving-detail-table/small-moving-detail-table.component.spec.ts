import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallMovingDetailTableComponent } from './small-moving-detail-table.component';

describe('SmallMovingDetailTableComponent', () => {
  let component: SmallMovingDetailTableComponent;
  let fixture: ComponentFixture<SmallMovingDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallMovingDetailTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallMovingDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
