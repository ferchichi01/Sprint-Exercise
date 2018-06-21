import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSprintComponent } from './add-new-sprint.component';

describe('AddNewSprintComponent', () => {
  let component: AddNewSprintComponent;
  let fixture: ComponentFixture<AddNewSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
