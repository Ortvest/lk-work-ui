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

export interface SendResetPasswordEmail {
  email: string;
}

export interface PersonalInfo {
  firstName?: string;
  lastName?: string;
  dateOfBirth: string | { year: string; month: string; day: string };
  password?: string;
  gender?: Gender;
  polishPhoneNumber?: { prefix: string; number: string } | string;
  nationalPhoneNumber?: { prefix: string; number: string } | string;
  email?: string;
  nationality?: string;
  passportNumber?: string;
  peselNumber?: string;
  timeFromWorkStartDate?: string | { year: string; month: string; day: string };
  isStudent?: boolean;
  avatarUrl?: string | File;
  whichCompanyDoYouWantWorkFor?: string[];
  consentToEmailPIT: boolean;
  hasDrivingLicence: boolean;
}

export interface Address {
  city?: string;
  postalCode?: string;
  street?: string;
  houseNumber?: string;
  apartmentNumber?: string;
  isLivingInAccommodation: boolean;
  accommodationAddress: string;
}

export interface JobInfo {
  company?: string;
  position?: string;
  employmentStartDate?: string | { year: string; month: string; day: string };
  employmentEndDate?: string | { year: string; month: string; day: string };
}

export interface BankInfo {
  bankName?: string;
  bankAccountNumber?: string;
  bankEmploymentStartDate?: string;
}

export interface PassportDocument {
  passportNumber?: string;
  passportExpirationDate?: string | { year: string; month: string; day: string };
  passportDateOfIssue?: string | { year: string; month: string; day: string };
  passportFileKey?: string | File;
}

export interface EmbassyDocument {
  embassyFirstDocumentFileKey?: string | File;
  embassySecondDocumentFileKey?: string | File;
  embassyDateOfIssue?: string | { day: string; month: string; year: string };
}

export interface WorkPermissionDocument {
  workPermitExpirationDate?: string | { day: string; month: string; year: string };
  workPermitDocumentFileKey?: string | File;
  workPermitPaymentDocumentFileKey?: string | File;
  workPermitApplicationFileKey?: string | File;
}

export interface EducationDocuments {
  studentFrontCardFileKey?: string | File;
  studentBackCardFileKey?: string | File;
  studentPermitCardFileKey?: string | File;
  studentStatusDate?: string | { day: string; month: string; year: string };
}

export interface ResidenceCardDocument {
  residenceCardFileKey?: string | File;
  cardNumber?: string;
  countryOfIssue?: string;
  dateOfIssue?: string | { day: string; month: string; year: string };
  expirationDate?: string | { day: string; month: string; year: string };
  reasonForIssuance?: string;
}

export interface VisaInformationDocument {
  visaType?: string;
  dateOfIssue?: string | { day: string; month: string; year: string };
  expirationDate?: string | { day: string; month: string; year: string };
  visaDocumentFileKey?: string | File;
}

export interface DrivingLicenseDocument {
  drivingLicenceCategories?: DrivingLicenseCategory[];
  drivingLicenceFrontCardFileKey?: string | File;
  drivingLicenceBackCardFileKey?: string | File;
  drivingLicenseExpirationDate?: string | { day: string; month: string; year: string };
  drivingLicenseDateOfIssue?: string | { day: string; month: string; year: string };
}

export interface UkrainianStatementDocument {
  statementDocumentFileKey?: string | File;
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

export type EditUserData = UserEntity & {
  employeeId: string;
};

export interface AddEmployee {
  email: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
  company?: string;
}

export interface SetNewPasswordArgs {
  password: string;
  email: string;
  token: string;
}

export interface NewPassword {
  password: string;
  confirmPassword: string;
}
