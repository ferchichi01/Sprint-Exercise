import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromodorosprinterComponent } from './promodorosprinter.component';

describe('PromodorosprinterComponent', () => {
  let component: PromodorosprinterComponent;
  let fixture: ComponentFixture<PromodorosprinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromodorosprinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromodorosprinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
