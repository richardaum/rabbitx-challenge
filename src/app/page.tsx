"use client";

import { OrderbookItem } from "@/components/OrderbookItem";
import { buildFilteredAsks, buildFilteredBids } from "@/domain/orderbook";
import { listenOrderbook } from "@/lib/services";
import { OrderBook } from "@/types/orderbook";
import { useEffect, useState } from "react";

export default function Home() {
  const [marketId, setMarketId] = useState("BTC-USD");
  const [orderbook, setOrderbook] = useState<OrderBook | null>(null);

  const [coin, currency] = marketId.split("-");

  useEffect(() => {
    const disconnect = listenOrderbook({
      marketId,
      onSubscribed: (orderbook) => {
        const asks = buildFilteredAsks(orderbook.asks);
        const bids = buildFilteredBids(orderbook.bids);

        setOrderbook({
          ...orderbook,
          asks: asks.orders,
          bids: bids.orders,
          asksSizeSum: asks.sizeSum,
          bidsSizeSum: bids.sizeSum,
        });
      },
      onPublished: (orderbook) => {
        // setOrderbook(orderbook);
      },
    });
    return () => disconnect();
  }, [marketId]);

  return (
    <main className="container mx-auto w-[500px] pt-[80px]">
      <div className="border-2 border-solid border-white/10 text-xs">
        <div className="grid grid-cols-3 rounded-2xl p-4">
          <div className="px-2 py-1 text-slate-400 font-semibold">
            Price ({currency})
          </div>
          <div className="px-2 py-1 text-slate-400 font-semibold text-right">
            Amount ({coin})
          </div>
          <div className="px-2 py-1 text-slate-400 font-semibold text-right">
            Total ({coin})
          </div>

          {orderbook?.asks.map((order, index) => (
            <OrderbookItem
              {...order}
              key={index}
              type="ask"
              sum={orderbook.asksSizeSum}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 rounded-2xl p-4">
          {orderbook?.bids.map((order, index) => (
            <OrderbookItem
              {...order}
              key={index}
              type="bid"
              sum={orderbook.bidsSizeSum}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export function toCurrency(value: string | number) {
  return Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function toNumber(value: string | number) {
  return Number(value).toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
}
