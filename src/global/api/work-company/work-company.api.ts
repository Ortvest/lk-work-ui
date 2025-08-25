import { WorkCompanySlice } from '@global/store/slices/WorkCompany.slice';

import { API_CONFIG } from '@global/api/api.constants';
import { baseWorkCompanyApi } from '@global/api/work-company/base-work-company.api';
import { AddWorkCompany, EditWorkCompany } from '@shared/interfaces/WorkCompanies.interfaces';

const { setWorkCompanies } = WorkCompanySlice.actions;

export const workCompanyApi = baseWorkCompanyApi.injectEndpoints({
  endpoints: (builder) => ({
    createWorkCompany: builder.mutation<boolean, AddWorkCompany>({
      query: (body) => ({
        url: API_CONFIG.addWorkCompany(),
        method: 'POST',
        body,
      }),
    }),
    editWorkCompany: builder.mutation<boolean, EditWorkCompany>({
      query: (body) => ({
        url: API_CONFIG.editWorkCompany(body?._id || ''),
        method: 'PUT',
        body,
      }),
    }),
    getAllWorkCompanies: builder.query({
      query: () => ({
        url: API_CONFIG.getAllWorkCompanies(),
        method: 'GET',
        credentials: 'include',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setWorkCompanies(data));
        } catch (error) {
          console.error('Failed to fetch accommodations data:', error);
        }
      },
    }),
    removeWorkCompany: builder.query<boolean, { workCompanyId: string }>({
      query: ({ workCompanyId }) => ({
        url: API_CONFIG.removeWorkCompany(workCompanyId),
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    searchWorkCompany: builder.query<any[], string>({
      query: (name) => ({
        url: API_CONFIG.getWorkCompanySearch(name),
        method: 'GET',
        credentials: 'include',
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setWorkCompanies(data));
        } catch {
          dispatch(setWorkCompanies([]));
        }
      },
    }),
  }),
});

export const {
  useGetAllWorkCompaniesQuery,
  useCreateWorkCompanyMutation,
  useEditWorkCompanyMutation,
  useLazyRemoveWorkCompanyQuery,
  useLazyGetAllWorkCompaniesQuery,
  useLazySearchWorkCompanyQuery,
} = workCompanyApi;
