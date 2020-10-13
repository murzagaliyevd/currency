import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
declare const require;
const xml2js = require('xml2js');

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  urls = [];
  _urlIndex =  0;
  constructor(
    private http: HttpClient
  ) {
    this.urls = environment.exchangeRateUrls.sort((a, b) => {
      return a.order - b.order;
    });
  }

  getRates(): Observable<any> {
    return this.getRatesByOrder(this._urlIndex);
  }

  getRatesByOrder(i: number): Observable<any> {
    const urlObj = this.urls[i];
    if (urlObj) {
      return this.http.get(urlObj.url, {responseType: urlObj.responseType})
        .pipe(
          map( response => {
            if (urlObj.responseType === 'text') {
              let res;
              xml2js.parseString( response, (err, result) => {
                res = result;
              });
              return res;
            } else {
              return response;
            }
          }),
          catchError( (err) => {
            return this.getRatesByOrder(++this._urlIndex);
          })
        );
    } else {
      return throwError('ОШИБКА!!!');
    }
  }
}
