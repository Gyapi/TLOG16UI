import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule  } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';


import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { TableComponent } from './table/table.component';
import { CalendarService } from './calendar/calendar.service';
import { DayComponent } from './calendar/day/day.component';
import { DayService } from './calendar/day/day.service';
import { WeekendDialogComponent } from './calendar/day/weekend-dialog/weekend-dialog.component';
import { DayTableComponent } from './table/day-table/day-table.component';
import { TableService } from './table/table.service';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    NavigationbarComponent,
    TableComponent,
    DayComponent,
    WeekendDialogComponent,
    DayTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [CalendarService, DayService, TableService],
  bootstrap: [AppComponent],
  entryComponents:[ WeekendDialogComponent ]
})
export class AppModule { }
