import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkAsset } from '@shared/interfaces/work-asset.interface';

interface WorkAssetState {
  assets: WorkAsset[];
  selectedAsset: WorkAsset | null;
}

const initialState: WorkAssetState = {
  assets: [],
  selectedAsset: null,
};

export const WorkAssetSlice = createSlice({
  name: 'WorkAssetSlice',
  initialState,
  reducers: {
    setWorkAssets(state, action: PayloadAction<WorkAsset[]>) {
      state.assets = action.payload;
    },
    setSelectedWorkAsset(state, action: PayloadAction<WorkAsset | null>) {
      state.selectedAsset = action.payload;
    },
  },
});

export const workAssetReducer = WorkAssetSlice.reducer;
