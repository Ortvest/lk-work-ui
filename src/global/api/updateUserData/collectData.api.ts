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

const { setSelectedEmployee } = EmployeeSlice.actions;
const { setCurrentUser } = UserSlice.actions;

export const collectDataApi = baseCollectData.injectEndpoints({
  endpoints: (builder) => ({
    collectUserPersonalInfo: builder.mutation<UserEntity, { personalData: PersonalInfo; employeeId: string }>({
      query: ({ personalData, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { personalInfo: { ...personalData } },
      }),
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
      query: ({ personalData, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { personalInfo: { ...personalData } },
      }),
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
      query: ({ address, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { address: { ...address } },
      }),
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
      query: ({ address, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { address: { ...address } },
      }),
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
      query: ({ jobInfo, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { jobInfo: { ...jobInfo } },
      }),
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
      query: ({ bankInfo, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { bankInfo: { ...bankInfo } },
      }),
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
      query: ({ passportData, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { documents: { passportDocuments: passportData } },
      }),
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
      query: ({ embassyData, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { documents: { embassyDocuments: embassyData } },
      }),
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
      query: ({ studentData, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { documents: { educationDocuments: studentData } },
      }),
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
      query: ({ workPermissionData, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { documents: { workPermissionDocuments: workPermissionData } },
      }),
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
      query: ({ userResidenceData, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { documents: { residenceCardDocuments: userResidenceData } },
      }),
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
      query: ({ userVisaData, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { documents: { visaInformationDocuments: userVisaData } },
      }),
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
      query: ({ drivingLicenceData, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { documents: { drivingLicenceDocuments: drivingLicenceData } },
      }),
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
      query: ({ consentToEmailPITInfo, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { consentToEmailPIT: consentToEmailPITInfo },
      }),
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
      query: ({ documentStatusInfo, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { documentStatus: documentStatusInfo },
      }),
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
  useCollectUserEmbassyDataMutation,
  useCollectUserStudentDataMutation,
  useCollectUserWorkPermitDataMutation,
  useCollectUserResidenceDataMutation,
  useCollectUserVisaDataMutation,
  useCollectUserDrivingLicenceMutation,
  useCollectUserGlobalDataMutation,
  useCollectUserDocumentStatusDataMutation,
} = collectDataApi;
