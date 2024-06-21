import { Order, OrderWihTotal } from "@/types/orderbook";

export function buildFilteredAsks(orders: Order[]) {
  let sizeSum = 0;

  const filteredOrders = [...orders]
    .slice(0, 10)
    .reduce((acc, [price, size]) => {
      const previousTotal = acc[acc.length - 1]?.total || 0;
      sizeSum += Number(size);
      acc.push({
        price: Number(price),
        size: Number(size),
        total: previousTotal + Number(size),
      });
      return acc;
    }, [] as OrderWihTotal[])
    .reverse();

  return {
    sizeSum,
    orders: filteredOrders,
  };
}

export function buildFilteredBids(orders: Order[]) {
  const filteredOrders = [...orders]
    .slice(0, 10)
    .reduce((acc, [price, size]) => {
      acc.push({
        price: Number(price),
        size: Number(size),
        total: acc.length
          ? acc[acc.length - 1].total + Number(size)
          : Number(size),
      });
      return acc;
    }, [] as OrderWihTotal[]);

  return {
    orders: filteredOrders,
    sizeSum: filteredOrders[filteredOrders.length - 1].total,
  };
}
