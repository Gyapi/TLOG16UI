import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {getLocaleMonthNames} from "@angular/common";

@Injectable()
export class CalendarService {

  constructor(private http: HttpClient) {
  }

  urlString : string = 'http://localhost:8080/timelogger/workmonths/2017/09/';
  month: Month;

  getMonth() {
    this.http.get(this.urlString).subscribe(
        response => this.month = {
                    Year: response['Year'],
                    Month: response['Month'],
                    Sum: response['Sum'],
                    Required: response['Required'],
                    Extra: response['Extra'],
                    Days: response['Days'],
    });
    console.log(this.month);
  }

}

export interface Month {
  Year: string;
  Month: string;
  Sum: number;
  Required: number;
  Extra: number;
  Days: JSON[];
}
