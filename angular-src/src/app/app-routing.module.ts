import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewPastSprintComponent } from './view-past-sprint/view-past-sprint.component';
import { AddNewSprintComponent } from './add-new-sprint/add-new-sprint.component';

const routes: Routes = [
  { path: 'sprints', component: ViewPastSprintComponent },
  { path: 'newsprint', component: AddNewSprintComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
