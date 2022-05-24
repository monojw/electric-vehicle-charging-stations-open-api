import { configureStore } from '@reduxjs/toolkit';
import ChargingStationSlice from './slices/ChargingStationSlice';

const store = configureStore({
  reducer: {
    chargingStation: ChargingStationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
