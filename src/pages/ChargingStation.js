import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChargingStationList } from '../slices/ChargingStationSlice';

const ChargingStation = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.chargingStation,
  );
  const [targetDt, setTargetDt] = useState(
    dayjs().add(-1, 'd').format('YYYY-MM-DD'),
  );
  useEffect(() => {
    dispatch(
      getChargingStationList({ targetDt: targetDt.replaceAll('-', '') }),
    );
  }, [dispatch, targetDt]);
  console.log(data);

  return (
    <div>
      <h1>ChargingStation</h1>
    </div>
  );
};

export default ChargingStation;
