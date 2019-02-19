import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsCompComponent } from './account-details-comp.component';

describe('AccountDetailsCompComponent', () => {
  let component: AccountDetailsCompComponent;
  let fixture: ComponentFixture<AccountDetailsCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailsCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
