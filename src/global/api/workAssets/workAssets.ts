import { WorkAssetSlice } from '@global/store/slices/WorkAssets.slice';

import { baseWorkAssetsApi } from '@global/api/workAssets/base-workAssets.api';
import { WorkAsset } from '@shared/interfaces/work-asset.interface';

const { setSelectedWorkAsset, setWorkAssets } = WorkAssetSlice.actions;

export const workAssetsApi = baseWorkAssetsApi.injectEndpoints({
  endpoints: (builder) => ({
    createWorkAsset: builder.mutation<boolean, Partial<WorkAsset>>({
      query: (body) => ({
        url: '/work-assets',
        method: 'POST',
        body,
      }),
    }),
    listWorkAssets: builder.query<WorkAsset[], void>({
      query: () => ({
        url: '/work-assets',
        method: 'GET',
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data, 'DATA');
          dispatch(setWorkAssets(data));
        } catch {
          dispatch(setSelectedWorkAsset(null));
        }
      },
    }),
    getWorkAssetById: builder.query<WorkAsset, string>({
      query: (id) => ({
        url: `/work-assets/${id}`,
        method: 'GET',
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedWorkAsset(data));
        } catch {
          dispatch(setSelectedWorkAsset(null));
        }
      },
    }),
    updateWorkAsset: builder.mutation<any, { id: string; body: Partial<WorkAsset> }>({
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
    searchWorkAssets: builder.query<WorkAsset[], string>({
      query: (name) => ({
        url: '/work-assets/search',
        method: 'GET',
        params: { name },
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setWorkAssets(data));
        } catch {
          dispatch(setSelectedWorkAsset(null));
        }
      },
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
  useLazySearchWorkAssetsQuery,
} = workAssetsApi;
