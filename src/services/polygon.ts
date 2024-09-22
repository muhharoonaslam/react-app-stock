import axios from "axios";

const API_KEY = process.env.API_KEY || 'cF3HYFr0NbdSOx7cKZa2pJbk8LUHggQp'; 

export const searchSymbols = async (query: string) => {
  const url = `https://api.polygon.io/v3/reference/tickers?search=${query}&active=true&apiKey=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchHistoricalData = async (symbol: string, from: string, to: string, multiplier = 1, timespan = 'day') => {
  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/${multiplier}/${timespan}/${from}/${to}?adjusted=true&sort=asc&apiKey=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};


export const fetchPreviousClose = async (symbol: string) => {
  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchOpenClose = async (symbol: string, date: string) => {
  const url = `https://api.polygon.io/v1/open-close/${symbol}/${date}?adjusted=true&apiKey=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};
