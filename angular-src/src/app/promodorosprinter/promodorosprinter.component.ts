import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { PushNotificationsService, PushNotificationsModule } from 'ng-push';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { SprintListService } from '../services/sprint-list.service';
import { ISprintList } from '../models/SprintList';

@Component({
  selector: 'app-promodorosprinter',
  templateUrl: './promodorosprinter.component.html',
  styleUrls: ['./promodorosprinter.component.scss']
})
export class PromodorosprinterComponent implements OnInit {

  private newISprintList: ISprintList;
  
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

  
  
  public focusTime: number;
  public createdate: Date = new Date();
  public startdate: Date = new Date();
  finished: Date = new Date();
  radius = 54;
  circumference = 2 * Math.PI * this.radius;
  dashoffset: number;
  percentage: number = 0;
  curPerc: string = this.percentage + ' %';
  
  length: any = '';
  desc: any = '';
  notified: boolean = false;
  showModal = 'none';
  showFinalModal = 'none';

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
    this.progress(0);

  }

  ngOnInit() {

    this.username = this.username = localStorage.getItem('user');


    this.routeActive.queryParams.subscribe(params => {
      this.length = params['length'];
      this.desc = params['description'];
      this.notified= params['notify']==='true';
    });

    this.pushNotifications.requestPermission();
    this.startFocus(this.length);

  }
  private progress(value: number) {
    const progress = value / 100;
    this.dashoffset = this.circumference * (1 - progress);
  }

  showFinalMessage(){
    this.showFinalModal = 'block';    
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
        if (response.success == true){
          this.addList.emit(this.newISprintList);
          this.router.navigate(['/sprints']);          
        }        

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
        progress: this.currentState.toString(),
        description: this.desc,
        notify: false,
        user: this.username,
        createdAt: this.createdate,
        startedAt: this.startdate,
        finishedAt: new Date(Date.now())
      }
      this.finished = new Date(Date.now());
      this.showFinalMessage(); 
      if(this.notified){        
        this.notify();
      }
      this.onSubmit();
      


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
  ok(){
    this.showFinalModal = 'none';  
    this.router.navigate(['/sprints']);   
    
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
            this.finished = new Date(Date.now());

            this.onSubmit();       
                  

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
