import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { combineReducers } from 'redux';
import { persistReducer, PersistConfig } from 'redux-persist';
import membersReducer from './Members/members.reducer';
import communityReducer from './Community/community.reducer';
import authSliceReducer from '../auth/auth.reducer';
import uiSliceReducer from './ui-reducer';

const persistConfig: PersistConfig<any> = {
  key: 'appState',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['auth'],
};

const reducers = combineReducers({
  members: membersReducer,
  community: communityReducer,
  auth: authSliceReducer,
  ui: uiSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  reducer: persistedReducer,
});

export default store;
