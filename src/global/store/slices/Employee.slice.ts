import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity } from '@shared/interfaces/User.interfaces';

interface EmployeeState {
  employees: UserEntity[];
}
const initialState: EmployeeState = {
  employees: [],
};

export const EmployeeSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<UserEntity[]>) {
      state.employees = action.payload;
    },
  },
});

export const EmployeeReducer = EmployeeSlice.reducer;
