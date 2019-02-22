import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnxButtonComponent } from './tnx-button.component';

describe('TnxButtonComponent', () => {
  let component: TnxButtonComponent;
  let fixture: ComponentFixture<TnxButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnxButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnxButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
