import React from 'react';
import StockViewer from './components/StockViewer';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <StockViewer />
    </div>
  );
};

export default App;
