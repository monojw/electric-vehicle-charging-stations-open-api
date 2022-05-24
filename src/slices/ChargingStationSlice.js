import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = ``;

export const getChargingStationList = createAsyncThunk(
  'ChargingStationSlice/getChargingStationList',
  async (payload, { rejectWithValue }) => {
    let result = null;
    try {
      result = await axios.get(API_URL);
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
