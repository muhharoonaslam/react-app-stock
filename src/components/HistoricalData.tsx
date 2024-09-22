import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchHistoricalData } from "../services/polygon";
import CompanySearch from "./core/CompanySearch";

const HistoricalData: React.FC = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const [fromDate, setFromDate] = useState("2023-01-01");
  const [toDate, setToDate] = useState("2023-02-01");

  const handleSymbolSelect = useCallback((selectedSymbol: string) => {
    setSymbol(selectedSymbol);
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["historicalData", symbol, fromDate, toDate],
    queryFn: () => fetchHistoricalData(symbol, fromDate, toDate),
  });

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Historical Data for {symbol}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <CompanySearch onSelect={handleSymbolSelect} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Fetching historical data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-md" role="alert">
          <p className="font-bold">Error</p>
          <p>Failed to fetch historical data. Please try again later.</p>
        </div>
      )}

      {data && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.results.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-white p-6 shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <h3 className="text-xs font-bold text-blue-600 mb-3">
                {new Date(item.t).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Open</span>
                  <span className="text-lg font-semibold">${item.o.toFixed(2)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Close</span>
                  <span className="text-lg font-semibold">${item.c.toFixed(2)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">High</span>
                  <span className="text-lg font-semibold text-green-600">${item.h.toFixed(2)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Low</span>
                  <span className="text-lg font-semibold text-red-600">${item.l.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Change</span>
                  <span className={`text-sm font-semibold ${
                    item.c > item.o ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {((item.c - item.o) / item.o * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricalData;