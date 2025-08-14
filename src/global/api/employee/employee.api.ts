import { EmployeeSlice } from '@global/store/slices/Employee.slice';

import { API_CONFIG } from '@global/api/api.constants';
import { baseEmployeeApi } from '@global/api/employee/base-employee.api';
import { UserRole, UserWorkStatus } from '@shared/enums/user.enums';
import { VacationFilter } from '@shared/enums/vacation.enums';
import { AddEmployee, EditUserData, UserEntity } from '@shared/interfaces/User.interfaces';
import { VacationRequestDecision, VacationRequestsResponse } from '@shared/interfaces/Vacation.interfaces';

const { setEmployees } = EmployeeSlice.actions;
export const employeeApi = baseEmployeeApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllEmployees: builder.query<
      UserEntity[],
      {
        location?: string;
        workStatus: UserWorkStatus;
        company?: string;
        roles?: UserRole[];
        fullName?: string;
      }
    >({
      query: ({ location, workStatus, company, roles, fullName }) => ({
        url: API_CONFIG.fetchEmployees(location, workStatus, company, roles, fullName),
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
    inviteEmployee: builder.mutation<boolean, AddEmployee | Partial<UserEntity>>({
      query: (body: AddEmployee) => ({
        url: API_CONFIG.inviteEmployee(),
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
    editUserData: builder.mutation<boolean, Partial<EditUserData>>({
      query: (body: EditUserData) => ({
        url: API_CONFIG.editUserData(body.employeeId),
        method: 'PUT',
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
    sentVacationRequest: builder.mutation<boolean, { userId: string; vacationDates: string[] }>({
      query: (body: { userId: string; vacationDates: string[] }) => ({
        url: API_CONFIG.sentVacationRequest(),
        method: 'POST',
        credentials: 'include',
        body,
      }),
    }),
    removeStuffWorker: builder.query<boolean, { employeeId: string }>({
      query: ({ employeeId }) => ({
        url: API_CONFIG.removeStuffWorker(employeeId),
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    searchEmployers: builder.query<UserEntity[], { fullName: string; workStatus: UserWorkStatus }>({
      query: ({ fullName, workStatus }) => ({
        url: API_CONFIG.searchEmployers(fullName, workStatus),
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
  overrideExisting: false,
});

export const {
  useFetchAllEmployeesQuery,
  useInviteEmployeeMutation,
  useLazyFetchAllEmployeesQuery,
  useLazyRemoveStuffWorkerQuery,
  useEditUserDataMutation,
  useHandleVacationRequestsMutation,
  useLazyFetchVacationRequestsQuery,
  useSentVacationRequestMutation,
  useLazySearchEmployersQuery,
} = employeeApi;
