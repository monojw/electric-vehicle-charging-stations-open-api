import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_KEY = 'b48606a7f1ea4c168a68a645936beb95';
const API_URL = `https://openapi.gg.go.kr/Elctychrgstatn?TYPE=json&&&Type=json&pSize=100`;

export const getChargingStationList = createAsyncThunk(
  'ChargingStationSlice/getChargingStationList',
  async (payload, { rejectWithValue }) => {
    let result = null;
    try {
      result = await axios.get(API_URL, {
        params: {
          key: API_KEY,
          SIGUN_NM: payload.SIGUN_NM,
          pIndex: payload.pIndex ? payload.pIndex : 1,
        },
      });

      if (result.data.RESULT !== undefined) {
        const e = new Error();
        e.response = { status: 500, statusText: result.data.RESULT.MESSAGE };
        throw e;
      }
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
