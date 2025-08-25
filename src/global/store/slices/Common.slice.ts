import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  isEditModeEnabled: boolean;
  isSidebarVisible: boolean;
}
const initialState: CommonState = {
  isEditModeEnabled: false,
  isSidebarVisible: false,
};

export const CommonSlice = createSlice({
  name: 'CommonSlice',
  initialState,
  reducers: {
    setIsEditModeEnabled(state, action: PayloadAction<boolean>) {
      state.isEditModeEnabled = action.payload;
    },
    setIsSidebarVisible(state, action: PayloadAction<boolean>) {
      state.isSidebarVisible = action.payload;
    },
  },
});

export const CommonReducer = CommonSlice.reducer;
