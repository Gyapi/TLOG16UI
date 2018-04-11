import {Component, Input, OnInit } from '@angular/core';
import { DayService } from './day.service';
import { MatDialog } from '@angular/material';
import { WeekendDialogComponent } from './weekend-dialog/weekend-dialog.component';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html'
})
export class DayComponent implements OnInit {

  @Input() public day: number;
  @Input() public month: number;
  @Input() public year: number;
  public name : string;
  public buttonLabel: string;
  public required: number;
  public sum: number;
  public extra: number;
  public enoughWork: boolean;

  constructor(private dayServer: DayService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.buttonLabel = "Activate";
    this.enoughWork = false;
    if (this.day > 0){
      this.name = this.day + "";
    }
  }

  ngOnChanges() {
    this.buttonLabel = "Activate";
    this.required = null;
    this.sum = null;
    this.extra = null;
    if (this.day > 0) {
      this.getWorkDayData();
    }
  }

  private getWorkDayData(){

    let gaveMonth = this.month + 1;
    this.dayServer.getDay(this.year, gaveMonth, this.day).subscribe(
      dayData => {
        this.dayProcess(dayData);
      },
    error => {
    })

  }

  private dayProcess(dayData: any){
    this.buttonLabel = "Update";
    this.required = dayData.Required;
    this.extra = dayData.Extra;
    this.sum = dayData.Sum;
    if (this.extra < 0) { this.enoughWork = true; }
  }

  public dayBtnEvent(){
    console.log(this.year + "." + this.month + "." + this.day);
    if (this.buttonLabel == "Activate"){
      //Weekend Check
      //let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      //Saturday: 6, Sunday: 0
      let isWeekend = new Date(this.year, this.month, this.day).getDay();
      if (isWeekend == 0 || isWeekend == 6){
        let dialogRef = this.dialog.open(WeekendDialogComponent, {
          height: '200px',
          width: '300px',
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
        //Confirmation (Weekend)
      }
      //JSON Creation
      //Sending it to day.service
    }
    if (this.buttonLabel == "Update"){
      //JSON Creation
      //Sending it to day.service
    }
  }

}
