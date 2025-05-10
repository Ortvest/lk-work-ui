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
      }),
    }),
    uploadUserPhoto: builder.mutation<UploadFileResponse, FormData>({
      query: (file) => ({
        url: API_CONFIG.uploadUserPhoto(),
        method: 'POST',
        body: file,
      }),
    }),
    getUploadedPhotoUrl: builder.mutation<{ url: string }, string>({
      query: (fileKey) => ({
        url: API_CONFIG.getUploadedPhoto(fileKey),
        method: 'GET',
      }),
    }),
  }),
});

export const { useUploadPhotoMutation, useGetUploadedPhotoUrlMutation, useUploadUserPhotoMutation } = uploadPhotoApi;
