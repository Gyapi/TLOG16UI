import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {

  constructor(private calendarServer: CalendarService) {
  }

  public actualYear: number;
  public yearOptions: Array<number>;
  private lastYearIndex: number = 0;
  public monthPicker : number;
  public required: number;
  public extra: number;
  public all: number;
  public daysOfMonth: Array<number>; //min 28 max 37
  public actualMonth: number;


  ngOnInit() {
    let thisYear: number = new Date().getFullYear();
    let thisMonth: number = new Date().getMonth();

    this.actualYear = thisYear;
    this.yearOptions = Array();

    for (let i = 2014; i <= thisYear; i++){
      this.yearOptions.push(i);
      this.lastYearIndex++;
    }

    this.getMonthData(thisMonth);
  }

  public findMonth(selectedYear: any) {
    this.actualYear = parseInt(selectedYear.target.value, 10);
    this.getMonthData(this.monthPicker);
  }

  public getMonthData(thisMonth: number){
    this.monthPicker = thisMonth;
    this.required = 0;
    this.extra = 0;
    this.all = 0;

    let gaveMonth = thisMonth + 1;
    this.calendarServer.getMonth(this.actualYear, gaveMonth).subscribe(
     monthData => {
        this.buildMonth(thisMonth, monthData);
      },
     error => {
        console.log(this.actualYear + '/' + thisMonth);
        console.log(error.error.text);
        this.buildMonth(thisMonth, null);
      }
     )
  }

  private buildMonth(month: number, monthData: any){
    let monthLength: number = new Date(this.actualYear, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(this.actualYear, month, 1).getDay();
    let startIndex = 0 - (firstDayOfMonth - 1);
    let i, k = 0;

    if (monthData != null){
      this.required = monthData.Required/60;
      this.extra = monthData.Extra/60;
      this.all = monthData.Sum/60;
    }

    this.actualMonth = month;
    this.daysOfMonth = Array();
    for (i = startIndex; i <= monthLength; i++){
      this.daysOfMonth[k] = startIndex;
      startIndex++;
      k++;
    }
  }
}
