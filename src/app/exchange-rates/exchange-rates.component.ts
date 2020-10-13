import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExchangeRatesService } from '../services/exchange-rates.service';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit, OnDestroy {
  currencyCode = 'EUR';
  exchangeRate: number;
  errorMessage: string;
  constructor(private exchangeRateService: ExchangeRatesService) { }
  sub$: Subscription;
  date: Date;
  ngOnInit(): void {
    this.getRates();
    interval(10000).subscribe(x => {
      this.getRates();
    });
  }

  getRates(): void {
    this.exchangeRateService.getRates()
      .subscribe(
        response => {
          if (response?.Valute) {
            this.exchangeRate = response.Valute[this.currencyCode].Value;
          } else if (response?.ValCurs?.Valute) {
            const rateObj = (response.ValCurs.Valute as Array<any>).find( item => item.CharCode[0] === this.currencyCode);
            if (rateObj?.Value[0]) {
              this.exchangeRate = parseInt(rateObj.Value[0], null);
            }
          }
          this.date = new Date();
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = error;
        }
      );
  }

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
  }
}
