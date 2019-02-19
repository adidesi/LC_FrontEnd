import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LCDetailsCompComponent } from './lcdetails-comp.component';

describe('LCDetailsCompComponent', () => {
  let component: LCDetailsCompComponent;
  let fixture: ComponentFixture<LCDetailsCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LCDetailsCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LCDetailsCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
