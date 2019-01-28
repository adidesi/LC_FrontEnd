import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssBankPage } from './iss-bank.page';

describe('IssBankPage', () => {
  let component: IssBankPage;
  let fixture: ComponentFixture<IssBankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssBankPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssBankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
