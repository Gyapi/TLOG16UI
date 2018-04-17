import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  public dayArray: Array<any>;

  constructor(private tableServer: TableService) { }

  ngOnInit() {
    this.dayArray = Array();
    this.getMonthData();
  }

  private getMonthData(){
    this.tableServer.getMonth().subscribe(monthData => {
        this.buildTable(monthData);
      },
      error => {
        console.log(error.error.text);
      });
  }

  private buildTable(monthData: any){
    if (monthData != null){
      for (let i = 0; i < monthData.Days.length; i++){
        this.dayArray.push(monthData.Days[i]);
      }
    }
  }

}
