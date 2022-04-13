import { useDispatch } from 'react-redux';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import store from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<any, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
