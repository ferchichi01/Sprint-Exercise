import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPastSprintComponent } from './view-past-sprint.component';

describe('ViewPastSprintComponent', () => {
  let component: ViewPastSprintComponent;
  let fixture: ComponentFixture<ViewPastSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPastSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPastSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
