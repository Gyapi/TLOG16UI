import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class CalendarService {

  constructor(private http: HttpClient) {
  }

  private urlString : string = 'http://localhost:8080/timelogger/workmonths/';


  public getMonth(year: number, month: number) : Observable<any> {

    let url = this.urlString + year + '/' + month + '/';

    return this.http.get(url);
  }
}
