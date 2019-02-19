import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCompComponent } from './bank-comp.component';

describe('BankCompComponent', () => {
  let component: BankCompComponent;
  let fixture: ComponentFixture<BankCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
