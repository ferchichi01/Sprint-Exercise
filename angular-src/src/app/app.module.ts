import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PushNotificationsModule } from 'ng-push';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { PaginationModule, TabsModule} from 'ngx-bootstrap';
import { AppComponent } from './app.component';

import { ViewPastSprintComponent } from './view-past-sprint/view-past-sprint.component';
import { SprintListService } from './services/sprint-list.service';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { PromodorosprinterComponent } from './promodorosprinter/promodorosprinter.component';
import { AboutComponent } from './about/about.component';
import { MinuteSecondsPipe } from './minute-seconds.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
@NgModule({
  declarations: [
    AppComponent,
    ViewPastSprintComponent,
    HomeComponent,
    PromodorosprinterComponent,
    AboutComponent,
    MinuteSecondsPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    PushNotificationsModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule//add here
  ],
  providers: [SprintListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
