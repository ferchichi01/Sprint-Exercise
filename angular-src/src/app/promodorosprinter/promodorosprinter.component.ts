import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { PushNotificationsService } from 'ng-push';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { SprintListService } from '../services/sprint-list.service';
import { ISprintList } from '../models/SprintList';

import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { ViewPastSprintComponent } from '../view-past-sprint/view-past-sprint.component';
import { YEAR, MONTH } from 'ngx-bootstrap/chronos/units/constants';


@Component({
  selector: 'app-promodorosprinter',
  templateUrl: './promodorosprinter.component.html',
  styleUrls: ['./promodorosprinter.component.scss']
})
export class PromodorosprinterComponent implements OnInit {

  private newISprintList: ISprintList;
  private sprintlists: ISprintList[] = [];
  @Output() addList: EventEmitter<ISprintList> = new EventEmitter<ISprintList>();

  @ViewChild('bar') bar: ElementRef;

  username = '';
  public time: number;
  public count: number;

  public focus: boolean;
  public pause: boolean;
  public timerActive: boolean;

  public currentState: number;
  public currentStateName: string;

  public shortBreakTime: number;
  public longBreakTime: number;
  public focusTime: number;
  public createdate: Date = new Date();
  public startdate: Date = new Date();

  length: any = '';
  desc: any = '';

  constructor(private pushNotifications: PushNotificationsService,
    private routeActive: ActivatedRoute,
    private sprintlistServ: SprintListService,
    private router: Router,
    private http : Http
    
  ) {
    this.time = 0;

    this.focus = false;
    this.pause = false;
    this.timerActive = false;

    this.currentState = 0;
    this.currentStateName = 'set timer';

  }

 


  ngOnInit() {

    this.username = this.username = localStorage.getItem('user');


    this.routeActive.queryParams.subscribe(params => {
      this.length = params['length'];
      this.desc = params['description'];
    });

    this.pushNotifications.requestPermission();
    this.startFocus(this.length);




  }


  notify() {
    const options = {
      body: `Your ${this.currentStateName} has ended.`,
      icon: '../assets/images/logo.png'
    };

    this.pushNotifications.create('Timeout!', options)
      .subscribe(res => {
        if (res.event.type === 'click') {
          res.notification.close();

        }

      });
  }
  
  public onSubmit() {

    this.sprintlistServ.addList(this.newISprintList).subscribe(
      response => {
        if (response.success == true)
          this.addList.emit(this.newISprintList);
      },
    );


  }

  public setTimer(time: number, focus: boolean = false) {
    this.currentState = time;
    this.setTimerSvg(time);

    this.currentStateName = this.changeCurrentState(time);

    this.focus = focus;
    this.time = time;
    this.startTimer();
  }

  public setTimerToZero(time: number, focus: boolean = false) {
    if (confirm('Stop the sprint?')) {
      this.currentState = time;
      this.setTimerSvg(time);

      this.currentStateName = this.changeCurrentState(time);
      this.focus = focus;
      this.time = time;
      this.startTimer();
      this.newISprintList = {

        name: this.length,
        duration: "25mn",
        status: "Cancelled",
        progress: this.time.toString(),
        description: this.desc,
        notify: false,
        user: this.username,
        createdAt: this.createdate,
        startedAt: this.startdate,
        finishedAt: new Date(Date.now())
      }
      this.onSubmit();
      this.router.navigate(['/sprints']);


    }
  }


  private changeCurrentState(time: number): string {
    switch (time) {
      case this.length:
        return this.desc;
      default:
        return 'set timer';
    }
  }

  public setTimerSvg(time: number) {
    this.bar.nativeElement.style.strokeDashoffset = this.changeBarStroke(time);
  }

  private changeBarStroke(time: number): string {
    if (time === 0) {
      return '0';
    }

    return (848.23 * (1 - time / this.currentState)).toString();
  }

  public startFocus(length: number) {
    this.focus = true;
    this.count = 0;
    this.setTimer(length, true);
  }

  public togglePause() {
    this.pause = !this.pause;
    this.startTimer();
  }

  public startTimer() {
    if (!this.timerActive || this.currentState === 0) {
      this.timerActive = true;
      this.timer();
    }
  }

  public timer() {
    if (this.time > 0 && !this.pause) {
      setTimeout(() => {
        if (this.time > 0) {
          if (this.time - 1 === 0) {
            this.timerActive = false;
            this.notify();
            this.newISprintList = {

              name: this.length,
              duration: "25mn",
              status: "Completed",
              progress: "25%",
              description: this.desc,
              notify: false,
              user: this.username,
              createdAt: this.createdate,
              startedAt: this.startdate,
              finishedAt: new Date(Date.now())
            }
            this.onSubmit();
            
            this.router.navigate(['/sprints']);
            

          }
          this.time -= 1;
          this.setTimerSvg(this.time);
          this.timer();
        }
      }, 1000);
    } else {
      this.timerActive = false;
      if (this.focus && !this.pause) {
        this.count++;

      }
    }

  }

}
