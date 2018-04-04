import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CalendarService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  urlString : string = 'http://localhost:8080/timelogger/workmonths/';


  public  getMonth(year: number, month: number) : Observable<any> {

    let url = this.urlString + year + '/' + month + '/';

    return this.http.get(url);
  }
}
