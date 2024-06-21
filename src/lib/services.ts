import { OrderBookWihoutTotal } from "@/types/orderbook";
import { Centrifuge } from "centrifuge";

const urls = {
  test: "wss://api.testnet.rabbitx.io/ws",
  production: "wss://api.prod.rabbitx.io/ws",
};

const tokens = {
  test: process.env.NEXT_PUBLIC_TEST_TOKEN,
  production: process.env.NEXT_PUBLIC_PROD_TOKEN,
};

export const listenOrderbook = ({
  marketId,
  onSubscribed,
  onPublished,
}: {
  marketId: string;
  onSubscribed: (orderbook: OrderBookWihoutTotal) => void;
  onPublished: (orderbook: OrderBookWihoutTotal) => void;
}) => {
  const centrifuge = new Centrifuge(urls[process.env.NEXT_PUBLIC_ENV], {
    token: tokens[process.env.NEXT_PUBLIC_ENV],
  });
  const sub = centrifuge.newSubscription(`orderbook:${marketId}`);
  sub.on("subscribed", function (ctx) {
    onSubscribed(ctx.data);
  });
  sub.on("publication", function (ctx) {
    onPublished(ctx.data);
  });
  sub.subscribe();
  centrifuge.connect();
  return () => centrifuge.disconnect();
};
