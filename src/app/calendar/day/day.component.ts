import {Component, Input, OnInit } from '@angular/core';
import { DayService } from './day.service'

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() day: number;
  @Input() month: number;
  @Input() year: number;
  name : string;
  buttonLabel: string = "Activate";
  sumString: string = "Work Sum";
  extraString: string = "Extra Work";
  newOrNot: boolean;

  constructor(private dayServer: DayService) {
  }

  ngOnInit() {
    if (this.day < 1 ){
      this.name = "";
      this.buttonLabel = "";
      this.sumString = "";
      this.extraString = "";
    } else {
      this.name = this.day + "";
    }
  }

  ngAfterViewInit(){
    if (this.day < 1 ){
      document.getElementById('container' + this.day).classList.add("disabled");
      document.getElementById('inReq' + this.day).setAttribute('disabled', 'disabled');
      document.getElementById('btn' + this.day).setAttribute('disabled', 'disabled');
    } else {
      //this.getWorkDayData();
    }
  }

  getWorkDayData(){

    let gaveMonth = this.month + 1;

    this.dayServer.getDay(this.year, gaveMonth, this.day).subscribe(
      dayData => {
        document.getElementById('inReq' + this.day).setAttribute('value', dayData.Required);
        console.log(dayData);
      },
    error => {
      this.newOrNot = false;
    })

  }


  dayBtnEvent(){
    console.log("anyád");
  }

}
