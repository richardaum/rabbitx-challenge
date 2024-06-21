export type Order = [string, string];
export type OrderWihTotal = {
  price: number;
  size: number;
  total: number;
};

export type OrderBookWihoutTotal = {
  market_id: string;
  bids: Order[];
  asks: Order[];
  sequence: number;
  timestamp: number;
};

export type OrderBook = Omit<OrderBookWihoutTotal, "bids" | "asks"> & {
  asksSizeSum: number;
  bidsSizeSum: number;
  bids: OrderWihTotal[];
  asks: OrderWihTotal[];
};
