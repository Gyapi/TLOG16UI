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
    let url;
    if (month < 10){
      url = this.urlString + year + '/' + '0' + month + '/';
    }
    else{
      url = this.urlString + year + '/' + monthString + '/'
    }
    return this.http.get(url);
  }

  public addWorkDay(newDay : JSON){
      return this.http.post('http://localhost:8080/timelogger/workmonths/workdays', newDay, this.httpOptions)
        .pipe(
          catchError(console.log(error.error.text))
        );
  }
}
