import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { TableComponent } from './table/table.component';
import { CalendarService } from './calendar/calendar.service';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    NavigationbarComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
