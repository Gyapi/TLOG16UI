import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private calendarServer: CalendarService) {
  }

  ngOnInit() {
    let thisYear: number = new Date().getFullYear();
    let thisMonth: number = new Date().getMonth();
    let selector: any = document.getElementById('yearSelect');

    for (let i: number = 2013; i <= thisYear; i++) {
      if (i == thisYear) {
        selector.insertAdjacentHTML('beforeend', '<option value="' + i + '" selected="selected">' + i + '</option>');
      }
      else {
        selector.insertAdjacentHTML('beforeend', '<option value="' + i + '">' + i + '</option>');
      }
    }

    this.buildMonth(thisMonth);
    this.getMonthData();
  }

  getMonthData(){
    console.log('mehj');
    let asd = this.calendarServer.getMonth();
    console.log(asd);
  }

  findMonth() {
    let activeMonth = document.getElementById('datePicker').getElementsByClassName('active');
    let month = parseInt(activeMonth[0].getAttribute('id').substring(5), 10);
    this.buildMonth(month);
  }

  buildMonth(month: number): void {

    let year: number = Number((<HTMLInputElement>document.getElementById('yearSelect')).value);
    let monthLength: number = new Date(year, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let n = weekday[firstDayOfMonth];
    let runTime = (monthLength / 7) + 1;
    let c = 0;
    let dayOfLast = new Date(year, month, 0).getDate();
    let j = 0;
    let day = 1;
    let daysDiv = document.getElementById('days');


    daysDiv.innerHTML = "";
    let actives = document.getElementById('datePicker').getElementsByClassName('active');
    for (let i: number = 0; i < actives.length; i++) {
      actives[i].classList.remove('active');
    }
    document.getElementById('month' + month).classList.add('active');


    for (let i = 0; i < runTime; i++) {
      daysDiv.insertAdjacentHTML('beforeend', '<div id="line' + i + '" class="line"></div>');

      if (n !== "Sunday") {
        dayOfLast -= firstDayOfMonth - 1;
        while (weekday[c] !== n) {
          document.getElementById('line' + i).insertAdjacentHTML('beforeend',
            '<div class="container disabled"><div class="day">' + dayOfLast + '</div><div></div></div>');
          c++;
          j++;
          dayOfLast++;
        }
      }
      else {
        j = 1;
      }

      while (j % 7 !== 0) {
        this.makeADiv(day, i, year, month);
        day++;
        if (day === monthLength + 1) {
          return;
        }
      }
      j = 0;
      n = "Sunday";
    }
  }

  makeADiv(day, i, year, month): void{

    document.getElementById('line' + i).insertAdjacentHTML('beforeend',
      '<div class="container"><div class="day">' + day + '</div>\n\
                <div class="inner" id="day' + day + '">' +
          '<input id="inReq' + day + '" type="text" class="form-control" value="">' +
          '<button type="button" class="aBtn" onClick="activateDay(' + year + ', ' + month + ', ' + day +
          ')" >Activate</button>' +
          '<input type="text" class="form-control" value="" disabled >' +
          '<p class="placeholder">Work Sum</p>' +
          '<input type="text" class="form-control" value="" disabled >' +
          '<p class="placeholder">Extra Work</p>' +
          '</div></div>');
  }
}
