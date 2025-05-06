export interface PersonalInfoData {
  photo: File;
  firstName: string;
  lastName: string;
  dateOfBirth: {
    year: string;
    month: string;
    day: string;
  };
  gender: 'male' | 'female';
  citizenship: string;
  passportNumber: number;
  peselNumber: number;
  studentData: {
    isStudent: boolean;
    validityPeriod: {
      year: string;
      month: string;
      day: string;
    };
  };
  drivingLicenceData: {
    isDrivingLicence: boolean;
    validityPeriod: {
      year: string;
      month: string;
      day: string;
    };
  };
  emailAgreement: boolean;
  requiredPhoneNumber: {
    prefix: string;
    number: string;
  };
  optionalPhoneNumber: {
    prefix: string;
    number: string;
  };
  email: string;
  workStartDate: {
    year: string;
    month: string;
    day: string;
  };
}
