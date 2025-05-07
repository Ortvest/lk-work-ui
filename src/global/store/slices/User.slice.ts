import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity } from '@shared/interfaces/User.interfaces';

interface UserState {
  user: UserEntity | null;
  isAuth: boolean;
}
const initialState: UserState = {
  isAuth: false,
  user: null,
};

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<UserEntity>) {
      state.user = action.payload;
    },
  },
});

export const UserReducer = UserSlice.reducer;
