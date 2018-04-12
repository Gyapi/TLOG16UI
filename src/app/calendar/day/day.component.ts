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
  private daySubscription;
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

  private getWorkDayData() {

    let today = new Date();
    if (today.getDate() >= this.day && today.getMonth() >= this.month) {
      let gaveMonth = this.month + 1;
      this.daySubscription = this.dayServer.getDay(this.year, gaveMonth, this.day).subscribe(
            dayData => {
              this.dayProcess(dayData);
            },
            error => {
            });
    }
  }

  private dayProcess(dayData: any){
    this.buttonLabel = "Active";
    this.required = dayData.Required;
    this.extra = dayData.Extra;
    this.sum = dayData.Sum;
    if (this.extra < 0) { this.enoughWork = true; }
  }

  public inputType(input: any){
    this.required =  parseInt(input.target.value, 10);
  }

  public dayBtnEvent(){

    if (this.buttonLabel == "Activate"){
      let isWeekend = new Date(this.year, this.month, this.day).getDay();
      if (isWeekend == 0 || isWeekend == 6){
        let dialogRef = this.dialog.open(WeekendDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
          if (result == true){
            this.activateDay(true);
          }
        });
      } else {
        this.activateDay(false);
      }
    }
  }

  public activateDay(isWeekend: boolean){
    let sentJSONString;
    let isWeekendString = "";
    let requiredString = "";
    let monthString = this.month + 1;

    if (isWeekend){
      isWeekendString = ', "weekEnd": true';
    }
    if (this.required != null || this.required > 0){
      requiredString = ', "requiredHours": ' + this.required;
    }
    sentJSONString = '{"year": ' + this.year + ', "month": ' + monthString + ', "day": '+ this.day +
          requiredString + isWeekendString + '}';
    this.dayServer.addWorkDay(sentJSONString).subscribe(json => {
          this.daySubscription.unsubscribe();
        },
        error => {
        }
    );
    this.getWorkDayData();
  }
}
