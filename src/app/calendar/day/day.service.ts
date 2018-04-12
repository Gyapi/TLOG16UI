import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class DayService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private urlString : string = 'http://localhost:8080/timelogger/workmonths/';


  public getDay(year: number, month: number, day: number) : Observable<any> {

    let url = this.urlString + year + '/' + month + '/' + day;
    return this.http.get(url);
  }

  public addWorkDay(newDay : JSON){
    return this.http.post<JSON>('http://localhost:8080/timelogger/workmonths/workdays', newDay, this.httpOptions);
  }

}
