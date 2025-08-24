import { WorkAssetSlice } from '@global/store/slices/WorkAssets.slice';

import { baseWorkAssetsApi } from '@global/api/workAssets/base-workAssets.api';

const { setSelectedWorkAsset } = WorkAssetSlice.actions;

export const workAssetsApi = baseWorkAssetsApi.injectEndpoints({
  endpoints: (builder) => ({
    createWorkAsset: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: '/work-assets',
        method: 'POST',
        body,
      }),
    }),
    listWorkAssets: builder.query<any[], void>({
      query: () => ({
        url: '/work-assets',
        method: 'GET',
      }),
    }),
    getWorkAssetById: builder.query<any, string>({
      query: (id) => ({
        url: `/work-assets/${id}`,
        method: 'GET',
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data, 'DATA');
          dispatch(setSelectedWorkAsset(data));
        } catch {
          dispatch(setSelectedWorkAsset(null));
        }
      },
    }),
    updateWorkAsset: builder.mutation<any, { id: string; body: Partial<any> }>({
      query: ({ id, body }) => ({
        url: `/work-assets/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    removeWorkAsset: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/work-assets/${id}`,
        method: 'DELETE',
      }),
    }),
    getUpcomingWorkAssets: builder.query<any[], { withinDays?: number; type?: 'insurance' | 'maintenance' }>({
      query: ({ withinDays = 30, type }) => ({
        url: '/work-assets/upcoming',
        method: 'GET',
        params: { withinDays, type },
      }),
    }),
  }),
});

export const {
  useCreateWorkAssetMutation,
  useListWorkAssetsQuery,
  useGetWorkAssetByIdQuery,
  useUpdateWorkAssetMutation,
  useRemoveWorkAssetMutation,
  useLazyGetWorkAssetByIdQuery,
  useGetUpcomingWorkAssetsQuery,
  useLazyListWorkAssetsQuery,
} = workAssetsApi;
