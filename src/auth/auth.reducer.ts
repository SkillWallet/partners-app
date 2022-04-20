import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isAutheticated: boolean;
  userInfo: any;
  userAddress: string;
}

const initialState: AuthState = {
  isAutheticated: false,
  userAddress: null,
  userInfo: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      const { isAuthenticated, userInfo } = action.payload;
      state.isAutheticated = isAuthenticated;
      state.userInfo = userInfo;
    },
    setUserAddress(state, action) {
      state.userAddress = action.payload;
    },
    resetAuthState: () => initialState,
  },
});

export const { setAuthenticated, setUserAddress, resetAuthState } = authSlice.actions;

export const UserInfo = (state) => state.auth.userInfo as any;

export default authSlice.reducer;
