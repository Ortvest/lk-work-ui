import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkCompanyEntity } from '@shared/interfaces/WorkCompanies.interfaces';

interface WorkCompanyState {
  workCompanies: WorkCompanyEntity[];
  selectedWorkCompany: WorkCompanyEntity | null;
}
const initialState: WorkCompanyState = {
  workCompanies: [],
  selectedWorkCompany: null,
};

export const WorkCompanySlice = createSlice({
  name: 'WorkCompanySlice',
  initialState,
  reducers: {
    setWorkCompanies(state, action: PayloadAction<WorkCompanyEntity[]>) {
      state.workCompanies = action.payload;
    },
    setSelectedAccommodation(state, action: PayloadAction<WorkCompanyEntity>) {
      state.selectedWorkCompany = action.payload;
    },
  },
});

export const WorkCompanyReducer = WorkCompanySlice.reducer;
