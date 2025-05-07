import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  isEditModeEnabled: boolean;
}
const initialState: CommonState = {
  isEditModeEnabled: false,
};

export const CommonSlice = createSlice({
  name: 'CommonSlice',
  initialState,
  reducers: {
    setIsEditModeEnabled(state, action: PayloadAction<boolean>) {
      state.isEditModeEnabled = action.payload;
    },
  },
});

export const CommonReducer = CommonSlice.reducer;
