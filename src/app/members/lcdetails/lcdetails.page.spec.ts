import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LCDetailsPage } from './lcdetails.page';

describe('LCDetailsPage', () => {
  let component: LCDetailsPage;
  let fixture: ComponentFixture<LCDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LCDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LCDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
