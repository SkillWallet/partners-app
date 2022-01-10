import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { combineReducers } from 'redux';
import { PersistConfig, persistReducer } from 'redux-persist';
import activityTaskReducer from '@store/Activity/create-activity-task.reducer';
import communityReducer from './Community/community.reducer';
import authSliceReducer from '../auth/auth.reducer';
import uiSliceReducer from './ui-reducer';
import partnerReducer from './Partner/partner.reducer';
import integrateReducer from './Integrate/integrate';

const persistConfig: PersistConfig<any> = {
  key: 'partnersApp',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['auth'],
};

const reducers = combineReducers({
  community: communityReducer,
  partner: partnerReducer,
  auth: authSliceReducer,
  ui: uiSliceReducer,
  activityTask: activityTaskReducer,
  integrate: integrateReducer,
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
