export interface PassportData {
  passportFile: File;
  passportNumber: string;
  dateOfIssue: {
    year: string;
    month: string;
    day: string;
  };
  expirationDate: {
    year: string;
    month: string;
    day: string;
  };
}

export interface EmbassyData {
  firstDocumentPhoto: File;
  secondDocumentPhoto: File;
  dateOfIssue: {
    year: string;
    month: string;
    day: string;
  };
}

export interface WorkPermissionData {
  workPermissionFile: File;
  dateOfIssue: {
    year: string;
    month: string;
    day: string;
  };
  paymentFile: File;
  applicationFile: File;
}

export interface StudentCardData {
  studentCardFront: File;
  studentCardBack: File;
  dateOfIssue: {
    year: string;
    month: string;
    day: string;
  };
  statementFile: File;
}

export interface ResidenceCardData {
  resedenceCardFile: File;
  cardNumber: string;
  countryOfIssue: string;
  dateOfIssue: {
    year: string;
    month: string;
    day: string;
  };
  expirationDate: {
    year: string;
    month: string;
    day: string;
  };
  reasonForIssuance: string;
}

export interface VisaInfoData {
  visaInfoFile: File;
  visaType: string;
  dateOfIssue: {
    year: string;
    month: string;
    day: string;
  };
  expirationDate: {
    year: string;
    month: string;
    day: string;
  };
}

export interface DrivingLicenceData {
  documentPhotoFirst: File;
  documentPhotosecond: File;
  categories: string;
  dateOfIssue: {
    year: string;
    month: string;
    day: string;
  };
  expirationDate: {
    year: string;
    month: string;
    day: string;
  };
}
