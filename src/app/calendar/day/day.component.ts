import {Component, Input, OnInit } from '@angular/core';
import { DayService } from './day.service'

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html'
})
export class DayComponent implements OnInit {

  @Input() day: number;
  @Input() month: number;
  @Input() year: number;
  name : string;
  buttonLabel: string;
  sumString: string;
  extraString: string;
  required: number;
  sum: number;
  extra: number;
  enoughWork: boolean;

  constructor(private dayServer: DayService) {
  }

  ngOnInit() {
    if (this.day > 0 ){
      this.name = this.day + "";
      this.buttonLabel = "Activate";
      this.sumString = "Work Sum";
      this.extraString = "Extra Work";
      this.enoughWork = false;
    }
  }

  ngOnChanges() {
    if (this.day > 0) {
      this.getWorkDayData();
    }
  }

  getWorkDayData(){

    let gaveMonth = this.month + 1;

    this.dayServer.getDay(this.year, gaveMonth, this.day).subscribe(
      dayData => {
        this.dayProcess(dayData);
      },
    error => {
    })

  }

  dayProcess(dayData: any){
    this.buttonLabel = "Update";
    this.required = dayData.Required;
    this.extra = dayData.Extra;
    this.sum = dayData.Sum;
    if (this.extra < 0) { this.enoughWork = true; }
  }

  dayBtnEvent(){
    if (this.buttonLabel == "Activate"){
      //Weekend Check
      //Confirmation (Weekend)
      //JSON Creation
      //Sending it to day.service
    }
    if (this.buttonLabel == "Update"){
      //JSON Creation
      //Sending it to day.service
    }
  }

}
