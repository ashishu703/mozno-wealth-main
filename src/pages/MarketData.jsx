import React, { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import apiClient from "../api/axios.instance";

const REFRESH_INTERVAL_MS = 60 * 1000;

const formatValue = (value, currency = "") => {
  if (value === null || value === undefined) return "--";
  const formatted = Number(value).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
  return currency ? `${currency} ${formatted}` : formatted;
};

const formatNumber = (value, maxFractionDigits = 2) => {
  if (value === null || value === undefined) return "--";
  return Number(value).toLocaleString("en-IN", { maximumFractionDigits: maxFractionDigits });
};

const IndexCard = ({ item }) => {
  const price = item?.price ?? null;
  const prevClose = item?.prevClose ?? null;
  const changePoints = price !== null && prevClose !== null ? price - prevClose : null;
  const changePercent =
    item?.changePercent ??
    (changePoints !== null && prevClose !== null && prevClose !== 0
      ? (changePoints / prevClose) * 100
      : null);

  const isPositive = changePoints !== null ? changePoints >= 0 : true;

  const status = item?.marketStatus || "Unknown";
  const statusClasses =
    status === "Open"
      ? {
          pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
        }
      : status === "Pre-market"
        ? {
            pill: "bg-amber-50 text-amber-800 border-amber-200",
            dot: "bg-amber-500",
          }
        : status === "Closed"
          ? {
              pill: "bg-rose-50 text-rose-700 border-rose-200",
              dot: "bg-rose-500",
            }
          : {
              pill: "bg-slate-50 text-slate-700 border-slate-200",
              dot: "bg-slate-500",
            };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">{item?.exchange || "Market"}</p>
          <h3 className="text-lg font-semibold text-gray-900">{item?.name}</h3>
          <p className="text-xs text-gray-500">{item?.symbol}</p>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            isPositive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
          }`}
        >
          {changePoints === null ? "--" : `${isPositive ? "+" : ""}${changePoints.toFixed(2)}`}
          {changePercent === null ? "" : ` (${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%)`}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Price</p>
          <p className="font-semibold text-gray-900">
            {formatValue(item?.price, item?.currency)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Prev Close</p>
          <p className="font-semibold text-gray-900">
            {formatValue(item?.prevClose, item?.currency)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Open</p>
          <p className="font-semibold text-gray-900">
            {formatValue(item?.open, item?.currency)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">% Change</p>
          <p className="font-semibold text-gray-900">
            {changePercent === null ? "--" : `${changePercent >= 0 ? "+" : ""}${formatNumber(changePercent, 2)}%`}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Day High</p>
          <p className="font-semibold text-gray-900">
            {formatValue(item?.high, item?.currency)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Day Low</p>
          <p className="font-semibold text-gray-900">
            {formatValue(item?.low, item?.currency)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">52 Week High</p>
          <p className="font-semibold text-gray-900">
            {formatValue(item?.weekHigh, item?.currency)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">52 Week Low</p>
          <p className="font-semibold text-gray-900">
            {formatValue(item?.weekLow, item?.currency)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Volume</p>
          <p className="font-semibold text-gray-900">
            {item?.volume === null ||
            item?.volume === undefined ||
            item?.volume === 0
              ? "--"
              : formatNumber(item?.volume, 0)}
          </p>
        </div>
        <div className="flex items-center justify-end">
          <div className={`inline-flex items-center gap-2 px-2.5 py-2 rounded-xl border ${statusClasses.pill}`}>
            <span className={`w-2 h-2 rounded-full ${statusClasses.dot}`} />
            <span className="text-[12px] font-semibold">{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [marketData, setMarketData] = useState({ india: [], global: [], updatedAt: null });

  const fetchMarketData = useCallback(async () => {
    try {
      const res = await apiClient.get("/market/overview");
      setMarketData(res?.data || { india: [], global: [], updatedAt: null });
      setError("");
    } catch {
      setError("Unable to fetch market data right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketData();
    const timer = setInterval(fetchMarketData, REFRESH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [fetchMarketData]);

  return (
    <section className="min-h-screen pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Market Data</h1>
            <p className="text-gray-600 mt-2">
              Live Indian and Global indices from Yahoo Finance.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <RefreshCw className="w-4 h-4 text-emerald-600" />
            <span>Auto refresh: 60 seconds</span>
            <span>
              Last updated:{" "}
              {marketData.updatedAt ? new Date(marketData.updatedAt).toLocaleTimeString() : "--"}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600">
            Loading market data...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">India</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketData.india.map((item) => (
                  <IndexCard key={item.key || item.symbol} item={item} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Global</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {marketData.global.map((item) => (
                  <IndexCard key={item.key || item.symbol} item={item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketData;
