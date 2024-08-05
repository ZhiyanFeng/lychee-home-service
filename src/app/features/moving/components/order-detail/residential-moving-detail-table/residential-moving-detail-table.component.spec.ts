import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialMovingDetailTableComponent } from './residential-moving-detail-table.component';

describe('ResidentialMovingDetailTableComponent', () => {
  let component: ResidentialMovingDetailTableComponent;
  let fixture: ComponentFixture<ResidentialMovingDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentialMovingDetailTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentialMovingDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
