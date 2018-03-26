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

  actualYear : number;
  required : number;
  extra : number;
  all : number;

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
    let gaveMonth = thisMonth + 1;
    this.calendarServer.getMonth(this.actualYear, gaveMonth).subscribe(
      monthData => {
        this.buildMonth(thisMonth, monthData);
      }
      error => {
        console.log(this.actualYear + '/' + thisMonth);
        console.log(error.error.text);
        this.buildMonth(thisMonth, null);
      }
    )
  }

  buildMonth(month: number, monthData: any): void {

    let monthLength: number = new Date(this.actualYear, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(this.actualYear, month, 1).getDay();
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let n = weekday[firstDayOfMonth];
    let runTime = (monthLength / 7) + 1;
    let c = 0;
    let dayOfLast = new Date(this.actualYear, month, 0).getDate();
    let j = 0;
    let day = 1;
    let daysDiv = document.getElementById('days');
    let days : JSON[] = null;


    daysDiv.innerHTML = "";
    let actives = document.getElementById('datePicker').getElementsByClassName('active');
    for (let i: number = 0; i < actives.length; i++) {
      actives[i].classList.remove('active');
    }


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
      if (monthData.hasOwnProperty('Days')){
        days = monthData.Days;
      }
    }


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
        let req = 0, extra = 0, sum = 0;
        let targetDay;
        if(days != null ){
          if (day < 10){
            targetDay = '0' + day;
          }else {
            targetDay = day + "";
          }

          for (let k = 0; k < days.length; k++){
            if (days[k].ActualDay.substring(8) === targetDay){
              req = days[k].Required;
              sum = days[k].Sum;
              extra = days[k].Extra;
            }
          }
        }
        this.makeADiv(day, i, month, req, extra, sum);
        day++;
        if (day === monthLength + 1) {
          return;
        }
      }
      j = 0;
      n = "Sunday";
    }
  }

  static makeADiv(day, i, month, req, extra, sum): void{
    let reqString = "", extraString = "", sumString = "", spanClass = "", extraClass = "";
    let buttonString = '<button type="button" class="aBtn" (click)="activateDay()" >Activate</button>';

    if (req > 0) {
      reqString = req + "";
      extraString = extra + "";
      sumString = sum + "";
      buttonString = '<button type="button" class="aBtn" (click)="updateDay()" >Update</button>';
      spanClass = 'green';
      if (extra < 0) {
        extraClass = " has-error";
      }
    }
    document.getElementById('line' + i).insertAdjacentHTML('beforeend',
      '<div class="container"><div class="day"><span class="' + spanClass + '" >' + day + '</span></div>\n\
                <div class="inner' + extraClass + '" id="day' + day + '">' +
          '<input id="inReq' + day + '" type="text" class="form-control" value="' + reqString + '">' + buttonString +
          '<input type="text" class="form-control" value="' + sumString + '" disabled >' +
          '<p class="placeholder">Work Sum</p>' +
          '<input type="text" class="form-control" value="' + extraString + '" disabled >' +
          '<p class="placeholder">Extra Work</p>' +
          '</div></div>');
  }

  activateDay(){
    thisMonth = 2;//Tesztérték
    day = 3;//Tesztérték

    let newDay : JSON;
    let req = Number((<HTMLInputElement>document.getElementById('inReq' + day)).value);
    let month = thisMonth + 1;
    let reqString = "";
    if (req > 0){
      reqString = '"requiredHours": ' + req + ', ';
    }

    newDay = JSON.parse('{"year": ' + this.actualYear + ', "month": ' + month +
      ', "day": ' + day + ',' + reqString + '"weekEnd":  ' + isWeekendEnabled + '}');
    console.log(newDay);
  }
}
