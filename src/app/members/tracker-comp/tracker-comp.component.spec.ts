import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerCompComponent } from './tracker-comp.component';

describe('TrackerCompComponent', () => {
  let component: TrackerCompComponent;
  let fixture: ComponentFixture<TrackerCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
