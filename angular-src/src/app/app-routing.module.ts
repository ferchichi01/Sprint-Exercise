import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ViewPastSprintComponent } from './view-past-sprint/view-past-sprint.component';
import { HomeComponent } from './home/home.component';
import { PromodorosprinterComponent } from './promodorosprinter/promodorosprinter.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sprints', component: ViewPastSprintComponent },
  { path: 'spinner', component: PromodorosprinterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
