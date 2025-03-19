export interface PersonalInfoData {
  photo: string;
  firstName: string;
  lastName: string;
  dateOfBirth: {
    year: string;
    month: string;
    day: string;
  };
  gender: 'male' | 'female';
  requiredPhoneNumber: {
    prefix: string;
    number: string;
  };
  optionalPhoneNumber: {
    prefix: string;
    number: string;
  };
  email: string;
  emailAgreement: boolean;
}
