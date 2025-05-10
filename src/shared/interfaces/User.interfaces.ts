import {
  DrivingLicenseCategory,
  Gender,
  UserDocumentsStatus,
  UserRole,
  UserWorkStatus,
} from '@shared/enums/user.enums';

export interface UserSignInData {
  email: string;
  password: string;
}

export interface PersonalInfo {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  password?: string;
  gender?: Gender;
  polishPhoneNumber?: string;
  nationalPhoneNumber?: string;
  email?: string;
  nationality?: string;
  passportNumber?: string;
  peselNumber?: string;
  timeFromWorkStartDate?: string;
  isStudent: boolean;
}

export interface Address {
  city?: string;
  postalCode?: string;
  street?: string;
  houseNumber?: string;
  apartmentNumber?: string;
}

export interface JobInfo {
  company?: string;
  position?: string;
  employmentStartDate?: string;
  employmentEndDate?: string;
}

export interface BankInfo {
  bankName?: string;
  bankAccountNumber?: string;
  bankEmploymentStartDate?: string;
}

export interface PassportDocument {
  passportNumber?: string;
  passportExpirationDate?: string;
  passportDateOfIssue?: string;
  passportFileKey?: string;
}

export interface PassportDocumentsUploadData extends Omit<PassportDocument, 'passportFileKey'> {
  passportFile: File;
}

export interface EmbassyDocument {
  embassyFirstDocumentFileKey?: string;
  embassySecondDocumentFileKey?: string;
  embassyDateOfIssue?: string;
}

export interface EmbassyData {
  documents: EmbassyDocument[];
}

export interface EmbassyNotUploadedData {
  documents: [
    {
      embassyFirstDocumentPhoto?: string;
      embassySecondDocumentPhoto?: string;
      embassyDateOfIssue?: string;
    },
  ];
}
export interface WorkPermissionDocument {
  workPermitExpirationDate?: string;
  workPermitDocumentFileKey?: string;
  workPermitPaymentDocumentFileKey?: string;
  workPermitApplicationFileKey?: string;
}

export interface WorkPermissiontNotUploadedData {
  workPermitDocumentFile?: File;
  workPermitPaymentDocumentFile?: File;
  workPermitApplicationFile?: File;
  workPermitExpirationDate?: string;
}

export interface EducationDocuments {
  studentFrontCardFileKey?: string;
  studentBackCardFileKey?: string;
  studentPermitCardFileKey?: string;
  studentStatusDate?: string;
}

export interface StudentNotUploadedData {
  studentFrontCardFile?: File;
  studentBackCardFile?: File;
  studentPermitCardFile?: File;
  studentStatusDate?: string;
}

export interface ResidenceCardDocument {
  residenceCardFileKey?: string;
  cardNumber?: string;
  countryOfIssue?: string;
  dateOfIssue?: string;
  expirationDate?: string;
  reasonForIssuance?: string;
}

export interface ResidenceCardDocumentNotUploaded extends Omit<ResidenceCardDocument, 'residenceCardFileKey'> {
  residenceCardFile: File;
}

export interface VisaInformationDocument {
  visaType?: string;
  dateOfIssue?: string;
  expirationDate?: string;
  visaDocumentFileKey?: string;
}

export interface VisaInformationDocumentNotUploaded extends Omit<VisaInformationDocument, 'visaDocumentFileKey'> {
  visaDocumentFile: File;
}

export interface DrivingLicenseDocument {
  drivingLicenceCategories?: DrivingLicenseCategory[];
  drivingLicenceFrontCardFileKey?: string;
  drivingLicenceBackCardFileKey?: string;
  drivingLicenseExpirationDate?: string;
  drivingLicenseDateOfIssue?: string;
}

export interface DrivingLicenseDocumentNotUploaded {
  drivingLicenceCategories?: DrivingLicenseCategory[];
  drivingLicenceFrontCardFile?: File;
  drivingLicenceBackCardFile?: File;
  drivingLicenseExpirationDate?: string;
  drivingLicenseDateOfIssue?: string;
}

export interface UkrainianStatementDocument {
  statementDocumentFileKey?: string;
}

export interface Documents {
  workPermissionDocuments?: WorkPermissionDocument;
  educationDocuments?: EducationDocuments;
  residenceCardDocuments?: ResidenceCardDocument;
  visaInformationDocuments?: VisaInformationDocument;
  ukrainianStatementDocument?: UkrainianStatementDocument;
  drivingLicenceDocuments?: DrivingLicenseDocument;
  passportDocuments?: PassportDocument;
  embassyDocuments?: EmbassyDocument[];
}

export interface UserEntity {
  personalInfo: PersonalInfo;
  address: Address;
  documents: Documents;
  jobInfo: JobInfo;
  bankInfo: BankInfo;
  documentStatus: UserDocumentsStatus;
  workStatus: UserWorkStatus;
  role: UserRole;
  consentToEmailPIT: boolean;
  _id: string;
}
