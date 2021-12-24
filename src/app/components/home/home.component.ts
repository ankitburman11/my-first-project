import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoldItem } from 'src/app/models/goldItem';
import { GoldItemDetails } from 'src/app/models/goldItemDetails';
import { RateModel } from '../../models/rate';

import * as fromApp from '../../store/app.reducer';
import { addGoldItem, updateRate } from './store/home.action';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalPriceGold = 0;
  exchangeTotal = 0;
  netPriceGold = 0;
  netPriceSilver = 0;
  isRateChange = false;
  constructor(private store: Store<fromApp.AppState>) {}

  onGoldCheckPrice(itemData: GoldItem) {
    console.log('from home component', itemData);
    this.totalPriceGold = itemData?.goldItems?.reduce(
      (acc, item: GoldItemDetails) => (acc + (item?.amountGoldItem ?? 0)),
      0
    );
    if (itemData?.exchangeItems != null && itemData?.exchangeItems?.length > 0) {
      this.exchangeTotal = itemData?.exchangeItems.reduce(
        (acc, exchg) => acc + exchg.amount,
        0
      );
    } else this.exchangeTotal = 0;
    this.netPriceGold = +this.totalPriceGold - this.exchangeTotal;

    //Updating the Gold Item Store
    this.store.dispatch(
      addGoldItem({
        payload: {
          ...itemData,
          totalPriceGold: +this.totalPriceGold,
          exchangePriceGold: this.exchangeTotal,
          netPriceGold: this.netPriceGold,
        },
      })
    );
  }
  onGoldRateChange() {
    this.isRateChange = !this.isRateChange;
  }
  onSubmitRateChange(data: RateModel) {
    this.store.dispatch(updateRate({ payload: data }));
    this.isRateChange = !this.isRateChange;
  }
  ngOnInit() {}
}
