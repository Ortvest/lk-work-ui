import { API_CONFIG } from '@global/api/api.constants';
import { basePdfApi } from '@global/api/pdf/base-pdf.api';

export const pdfApi = basePdfApi.injectEndpoints({
  endpoints: (builder) => ({
    downloadDocument: builder.mutation<Blob, { userId: string; template: string }>({
      query: ({ userId, template }) => ({
        url: API_CONFIG.downloadDocument(),
        method: 'POST',
        credentials: 'include',
        body: { userId, template },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        responseHandler: async (response) => await response.blob(),
        headers: { Accept: 'application/pdf' },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useDownloadDocumentMutation } = pdfApi;
