import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getChargingStationList } from '../slices/ChargingStationSlice';

import Table from '../components/Table';
import ErrorView from '../components/ErrorView';
import Spinner from '../components/Spinner';
import KakaoMap from '../components/KakaoMap';
import Pagination from '../components/Pagination';

import '../scss/ChargingStation.scss';
import Search from '../components/Search';

const ChargingStation = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.chargingStation,
  );

  /* 페이지네이션 */
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    dispatch(getChargingStationList({}));
  }, [dispatch]);

  return (
    <>
      <Spinner visible={loading} />

      {error ? (
        <ErrorView error={error} />
      ) : (
        <div className="chargingStationContainer">
          <h1 className="title">경기도 전기차 충전소</h1>

          {/* 검색 */}
          <Search />

          {/* 충전소 현황 데이터 */}
          <Table>
            <thead>
              <tr>
                <th>번호</th>
                <th>시군명</th>
                <th>충전소명</th>
                <th>소재지지번주소</th>
                <th>소재지도로명주소</th>
                <th className="mobile">소재지우편번호</th>
                <th className="mobile">위도</th>
                <th className="mobile">경도</th>
                <th className="mobile">운영기관명</th>
                <th>충전기타입명</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.Elctychrgstatn[1].row
                  .slice(offset, offset + limit)
                  .map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{v.SIGUN_NM}</td>
                        <td>{v.CHRGSTATN_NM}</td>
                        <td>{v.REFINE_LOTNO_ADDR}</td>
                        <td>{v.REFINE_ROADNM_ADDR}</td>
                        <td className="mobile">{v.REFINE_ZIP_CD}</td>
                        <td className="mobile">{v.REFINE_WGS84_LAT}</td>
                        <td className="mobile">{v.REFINE_WGS84_LOGT}</td>
                        <td className="mobile">{v.OPERT_INST_NM}</td>
                        <td>{v.CHARGER_TYPE_NM}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </Table>

          {/* 페이지네이션 */}
          {data && (
            <Pagination
              total={data.Elctychrgstatn[1].row.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          )}

          {/* 카카오 지도 API */}
          {data && <KakaoMap data={data.Elctychrgstatn[1].row} />}
        </div>
      )}
    </>
  );
};

export default React.memo(ChargingStation);
