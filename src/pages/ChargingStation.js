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
    dispatch(getChargingStationList());
  }, [dispatch]);

  return (
    <div className="chargingStationContainer">
      <Spinner visible={loading} />
      <h1>ChargingStation</h1>

      {error ? (
        <ErrorView error={error} />
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>번호</th>
                <th>시군명</th>
                <th>충전소명</th>
                <th>소재지지번주소</th>
                <th>소재지도로명주소</th>
                <th>소재지우편번호</th>
                <th>WGS84위도</th>
                <th>WGS84경도</th>
                <th>운영기관명</th>
                <th>충전기타입명</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.Elctychrgstatn[1].row.map((v, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{v.SIGUN_NM}</td>
                      <td>{v.CHRGSTATN_NM}</td>
                      <td>{v.REFINE_LOTNO_ADDR}</td>
                      <td>{v.REFINE_ROADNM_ADDR}</td>
                      <td>{v.REFINE_ZIP_CD}</td>
                      <td>{v.REFINE_WGS84_LAT}</td>
                      <td>{v.REFINE_WGS84_LOGT}</td>
                      <td>{v.OPERT_INST_NM}</td>
                      <td>{v.CHARGER_TYPE_NM}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>

          {/* 카카오 지도 API */}
          {data && <KakaoMap data={data.Elctychrgstatn[1].row} />}
        </>
      )}
    </div>
  );
};

export default React.memo(ChargingStation);
