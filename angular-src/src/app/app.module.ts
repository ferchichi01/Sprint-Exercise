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
    BrowserAnimationsModule 
  ],
  providers: [SprintListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
