import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPreviousClose } from "../services/polygon";
import CompanySearch from "./core/CompanySearch"; // Ensure the path is correct

const PreviousClose: React.FC = () => {
  const [symbol, setSymbol] = useState("AAPL");

  const handleSymbolSelect = useCallback((selectedSymbol: string) => {
    setSymbol(selectedSymbol);
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["previousClose", symbol],
    queryFn: () => fetchPreviousClose(symbol),
  });

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Previous Close Data
      </h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Name
        </label>
        {/* Use the CompanySearch component */}
        <CompanySearch onSelect={handleSymbolSelect} />
      </div>

      {/* Display Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Fetching previous close data...</p>
        </div>
      )}

      {/* Display Error State */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p className="font-bold">Error</p>
          <p>Failed to fetch previous close data. Please try again later.</p>
        </div>
      )}

      {/* Display Data */}
      {data && data.results && data.results[0] && (
        <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {symbol} Stock Data
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Previous Close</p>
              <p className="text-2xl font-bold">${data.results[0].c.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Open</p>
              <p className="text-2xl font-bold">${data.results[0].o.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">High</p>
              <p className="text-2xl font-bold">${data.results[0].h.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Low</p>
              <p className="text-2xl font-bold">${data.results[0].l.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviousClose;
