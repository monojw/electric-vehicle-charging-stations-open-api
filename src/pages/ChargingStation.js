import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChargingStationList } from '../slices/ChargingStationSlice';

import Table from '../components/Table';
import ErrorView from '../components/ErrorView';
import Spinner from '../components/Spinner';
import KakaoMap from '../components/KakaoMap';

import '../scss/ChargingStation.scss';

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
    <div className="chargingStationContainer">
      <h1>ChargingStation</h1>
      <Spinner visible={loading} />

      {/* 카카오 지도 API */}
      {data && <KakaoMap data={data.Elctychrgstatn[1].row} />}
    </div>
  );
};

export default ChargingStation;
