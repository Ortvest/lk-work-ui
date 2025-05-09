import { API_CONFIG } from '@global/api/api.constants';
import { UserEntity } from '@shared/interfaces/User.interfaces';
import { baseEmployeeApi } from "@global/api/employee/base-employee.api";
import { EmployeeSlice } from "@global/store/slices/Employee.slice";

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
  }),
});

export const { useFetchAllEmployeesQuery } = employeeApi;
