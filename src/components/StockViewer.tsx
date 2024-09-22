import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchHistoricalData } from "../services/polygon";
import CompanySearch from "./core/CompanySearch";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StockViewer: React.FC = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const [copySuccess, setCopySuccess] = useState(""); // State to show copy success message

  const { data, error, isLoading } = useQuery({
    queryKey: ["stockData", symbol],
    queryFn: () => fetchHistoricalData(symbol, "2023-01-01", "2023-02-01"),
    staleTime: 1000 * 60 * 5,
  });

  const handleSymbolSelect = useCallback((selectedSymbol: string) => {
    setSymbol(selectedSymbol);
  }, []);

  const formatChartData = (data: any) => {
    if (!data || !data.results) return [];
    return data.results.map((item: any) => ({
      date: new Date(item.t).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      open: item.o,
      high: item.h,
      low: item.l,
      close: item.c,
    }));
  };

  const chartData = formatChartData(data);

  const latestData = data?.results?.[data.results.length - 1] || {};

  // Color map for consistency between cards and chart lines
  const colorMap:any = {
    o: { bg: "bg-white-100", text: "text-[#82ca9d]", line: "#82ca9d" },
    h: { bg: "bg-white-100", text: "text-[#ff7300]", line: "#ff7300" },
    l: { bg: "bg-white-100", text: "text-[#8884d8]", line: "#8884d8" },
    c: { bg: "bg-white-100", text: "text-[#387908]", line: "#387908" },
  };

  // Function to copy raw data to clipboard
  const copyToClipboard = () => {
    if (data) {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(
        () => {
          setCopySuccess("Copied!");
          setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
        },
        (err) => {
          setCopySuccess("Failed to copy");
        }
      );
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Advanced Stock Data Viewer
      </h1>

      <div className="mb-8">
        <CompanySearch onSelect={handleSymbolSelect} />
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading stock data...</p>
        </div>
      )}

      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>Failed to fetch stock data. Please check the symbol and try again.</p>
        </div>
      )}

      {data && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Symbol: {symbol}
          </h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-700">
              Latest Data
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { key: "o", label: "Open" },
                { key: "h", label: "High" },
                { key: "l", label: "Low" },
                { key: "c", label: "Close" },
              ].map(({ key, label }) => (
                <div
                  key={key}
                  className={`flex flex-col items-left justify-center p-5 rounded-lg ${colorMap[key].bg} border border-slate-200`}
                >
                  <span
                    className={`text-xs font-semibold tracking-wider ${colorMap[key].text}`}
                  >
                    {label}
                  </span>
                  <p
                    className={`text-3xl font-bold mt-1 ${colorMap[key].text}`}
                  >
                    ${parseFloat(latestData[key] || "0").toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {chartData.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                30 Day Price Chart
              </h3>
              <div className="h-96 w-full bg-white rounded-lg shadow-sm p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="open"
                      stroke={colorMap.o.line}
                      activeDot={{ r: 8 }}
                      name="Open"
                    />
                    <Line
                      type="monotone"
                      dataKey="high"
                      stroke={colorMap.h.line}
                      activeDot={{ r: 8 }}
                      name="High"
                    />
                    <Line
                      type="monotone"
                      dataKey="low"
                      stroke={colorMap.l.line}
                      activeDot={{ r: 8 }}
                      name="Low"
                    />
                    <Line
                      type="monotone"
                      dataKey="close"
                      stroke={colorMap.c.line}
                      activeDot={{ r: 8 }}
                      name="Close"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Raw Data</h3>
              <button
                onClick={copyToClipboard}
                className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-500 transition"
              >
                {copySuccess ? copySuccess : "Copy Raw Data"}
              </button>
            </div>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60 text-sm text-gray-700">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockViewer;