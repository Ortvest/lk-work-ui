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

export interface WorkPermissionData {
  workPermissionFile: File;
  documentNumber: string;
  expirationDate: {
    year: string;
    month: string;
    day: string;
  };
}

export interface StudentInfoData {
  studentInfoFile: File;
  dateOfIssue: {
    year: string;
    month: string;
    day: string;
  };
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
