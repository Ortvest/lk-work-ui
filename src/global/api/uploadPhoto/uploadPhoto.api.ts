import { API_CONFIG } from '@global/api/api.constants';
import { baseUploadPhoto } from '@global/api/uploadPhoto/base-uploadPhoto.api';

interface UploadFileResponse {
  fileKey: string;
  fileUrl: string;
}

export const uploadPhotoApi = baseUploadPhoto.injectEndpoints({
  endpoints: (builder) => ({
    uploadPhoto: builder.mutation<UploadFileResponse, FormData>({
      query: (file) => ({
        url: API_CONFIG.uploadPhoto(),
        method: 'POST',
        body: file,
        credentials: 'include',
      }),
    }),
    uploadUserPhoto: builder.mutation<UploadFileResponse, FormData>({
      query: (file) => ({
        url: API_CONFIG.uploadUserPhoto(),
        method: 'POST',
        body: file,
        credentials: 'include',
      }),
    }),
    getUploadedPhotoUrl: builder.mutation<{ url: string }, string>({
      query: (fileKey) => ({
        url: API_CONFIG.getUploadedPhoto(fileKey),
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useUploadPhotoMutation, useGetUploadedPhotoUrlMutation, useUploadUserPhotoMutation } = uploadPhotoApi;
