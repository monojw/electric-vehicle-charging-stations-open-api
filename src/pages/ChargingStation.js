import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ChargingStation = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.charginStation);
  console.log(data);

  return (
    <div>
      <h1>ChargingStation</h1>
    </div>
  );
};

export default ChargingStation;
