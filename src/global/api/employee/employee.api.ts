import { EmployeeSlice } from '@global/store/slices/Employee.slice';

import { API_CONFIG } from '@global/api/api.constants';
import { baseEmployeeApi } from '@global/api/employee/base-employee.api';
import { UserWorkStatus } from '@shared/enums/user.enums';
import { VacationFilter } from '@shared/enums/vacation.enums';
import { AddEmployee, UserEntity } from '@shared/interfaces/User.interfaces';
import { VacationRequestDecision, VacationRequestsResponse } from '@shared/interfaces/Vacation.interfaces';

const { setEmployees } = EmployeeSlice.actions;
export const employeeApi = baseEmployeeApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllEmployees: builder.query<UserEntity[], { location?: string; workStatus: UserWorkStatus; company?: string }>(
      {
        query: ({ location, workStatus, company }) => ({
          url: API_CONFIG.fetchEmployees(location, workStatus, company),
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
      }
    ),
    inviteEmployee: builder.mutation<boolean, AddEmployee>({
      query: (body: AddEmployee) => ({
        url: API_CONFIG.inviteEmployee(),
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
    fetchVacationRequests: builder.query<VacationRequestsResponse[], VacationFilter>({
      query: (filter) => ({
        url: API_CONFIG.fetchEmployeesRequests(filter),
        method: 'GET',
        credentials: 'include',
      }),
    }),
    handleVacationRequests: builder.mutation<void, VacationRequestDecision>({
      query: (body: VacationRequestDecision) => ({
        url: API_CONFIG.handleEmployeesRequest(),
        method: 'PATCH',
        credentials: 'include',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchAllEmployeesQuery,
  useInviteEmployeeMutation,
  useLazyFetchAllEmployeesQuery,
  useFetchVacationRequestsQuery,
  useHandleVacationRequestsMutation,
  useLazyFetchVacationRequestsQuery,
} = employeeApi;
