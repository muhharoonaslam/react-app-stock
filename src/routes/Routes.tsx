import React from "react";
import { Routes, Route } from "react-router-dom";
import StockViewer from "../components/StockViewer";
import HistoricalData from "../components/HistoricalData";
import PreviousClose from "../components/PreviousClose";
import OpenClose from "../components/OpenClose";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StockViewer />} />
      <Route path="/historical-data" element={<HistoricalData />} />
      <Route path="/previous-close" element={<PreviousClose />} />
      <Route path="/open-close" element={<OpenClose />} />
    </Routes>
  );
};

export default AppRoutes;
