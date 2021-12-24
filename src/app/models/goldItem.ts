import { ExchangeItemDetails } from "./exchangeItemDetails";
import { GoldItemDetails } from "./goldItemDetails";

export interface GoldItem {
  goldItems: GoldItemDetails[];
  exchangeItems?: ExchangeItemDetails[];
  exchangePriceGold?: number;
  totalPriceGold?: number;
  netPriceGold?: number;
  
}