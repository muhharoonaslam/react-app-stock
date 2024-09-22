import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTopMovers } from "../services/polygon";

const TopMovers: React.FC = () => {
  const [direction, setDirection] = useState<'gainers' | 'losers'>('gainers');

  const { data, error, isLoading } = useQuery({
    queryKey: ["topMovers", direction],
    queryFn: () => fetchTopMovers(direction),
  });

  return (
    <div className="container mx-auto">
      <h1>Top {direction === "gainers" ? "Gainers" : "Losers"}</h1>
      <button onClick={() => setDirection("gainers")}>Show Gainers</button>
      <button onClick={() => setDirection("losers")}>Show Losers</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching top movers.</p>}
      {data && (
        <ul>
          {data.tickers.map((ticker: any) => (
            <li key={ticker.ticker}>
              <p>Symbol: {ticker.ticker}</p>
              <p>Change: {ticker.todaysChangePerc}%</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopMovers;
