"use client";
import { useEffect, useState } from "react";
import { toCurrency, toNumber } from "../app/page";

export function OrderbookItem({
  type,
  price,
  size,
  total,
  sum,
}: {
  type: "ask" | "bid";
  price: { price: any; size: any; total: any }["price"];
  size: { price: any; size: any; total: any }["size"];
  total: { price: any; size: any; total: any }["total"];
  sum: number;
}) {
  const [bgFillPercent, setBgFillPercent] = useState(0);
  const textColor = type === "ask" ? "text-red-700" : "text-green-700";
  const lightBgColor = type === "ask" ? "bg-red-700/20" : "bg-green-700/20";
  const percentBgColor = type === "ask" ? "bg-red-500/30" : "bg-green-500/30";

  useEffect(() => {
    setBgFillPercent(Math.min(100, (total / sum) * 100));
  }, [sum, total]);

  return (
    <>
      <span
        className={`${textColor} px-2 py-1 rounded-xl ${
          size === total ? lightBgColor : ""
        }`}
      >
        {toCurrency(price)}
      </span>

      <span className={`text-right px-2 py-1 ${size === total ? "" : ""}`}>
        {toNumber(size)}
      </span>

      <span className="text-right relative mx-2 pr-2 py-1">
        {toNumber(total)}
        <span
          className={`absolute top-0 left-0 ${percentBgColor} h-full w-full -z-10 rounded-sm text-left transition-all`}
          style={{
            width: `${bgFillPercent}%`,
            transitionDuration: `${Math.min(500, bgFillPercent * 5)}ms`,
          }}
        ></span>
      </span>
    </>
  );
}
