import { Component, OnInit } from '@angular/core';
import { SprintListService } from '../services/sprint-list.service';
import { ISprintList } from '../models/SprintList';



@Component({
  selector: 'app-view-past-sprint',
  templateUrl: './view-past-sprint.component.html',
  styleUrls: ['./view-past-sprint.component.css']
})
export class ViewPastSprintComponent implements OnInit {

  private sprintlists: ISprintList[] = [];

  constructor(private sprintlistServ: SprintListService) { }

  ngOnInit() {

     //Load all list on init
     this.loadLists();
  }

  public loadLists() {

    //Get all lists from server and update the lists property
    this.sprintlistServ.getAllLists().subscribe(
        response => this.sprintlists = response,)
  }

  public deleteList() {
    this.sprintlistServ.deleteList().subscribe(
      response =>    this.sprintlists = response,)
    }

}
