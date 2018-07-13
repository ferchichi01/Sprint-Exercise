import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { Router ,  NavigationExtras } from '@angular/router';
import { SprintListService } from '../services/sprint-list.service';
import { ISprintList } from '../models/SprintList';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-view-past-sprint',
  templateUrl: './view-past-sprint.component.html',
  styleUrls: ['./view-past-sprint.component.css']
})
export class ViewPastSprintComponent implements OnInit {

  private sprintlists: ISprintList[] = [];
  maxSize = 5;
  bigTotalItems = 175;
  bigCurrentPage = 1;
  public selectedValue: any = '' ;
  username = '';
  key: string = 'name'; //set default
  reverse: boolean = false;
  p: number = 1;


  sprints =  [
    {value:  '5',  viewValue:  'Instant(5s)'},
    {value:  '300',  viewValue:  'Very short(5min)'},
    {value:  '600',  viewValue:  'Short (10min)'},
    {value:  '1500',  viewValue:  'Pomodoro (25min)'},
    {value:  '2700',  viewValue:  'Long (45min)'},
    {value:  '3600',  viewValue:  'Very long (60min)'},

    ];
  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  disableEnable() {
    this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
  }

  onAddPost(_form: NgForm) {

    console.log(this.selectedValue);
      console.log(_form.value);
      const NavigationExtras:  NavigationExtras = {
      queryParams :  {'description' : _form.value.description , 'length' : _form.value.length, 'notify': _form.value.notify},
      fragment : 'anchor'
      };
     this.router.navigate(['/spinner'] , NavigationExtras);
  }
  constructor(private sprintlistServ: SprintListService,
    private router: Router
  ) { }

  ngOnInit() {

     //Load all list on init
     this.loadLists();
     this.username = localStorage.getItem('user');
  }

  public loadLists() {

    //Get all lists from server and update the lists property
    this.sprintlistServ.getAllLists().subscribe(
        res => this.sprintlists = res,)
  }

  public deleteList() {
    this.sprintlistServ.deleteList().subscribe(
      response =>    this.sprintlists = response,)
    }
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
}
