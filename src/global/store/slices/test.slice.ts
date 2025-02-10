import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isTest: true,
};

export const TestSlice = createSlice({
  name: 'TestSlice',
  initialState,
  reducers: {
    setTestStatus(state, action: PayloadAction<boolean>) {
      state.isTest = action.payload;
    },
  },
});

export const TestReducer = TestSlice.reducer;
