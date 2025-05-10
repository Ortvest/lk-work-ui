import { useEffect, useState } from "react";

import { EmployeeTableHeader } from '@modules/EmployeesTable/layout/Header';
import { EmployeesTableContent } from '@modules/EmployeesTable/layout/TableContent';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { useFetchAllEmployeesQuery } from '@global/api/employee/employee.api';
import { AddEmployeePopup } from "@modules/EmployeesTable/layout/AddEmployeePopup";

export const mockUsers = [
  {
    _id: 'user1',
    personalInfo: {
      firstName: 'Sergey',
      lastName: 'Kazantsev',
      dateOfBirth: '1990-01-01',
      gender: 'male',
      polishPhoneNumber: '731728031',
      nationalPhoneNumber: '',
      email: 'ortvest@gmail.com',
      nationality: 'Ukrainian',
      passportNumber: 'G223DD2',
      peselNumber: '02338488834',
      timeFromWorkStartDate: '707',
      isStudent: true,
      hasDrivingLicence: false,
      _id: 'pi1',
      avatarUrl: '',
      whichCompanyDoYouWantWorkFor: [],
    },
    address: {
      city: 'Poznan',
      street: 'Poznanska',
      houseNumber: '145',
      apartmentNumber: '144',
      postalCode: '41500',
      _id: 'addr1',
    },
    documents: {
      workPermissionDocuments: {
        workPermitNumber: '',
        workPermitExpirationDate: '',
        workPermitDocumentFileKey: '',
        _id: 'doc1',
      },
      residenceCardDocuments: {
        residenceCardFileKey: '',
        cardNumber: '',
        countryOfIssue: '',
        dateOfIssue: '',
        expirationDate: '',
        reasonForIssuance: '',
        _id: 'doc2',
      },
      visaInformationDocuments: {
        visaType: 'D',
        dateOfIssue: '',
        expirationDate: '',
        visaDocumentFileKey: '',
        _id: 'doc3',
      },
      educationDocuments: {
        studentFrontCardFileKey: '',
        studentBackCardFileKey: '',
        studentPermitCardFileKey: '',
        studentStatusDate: '',
        _id: 'doc4',
      },
      drivingLicenceDocuments: {
        drivingLicenceNumber: '',
        drivingLicenceCategories: [],
        drivingLicenceFrontCardFileKey: '',
        drivingLicenceBackCardFileKey: '',
        drivingLicenceDate: '',
        _id: 'doc5',
      },
      ukrainianStatementDocument: {
        statementDocumentFileKey: '',
        _id: 'doc6',
      },
      _id: 'docParent1',
      embassyDocuments: [],
      passportDocuments: {
        passportNumber: '',
        passportExpirationDate: '',
        passportDateOfIssue: '',
        passportFileKey: '',
      },
      studentDocuments: {
        studentFrontCardFileKey: '',
        studentBackCardFileKey: '',
        studentPermitCardFileKey: '',
        studentStatusDate: '',
      },
    },
    jobInfo: {
      company: 'mindk',
      position: 'recruiter',
      employmentStartDate: '2023-02-06',
      employmentEndDate: '2024-04-01',
      _id: 'job1',
    },
    bankInfo: {
      bankName: 'monobank',
      bankEmploymentStartDate: '',
      _id: 'bank1',
      bankAccountNumber: '1234567812345678',
    },
    workStatus: 'working',
    role: 'employee',
    consentToEmailPIT: true,
    __v: 0,
  },

  // Мок 2 — подтверждённый
  {
    _id: 'user2',
    personalInfo: {
      firstName: 'Vlad',
      lastName: 'Topalov',
      dateOfBirth: '1988-11-11',
      gender: 'male',
      polishPhoneNumber: '731123456',
      nationalPhoneNumber: '380991234567',
      email: 'vlad.t@gmail.com',
      nationality: 'Georgian',
      passportNumber: 'G456GG7',
      peselNumber: '02338488834',
      timeFromWorkStartDate: '200',
      isStudent: false,
      hasDrivingLicence: true,
      _id: 'pi2',
      avatarUrl: '',
      whichCompanyDoYouWantWorkFor: [],
    },
    address: {
      city: 'Warsaw',
      street: 'Centralna',
      houseNumber: '12',
      apartmentNumber: '3',
      postalCode: '00123',
      _id: 'addr2',
    },
    documents: {
      workPermissionDocuments: {
        workPermitNumber: 'WP456',
        workPermitExpirationDate: '2025-06-01',
        workPermitDocumentFileKey: 'wp-file-456',
        _id: 'doc21',
      },
      residenceCardDocuments: {
        residenceCardFileKey: 'rc-file',
        cardNumber: 'RC123',
        countryOfIssue: 'Poland',
        dateOfIssue: '2023-01-01',
        expirationDate: '2026-01-01',
        reasonForIssuance: 'Work',
        _id: 'doc22',
      },
      visaInformationDocuments: {
        visaType: 'D',
        dateOfIssue: '2023-03-01',
        expirationDate: '2025-03-01',
        visaDocumentFileKey: 'visa-file',
        _id: 'doc23',
      },
      educationDocuments: {
        studentFrontCardFileKey: '',
        studentBackCardFileKey: '',
        studentPermitCardFileKey: '',
        studentStatusDate: '',
        _id: 'doc24',
      },
      drivingLicenceDocuments: {
        drivingLicenceNumber: 'DL-9876',
        drivingLicenceCategories: ['B'],
        drivingLicenceFrontCardFileKey: 'dl-front',
        drivingLicenceBackCardFileKey: 'dl-back',
        drivingLicenceDate: '2010-08-12',
        _id: 'doc25',
      },
      ukrainianStatementDocument: {
        statementDocumentFileKey: '',
        _id: 'doc26',
      },
      _id: 'docParent2',
      embassyDocuments: [],
      passportDocuments: {
        passportNumber: 'GG123456',
        passportExpirationDate: '2030-01-01',
        passportDateOfIssue: '2020-01-01',
        passportFileKey: 'passport-file',
      },
      studentDocuments: {
        studentFrontCardFileKey: '',
        studentBackCardFileKey: '',
        studentPermitCardFileKey: '',
        studentStatusDate: '',
      },
    },
    jobInfo: {
      company: 'softserve',
      position: 'developer',
      employmentStartDate: '2022-09-01',
      employmentEndDate: '',
      _id: 'job2',
    },
    bankInfo: {
      bankName: 'PKO Bank',
      bankEmploymentStartDate: '2022-10-01',
      _id: 'bank2',
      bankAccountNumber: '9988776655443322',
    },
    workStatus: 'confirmed',
    role: 'employee',
    consentToEmailPIT: true,
    __v: 0,
  },

  // Мок 3 — статус CHECKING
  {
    _id: 'user3',
    personalInfo: {
      firstName: 'Anna',
      lastName: 'Abramova',
      dateOfBirth: '1995-07-15',
      gender: 'female',
      polishPhoneNumber: '790123456',
      nationalPhoneNumber: '380671234567',
      email: 'anna.abramova@mail.com',
      nationality: 'Chinaman',
      passportNumber: 'C987ZZ1',
      peselNumber: '98123456789',
      timeFromWorkStartDate: '90',
      isStudent: false,
      hasDrivingLicence: false,
      _id: 'pi3',
      avatarUrl: '',
      whichCompanyDoYouWantWorkFor: [],
    },
    address: {
      city: 'Lodz',
      street: 'Mickiewicza',
      houseNumber: '10',
      apartmentNumber: '2',
      postalCode: '90001',
      _id: 'addr3',
    },
    documents: {
      workPermissionDocuments: {},
      residenceCardDocuments: {},
      visaInformationDocuments: { visaType: 'D' },
      educationDocuments: {},
      drivingLicenceDocuments: {},
      ukrainianStatementDocument: {},
      embassyDocuments: [],
      passportDocuments: {},
      studentDocuments: {},
      _id: 'docParent3',
    },
    jobInfo: {
      company: 'Luxoft',
      position: 'analyst',
      employmentStartDate: '2024-01-01',
      employmentEndDate: '',
      _id: 'job3',
    },
    bankInfo: {
      bankName: 'Santander',
      bankEmploymentStartDate: '',
      _id: 'bank3',
      bankAccountNumber: '1111222233334444',
    },
    workStatus: 'checking',
    role: 'employee',
    consentToEmailPIT: true,
    __v: 0,
  },

  // Мок 4 — статус LAY OFF
  {
    _id: 'user4',
    personalInfo: {
      firstName: 'Tom',
      lastName: 'Sidorov',
      dateOfBirth: '1992-03-22',
      gender: 'male',
      polishPhoneNumber: '789654321',
      nationalPhoneNumber: '',
      email: 'tom.sid@gmail.com',
      nationality: 'African',
      passportNumber: 'AFR567X',
      peselNumber: '95175345682',
      timeFromWorkStartDate: '360',
      isStudent: false,
      hasDrivingLicence: true,
      _id: 'pi4',
      avatarUrl: '',
      whichCompanyDoYouWantWorkFor: [],
    },
    address: {
      city: 'Wroclaw',
      street: 'Legnicka',
      houseNumber: '33',
      apartmentNumber: '5',
      postalCode: '50002',
      _id: 'addr4',
    },
    documents: {
      workPermissionDocuments: {},
      residenceCardDocuments: {},
      visaInformationDocuments: {},
      educationDocuments: {},
      drivingLicenceDocuments: {},
      ukrainianStatementDocument: {},
      embassyDocuments: [],
      passportDocuments: {},
      studentDocuments: {},
      _id: 'docParent4',
    },
    jobInfo: {
      company: 'Comarch',
      position: 'tester',
      employmentStartDate: '2021-03-01',
      employmentEndDate: '2023-12-31',
      _id: 'job4',
    },
    bankInfo: {
      bankName: 'Alior Bank',
      bankEmploymentStartDate: '',
      _id: 'bank4',
      bankAccountNumber: '4455667788990011',
    },
    workStatus: 'layoff',
    role: 'employee',
    consentToEmailPIT: false,
    __v: 0,
  },

  // Мок 5 — статус NEED UPDATE
  {
    _id: 'user5',
    personalInfo: {
      firstName: 'Elena',
      lastName: 'Moroz',
      dateOfBirth: '1998-12-30',
      gender: 'female',
      polishPhoneNumber: '777888999',
      nationalPhoneNumber: '',
      email: 'elena.moroz@gmail.com',
      nationality: 'African',
      passportNumber: 'XYZ1234',
      peselNumber: '99001122334',
      timeFromWorkStartDate: '45',
      isStudent: true,
      hasDrivingLicence: false,
      _id: 'pi5',
      avatarUrl: '',
      whichCompanyDoYouWantWorkFor: [],
    },
    address: {
      city: 'Krakow',
      street: 'Karmelicka',
      houseNumber: '9',
      apartmentNumber: '1',
      postalCode: '30001',
      _id: 'addr5',
    },
    documents: {
      workPermissionDocuments: {},
      residenceCardDocuments: {},
      visaInformationDocuments: { visaType: 'C' },
      educationDocuments: {},
      drivingLicenceDocuments: {},
      ukrainianStatementDocument: {},
      embassyDocuments: [],
      passportDocuments: {},
      studentDocuments: {},
      _id: 'docParent5',
    },
    jobInfo: {
      company: 'Brainly',
      position: 'intern',
      employmentStartDate: '2025-01-01',
      employmentEndDate: '',
      _id: 'job5',
    },
    bankInfo: {
      bankName: 'ING',
      bankEmploymentStartDate: '',
      _id: 'bank5',
      bankAccountNumber: '1010101010101010',
    },
    workStatus: 'need update',
    role: 'employee',
    consentToEmailPIT: true,
    __v: 0,
  },
];

export const EmployeesTable = (): JSX.Element => {
  const { refetch } = useFetchAllEmployeesQuery();

  const { employees } = useTypedSelector((state) => state.employeeReducer);

  const [isOpenedModal, setIsOpenedModal] = useState(false);
  useEffect(() => {
    refetch();
  }, []);
  return (
    <div style={{ width: '100%' }}>
      <EmployeeTableHeader setIsOpenedModal={setIsOpenedModal} />
      <EmployeesTableContent employees={employees} />
      <AddEmployeePopup setIsOpenedModal={setIsOpenedModal} isOpen={isOpenedModal}/>
    </div>
  );
};
