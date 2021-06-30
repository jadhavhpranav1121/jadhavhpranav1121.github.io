import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSideOrdersComponent } from './admin-side-orders.component';

describe('AdminSideOrdersComponent', () => {
  let component: AdminSideOrdersComponent;
  let fixture: ComponentFixture<AdminSideOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSideOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSideOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
