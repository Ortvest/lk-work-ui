import { EmployeeSlice } from '@global/store/slices/Employee.slice';
import { UserSlice } from '@global/store/slices/User.slice';

import { API_CONFIG } from '@global/api/api.constants';
import { baseCollectData } from '@global/api/updateUserData/base-collectData.api';
import { UserDocumentsStatus } from '@shared/enums/user.enums';
import {
  Address,
  BankInfo,
  DrivingLicenseDocument,
  EducationDocuments,
  EmbassyDocument,
  JobInfo,
  PassportDocument,
  PersonalInfo,
  ResidenceCardDocument,
  UserEntity,
  VisaInformationDocument,
  WorkPermissionDocument,
} from '@shared/interfaces/User.interfaces';
import { encryptForServer, getServerPublicKey } from '@shared/scripts/crypto';

const { setSelectedEmployee } = EmployeeSlice.actions;
const { setCurrentUser } = UserSlice.actions;

export const collectDataApi = baseCollectData.injectEndpoints({
  endpoints: (builder) => ({
    collectUserPersonalInfo: builder.mutation<UserEntity, { personalData: PersonalInfo; employeeId: string }>({
      async queryFn(arg, _api, _extra, baseQuery) {
        const { keyId, publicKeyB64 } = await getServerPublicKey();

        const ciphertext = await encryptForServer(
          { personalInfo: { ...arg.personalData }, ts: Date.now() },
          publicKeyB64
        );

        const result = await baseQuery({
          url: API_CONFIG.collectData(arg.employeeId),
          method: 'PUT',
          body: { ciphertext, keyId },
        });
        if (result.error) return { error: result.error as any };
        return { data: result.data as UserEntity };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedEmployee(data));
        } catch (error) {
          console.error('Failed to submit personal data info data:', error);
        }
      },
    }),
    collectUserQuestionnairePersonalInfo: builder.mutation<
      UserEntity,
      { personalData: PersonalInfo; employeeId: string }
    >({
      async queryFn({ personalData, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer(
            { personalInfo: { ...personalData }, ts: Date.now() },
            publicKeyB64
          );
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data));
        } catch (error) {
          console.error('Failed to submit personal data info data:', error);
        }
      },
    }),
    collectUserAddress: builder.mutation<UserEntity, { address: Address; employeeId: string }>({
      async queryFn({ address, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer({ address: { ...address }, ts: Date.now() }, publicKeyB64);
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedEmployee(data));
        } catch (error) {
          console.error('Failed to submit address data:', error);
        }
      },
    }),
    collectUserQuestionnaireAddress: builder.mutation<UserEntity, { address: Address; employeeId: string }>({
      async queryFn({ address, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer({ address: { ...address }, ts: Date.now() }, publicKeyB64);
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data));
        } catch (error) {
          console.error('Failed to submit address data:', error);
        }
      },
    }),
    collectUserJobInfo: builder.mutation<UserEntity, { jobInfo: JobInfo; employeeId: string }>({
      async queryFn({ jobInfo, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer({ jobInfo: { ...jobInfo }, ts: Date.now() }, publicKeyB64);
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedEmployee(data));
        } catch (error) {
          console.error('Failed to submit job info data:', error);
        }
      },
    }),
    collectUserBankInfo: builder.mutation<UserEntity, { bankInfo: BankInfo; employeeId: string }>({
      async queryFn({ bankInfo, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer({ bankInfo: { ...bankInfo }, ts: Date.now() }, publicKeyB64);
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedEmployee(data));
        } catch (error) {
          console.error('Failed to submit bank info data:', error);
        }
      },
    }),
    collectUserPassportData: builder.mutation<UserEntity, { passportData: PassportDocument; employeeId: string }>({
      async queryFn({ passportData, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer(
            { documents: { passportDocuments: passportData }, ts: Date.now() },
            publicKeyB64
          );
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data));
        } catch (error) {
          console.error('Failed to submit passport info data:', error);
        }
      },
    }),
    collectUserQuestionnairePassportData: builder.mutation<
      UserEntity,
      { passportData: PassportDocument; employeeId: string }
    >({
      async queryFn({ passportData, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer(
            { documents: { passportDocuments: passportData }, ts: Date.now() },
            publicKeyB64
          );
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedEmployee(data));
        } catch (error) {
          console.error('Failed to submit passport info data:', error);
        }
      },
    }),
    collectUserEmbassyData: builder.mutation<UserEntity, { embassyData: EmbassyDocument[]; employeeId: string }>({
      async queryFn({ embassyData, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer(
            { documents: { embassyDocuments: embassyData }, ts: Date.now() },
            publicKeyB64
          );
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedEmployee(data));
        } catch (error) {
          console.error('Failed to submit embassy info data:', error);
        }
      },
    }),
    collectUserStudentData: builder.mutation<UserEntity, { studentData: EducationDocuments; employeeId: string }>({
      async queryFn({ studentData, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer(
            { documents: { educationDocuments: studentData }, ts: Date.now() },
            publicKeyB64
          );
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedEmployee(data));
        } catch (error) {
          console.error('Failed to submit student info data:', error);
        }
      },
    }),
    collectUserWorkPermitData: builder.mutation<
      UserEntity,
      { workPermissionData: WorkPermissionDocument; employeeId: string }
    >({
      async queryFn({ workPermissionData, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer(
            { documents: { workPermissionDocuments: workPermissionData }, ts: Date.now() },
            publicKeyB64
          );
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedEmployee(data));
        } catch (error) {
          console.error('Failed to submit work permission info data:', error);
        }
      },
    }),
    collectUserResidenceData: builder.mutation<
      UserEntity,
      { userResidenceData: ResidenceCardDocument; employeeId: string }
    >({
      async queryFn({ userResidenceData, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer(
            { documents: { residenceCardDocuments: userResidenceData }, ts: Date.now() },
            publicKeyB64
          );
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedEmployee(data));
        } catch (error) {
          console.error('Failed to submit residence info data:', error);
        }
      },
    }),
    collectUserVisaData: builder.mutation<UserEntity, { userVisaData: VisaInformationDocument; employeeId: string }>({
      async queryFn({ userVisaData, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer(
            { documents: { visaInformationDocuments: userVisaData }, ts: Date.now() },
            publicKeyB64
          );
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedEmployee(data));
        } catch (error) {
          console.error('Failed to submit visa info data:', error);
        }
      },
    }),
    collectUserDrivingLicence: builder.mutation<
      UserEntity,
      { drivingLicenceData: DrivingLicenseDocument; employeeId: string }
    >({
      async queryFn({ drivingLicenceData, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer(
            { documents: { drivingLicenceDocuments: drivingLicenceData }, ts: Date.now() },
            publicKeyB64
          );
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedEmployee(data));
        } catch (error) {
          console.error('Failed to submit driving licence info data:', error);
        }
      },
    }),
    collectUserGlobalData: builder.mutation<UserEntity, { consentToEmailPITInfo: boolean; employeeId: string }>({
      async queryFn({ consentToEmailPITInfo, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer(
            { consentToEmailPIT: consentToEmailPITInfo, ts: Date.now() },
            publicKeyB64
          );
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedEmployee(data));
        } catch (error) {
          console.error('Failed to submit email consert info data:', error);
        }
      },
    }),
    collectUserDocumentStatusData: builder.mutation<
      UserEntity,
      { documentStatusInfo: UserDocumentsStatus; employeeId: string }
    >({
      async queryFn({ documentStatusInfo, employeeId }, _api, _extra, baseQuery) {
        try {
          const { keyId, publicKeyB64 } = await getServerPublicKey();
          const ciphertext = await encryptForServer(
            { documentStatus: documentStatusInfo, ts: Date.now() },
            publicKeyB64
          );
          const result = await baseQuery({
            url: API_CONFIG.collectData(employeeId),
            method: 'PUT',
            body: { ciphertext, keyId },
          });
          if ('error' in result && result.error) return { error: result.error as any };
          return { data: result.data as UserEntity };
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', error: e } as any };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data));
        } catch (error) {
          console.error('Failed to submit document status info data:', error);
        }
      },
    }),
  }),
});

export const {
  useCollectUserPersonalInfoMutation,
  useCollectUserQuestionnairePersonalInfoMutation,
  useCollectUserAddressMutation,
  useCollectUserQuestionnaireAddressMutation,
  useCollectUserJobInfoMutation,
  useCollectUserBankInfoMutation,
  useCollectUserPassportDataMutation,
  useCollectUserQuestionnairePassportDataMutation,
  useCollectUserEmbassyDataMutation,
  useCollectUserStudentDataMutation,
  useCollectUserWorkPermitDataMutation,
  useCollectUserResidenceDataMutation,
  useCollectUserVisaDataMutation,
  useCollectUserDrivingLicenceMutation,
  useCollectUserGlobalDataMutation,
  useCollectUserDocumentStatusDataMutation,
} = collectDataApi;
