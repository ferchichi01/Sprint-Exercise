import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddNewSprintComponent } from './add-new-sprint/add-new-sprint.component';
import { ViewPastSprintComponent } from './view-past-sprint/view-past-sprint.component';
import { SprintListService } from './services/sprint-list.service';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AddNewSprintComponent,
    ViewPastSprintComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [SprintListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
