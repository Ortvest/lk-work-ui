import { EmployeeSlice } from '@global/store/slices/Employee.slice';

import { API_CONFIG } from '@global/api/api.constants';
import { baseEmployeeApi } from '@global/api/employee/base-employee.api';
import { AddEmployee, UserEntity } from "@shared/interfaces/User.interfaces";

const { setEmployees } = EmployeeSlice.actions;
export const employeeApi = baseEmployeeApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllEmployees: builder.query<UserEntity[], void>({
      query: () => ({
        url: API_CONFIG.fetchEmployees(),
        method: 'GET',
        credentials: 'include',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setEmployees(data));
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      },
    }),
    inviteEmployee: builder.mutation<boolean, AddEmployee>({
      query: (body: AddEmployee) => ({
        url: API_CONFIG.inviteEmployee(),
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),

  }),
  overrideExisting: false,

});

export const { useFetchAllEmployeesQuery, useInviteEmployeeMutation } = employeeApi;
