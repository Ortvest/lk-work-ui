import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '@shared/interfaces/UserState.interfaces';

const initialState: UserState = {
  isAuth: false,
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
    setUserCredentials(state, action: PayloadAction<{ email: string; password: string }>) {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const UserReducer = UserSlice.reducer;
