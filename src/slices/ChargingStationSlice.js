import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL =
  'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';
const API_KEY = '34e11fc3c4795a3972d8139b5ca0ea6d';

export const getChargingStationList = createAsyncThunk(
  'ChargingStationSlice/getChargingStationList',
  async (payload, { rejectWithValue }) => {
    let result = null;
    try {
      result = await axios.get(API_URL, {
        params: {
          key: API_KEY,

          targetDt: payload.targetDt,
        },
      });
    } catch (e) {
      result = rejectWithValue(e.response);
    }
    return result;
  },
);

const ChargingStationSlice = createSlice({
  name: 'charginStation',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getChargingStationList.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getChargingStationList.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null,
      };
    },
    [getChargingStationList.rejected]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : 'ServerError',
        },
      };
    },
  },
});

export default ChargingStationSlice.reducer;
