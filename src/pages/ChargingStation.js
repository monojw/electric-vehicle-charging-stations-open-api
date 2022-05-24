import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChargingStationList } from '../slices/ChargingStationSlice';

const ChargingStation = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.chargingStation,
  );

  useEffect(() => {
    dispatch(getChargingStationList({ SIGUN_NM: '가평군' }));
  }, [dispatch]);
  console.log(data.Elctychrgstatn[1].row);

  return (
    <div>
      <h1>ChargingStation</h1>
    </div>
  );
};

export default ChargingStation;
