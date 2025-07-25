export interface ContactPerson {
  personFirstName: string;
  personSecondName: string;
  personPosition: string;
  personEmail: string;
}

export interface WorkCompanyEntity {
  _id?: string;
  name: string;
  address: string;
  nip: number;
  phoneNumber: string;
  email: string;
  city: string;
  contactPerson: ContactPerson;
}


export type AddWorkCompany = WorkCompanyEntity;
export type EditWorkCompany = Partial<WorkCompanyEntity>;