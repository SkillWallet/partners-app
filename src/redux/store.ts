import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';
import { reducers, RootState } from './reducers';

const persistConfig = {
  key: 'partnersApp',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['auth', 'integrate'],
};

const persistedReducer = persistReducer<RootState>(persistConfig, reducers);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  reducer: persistedReducer,
});

export default store;
