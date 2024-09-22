import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOpenClose } from "../services/polygon";
import CompanySearch from "./core/CompanySearch";

const OpenClose: React.FC = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const [date, setDate] = useState("2023-02-01");

 
  const handleSymbolSelect = useCallback((selectedSymbol: string) => {
    setSymbol(selectedSymbol);
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["openClose", symbol, date],
    queryFn: () => fetchOpenClose(symbol, date),
  });

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Open/Close Data for {symbol}
      </h1>
      <div className="flex gap-4">
        <div className="mb-6 w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          {/* Use CompanySearch component to select the stock symbol */}
          <CompanySearch onSelect={handleSymbolSelect} />
        </div>

        <div className="mb-6 w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Fetching open/close data...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p className="font-bold">Error</p>
          <p>Failed to fetch open/close data. Please try again later.</p>
        </div>
      )}

      {/* Data Display */}
      {data && (
        <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {symbol} Stock Data on {new Date(date).toLocaleDateString()}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Open</p>
              <p className="text-2xl font-bold">${data.open.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Close</p>
              <p className="text-2xl font-bold">${data.close.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenClose;
