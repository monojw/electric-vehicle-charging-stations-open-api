/**
 * @filename    : Search.js
 * @author      : 전우열
 * @description : 검색 기능
 */

import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getChargingStationList } from '../slices/ChargingStationSlice';

const Search = () => {
  const dispatch = useDispatch();

  /* 검색어 */
  const [search, setSearch] = useState('');

  const onChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(getChargingStationList({ SIGUN_NM: search }));
    },
    [dispatch, search],
  );

  return (
    <div>
      <form onSubmit={onSubmit} className="searchForm">
        <input
          type="text"
          name="search"
          placeholder="충전소 시군명을 입력하세요. (예: 성남시)"
          value={search}
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default Search;
