import { Component, OnInit } from '@angular/core';

import { SprintListService } from '../services/sprint-list.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public auth: SprintListService) { 
    auth.handleAuthentication();
  }

  ngOnInit() {
  }

}
