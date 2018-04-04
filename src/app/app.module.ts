import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { TableComponent } from './table/table.component';
import { CalendarService } from './calendar/calendar.service';
import { DayComponent } from './calendar/day/day.component';
import { DayService } from './calendar/day/day.service';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    NavigationbarComponent,
    TableComponent,
    DayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CalendarService, DayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
