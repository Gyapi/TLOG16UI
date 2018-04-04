import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private calendarServer: CalendarService) {
  }

  daysOfMonth: Array<number>; //min 28 max 37
  weeksOfMonth: Array<number>; //min 4 max 6
  actualYear: number;
  required: number = 0;
  extra: number = 0;
  all: number = 0;
  actualMonth: number;

  ngOnInit() {
    let thisYear: number = new Date().getFullYear();
    let thisMonth: number = new Date().getMonth();
    let selector: any = document.getElementById('yearSelect');

    this.actualYear = thisYear;

    for (let i: number = 2013; i <= thisYear; i++) {
      if (i == thisYear) {
        selector.insertAdjacentHTML('beforeend', '<option value="' + i + '" selected="selected">' + i + '</option>');
      }
      else {
        selector.insertAdjacentHTML('beforeend', '<option value="' + i + '">' + i + '</option>');
      }
    }

    this.getMonthData(thisMonth);
  }

  findMonth() {
    this.actualYear = Number((<HTMLInputElement>document.getElementById('yearSelect')).value);
    let activeMonth = document.getElementById('datePicker').getElementsByClassName('active');
    let thisMonth = parseInt(activeMonth[0].getAttribute('id').substring(5), 10);
    this.getMonthData(thisMonth);
  }

  getMonthData(thisMonth: number){
    let actives = document.getElementById('datePicker').getElementsByClassName('active');
    for (let i: number = 0; i < actives.length; i++) {
      actives[i].classList.remove('active');
    }
    document.getElementById('month' + thisMonth).classList.add('active');

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

  buildMonth(month: number, monthData: any){
    let monthLength: number = new Date(this.actualYear, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(this.actualYear, month, 1).getDay();
    let startIndex = 0 - (firstDayOfMonth - 1);
    let i, k = 0;
    this.daysOfMonth = Array();
    this.weeksOfMonth = Array();

    document.getElementById('month' + month).classList.add('active');
    document.getElementById('extra').classList.remove('red');
    document.getElementById('extra').classList.remove('green');
    document.getElementById('all').classList.remove('red');
    document.getElementById('all').classList.remove('green');

    if (monthData != null){
      this.required = monthData.Required/60;
      this.extra = monthData.Extra/60;
      this.all = monthData.Sum/60;
      if (monthData.Extra < 0){
        document.getElementById('extra').classList.add('red');
        document.getElementById('all').classList.add('red');
      } else{
        document.getElementById('extra').classList.add('green');
        document.getElementById('all').classList.add('green');
      }
    }

    this.actualMonth = month;
    for (i = startIndex; i <= monthLength; i++){
      this.daysOfMonth[k] = startIndex;
      startIndex++;
      k++;
    }
  }

}
