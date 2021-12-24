import { Injectable } from '@angular/core';
import { GoldItemDetails } from 'src/app/models/goldItemDetails';

@Injectable({
  providedIn: 'root',
})
export class HomeDataService {
  constructor() {}

  getGoldPrice(item: GoldItemDetails): number {
    let total = Math.round(
      item.weightGold * item.rateGold * (1 + (item?.makingChargeGold ?? 0) / 100)
    );
    if (item.makingChargeRupee) total += item.makingChargeRupee;
    return total;
  }

  getExchangePrice(exchangeItem: any): number[] {
    if (
      exchangeItem.totalWeight &&
      exchangeItem.weightPercentage &&
      exchangeItem.rate
    ) {
      const netWeight = +(
        (exchangeItem.weightPercentage / 100) *
        exchangeItem.totalWeight
      ).toFixed(3);
      const amount = Math.round(netWeight * exchangeItem.rate);
      return [netWeight, amount];
    }
    return [0, 0];
  }
}
