import {
  DrivingLicenseCategory,
  Gender,
  UserDocumentsStatus,
  UserRole,
  UserWorkStatus
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
  isStudent: boolean
}

export interface Address {
  city?: string;
  postalCode?: string;
  street?: string;
  houseNumber?: string;
  apartmentNumber?: string;
}

export interface WorkPermissionDocument {
  workPermitNumber?: string;
  workPermitExpirationDate?: string;
  workPermitDocumentFileKey?: string;
  workPermitDocumentUrl?: string;
}

export interface EducationDocuments {
  studentFrontCardFileKey?: string;
  studentBackCardFileKey?: string;
  studentPermitCardFileKey?: string;
  studentStatusDate?: string;
}

export interface DrivingLicenseDocument {
  drivingLicenceNumber?: string;
  drivingLicenceCategories?: DrivingLicenseCategory[];
  drivingLicenceFrontCardFileKey?: string;
  drivingLicenceBackCardFileKey?: string;
  drivingLicenceDate?: string;
}

export interface ResidenceCardDocument {
  residenceCardFileKey?: string;
  residenceCardUrl?: string;
  cardNumber?: string;
  countryOfIssue?: string;
  dateOfIssue?: string;
  expirationDate?: string;
  reasonForIssuance?: string;
}

export interface VisaInformationDocument {
  visaType?: string;
  dateOfIssue?: string;
  expirationDate?: string;
  visaDocumentFileKey?: string;
  visaDocumentUrl?: string;
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
}

export interface JobInfo {
  company?: string;
  position?: string;
  employmentStartDate?: string;
  employmentEndDate?: string;
}

export interface BankInfo {
  bankName?: string;
  bankEmploymentStartDate?: string;
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
  _id: string
}