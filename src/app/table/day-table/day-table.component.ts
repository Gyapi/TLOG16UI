import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-table',
  templateUrl: './day-table.component.html',
  styleUrls: ['./day-table.component.css']
})
export class DayTableComponent implements OnInit {

  @Input() public day: any;
  public actualDate: string;
  public required: number;
  public all: number;
  public extra: number;
  public taskArray: Array<any>;

  constructor() { }

  ngOnInit() {
    this.actualDate = this.day.ActualDay;
    this.required = parseInt(this.day.Required, 10) / 60;
    this.all = parseInt(this.day.Sum, 10) / 60;
    this.extra = parseInt(this.day.Extra, 10) / 60;
    this.taskArray = Array();
    if (this.day.Tasks != null) {
      for (let i = 0; i < this.day.Tasks.length; i++) {
        this.taskArray.push(this.day.Tasks[i]);
      }
    }
  }

  public classChooser(task: any){
    if (task.StartTime == null){
      return "danger";
    }
    if (task.EndTime == null){
      return "noTime";
    }
  }

  public modifyTask(){}
  public deleteTask(){}
  public newTask(){}

}
