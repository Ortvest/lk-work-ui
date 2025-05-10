import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity } from '@shared/interfaces/User.interfaces';

interface EmployeeState {
  employees: UserEntity[];
  selectedEmployee: UserEntity | null;
}
const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
};

export const EmployeeSlice = createSlice({
  name: 'EmployeeSlice',
  initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<UserEntity[]>) {
      state.employees = action.payload;
    },
    setSelectedEmployee(state, action: PayloadAction<UserEntity>) {
      state.selectedEmployee = action.payload;
    },
  },
});

export const EmployeeReducer = EmployeeSlice.reducer;
