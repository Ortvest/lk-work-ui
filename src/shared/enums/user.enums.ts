export const UserDocumentsStatuses = {
  WAITING_FOR_BRIEFING: 'waiting-for-briefing',
  TO_CONFIRM: 'to-confirm',
  WAITING_FOR_DOCS: 'waiting-for-docs',
  CONFIRMED: 'confirmed',
} as const;

export const UserRoles = {
  SUPER_ADMIN: 'super-admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
} as const;

export const UserWorkStatuses = {
  WORKING: 'working',
  LAID_OFF: 'laid-off',
} as const;

export const Genders = {
  MALE: 'male',
  FEMALE: 'female',
} as const;

export const VisaTypes = {
  A: 'A', // Diplomatic
  B: 'B', // Tourist
  C: 'C', // Short Stay
  D: 'D', // Long Stay (Work, Study)
  E: 'E', // Treaty Trader
  F: 'F', // Student
  G: 'G', // Government Official
  H: 'H', // Temporary Worker
  I: 'I', // Media
  J: 'J', // Exchange Visitor
  K: 'K', // Fiancé
  L: 'L', // Intra-Company Transfer
  M: 'M', // Vocational Student
  O: 'O', // Extraordinary Ability
  P: 'P', // Athlete/Entertainer
  Q: 'Q', // Cultural Exchange
  R: 'R', // Religious Worker
  S: 'S', // Witness/Informant
  T: 'T', // Victim of Trafficking
  U: 'U', // Victim of Crime
  V: 'V', // Family Unification
} as const;

export const DrivingLicenseCategories = {
  A: 'A', // Motorcycles
  A1: 'A1', // Light motorcycles (up to 125cc)
  A2: 'A2', // Medium-power motorcycles
  AM: 'AM', // Mopeds
  B: 'B', // Passenger cars
  B1: 'B1', // Tricycles and quadricycles
  C: 'C', // Trucks (over 3.5 tons)
  C1: 'C1', // Light trucks (up to 7.5 tons)
  D: 'D', // Buses
  D1: 'D1', // Mini-buses (up to 16 passengers)
  BE: 'BE', // Passenger cars with a trailer
  C1E: 'C1E', // Light trucks with a trailer
  CE: 'CE', // Trucks with a trailer
  D1E: 'D1E', // Mini-buses with a trailer
  DE: 'DE', // Buses with a trailer
  T: 'T', // Tractors
} as const;

export type UserDocumentsStatus = (typeof UserDocumentsStatuses)[keyof typeof UserDocumentsStatuses];
export type UserWorkStatus = (typeof UserWorkStatuses)[keyof typeof UserWorkStatuses];
export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];
export type Gender = (typeof Genders)[keyof typeof Genders];
export type VisaType = (typeof VisaTypes)[keyof typeof VisaTypes];
export type DrivingLicenseCategory = (typeof DrivingLicenseCategories)[keyof typeof DrivingLicenseCategories];
