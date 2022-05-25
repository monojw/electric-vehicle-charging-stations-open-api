import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChargingStation from './pages/ChargingStation';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ChargingStation />}></Route>
      </Routes>
    </div>
  );
};

export default App;
