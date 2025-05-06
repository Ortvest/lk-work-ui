import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  isAdmin: false,
  email: '',
  password: '',
  name: 'Super Admin',
};

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setUserAuthStatus(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUserAdminStatus(state, action) {
      state.isAdmin = action.payload;
    },
    setUserCredentials(state, action: PayloadAction<{ email: string; password: string }>) {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const UserReducer = UserSlice.reducer;
