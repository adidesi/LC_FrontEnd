import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompComponent } from './customer-comp.component';

describe('CustomerCompComponent', () => {
  let component: CustomerCompComponent;
  let fixture: ComponentFixture<CustomerCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
