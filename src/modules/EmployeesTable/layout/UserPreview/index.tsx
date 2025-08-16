import React from 'react';

import { InfoSection } from '@modules/EmployeesTable/layout/UserPreview/layout/InfoSection';
import { PrintDocumentsButton } from '@modules/EmployeesTable/layout/UserPreview/layout/PrintDocumentsButton';
import { UserPreviewHeader } from '@modules/EmployeesTable/layout/UserPreview/layout/UserPreviewHeader';
import { UserPreviewPersonalData } from '@modules/EmployeesTable/layout/UserPreview/layout/UserPreviewPersonalData';
import { UserPreviewToolbar } from '@modules/EmployeesTable/layout/UserPreview/layout/UserPreviewToolbar';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import UserContactDataIcon from '@shared/assets/icons/UserContactDataIcon.svg';
import UserPersonalInfoIcon from '@shared/assets/icons/UserPersonalInfoIcon.svg';
import UserWorkInfoIcon from '@shared/assets/icons/UserWorkInfoIcon.svg';

interface UserPreviewProps {
  setIsDrawerOpen: (isOpen: boolean) => void;
  setIsUserDocumentsDrawerOpen: (isOpen: boolean) => void;
  setIsFireUserDrawerOpen: (isOpen: boolean) => void;
}
export const UserPreview = ({
  setIsDrawerOpen,
  setIsUserDocumentsDrawerOpen,
  setIsFireUserDrawerOpen,
}: UserPreviewProps): React.ReactNode => {
  const { selectedEmployee } = useTypedSelector((state) => state.employeeReducer);

  return (
    <article style={{ position: 'relative' }}>
      <UserPreviewHeader
        setIsDrawerOpen={setIsDrawerOpen}
        setIsFireUserDrawerOpen={setIsFireUserDrawerOpen}
        fullName={`${selectedEmployee?.personalInfo.firstName} ${selectedEmployee?.personalInfo.lastName}`}
      />
      <UserPreviewPersonalData
        avatarUrl={''}
        dateOfBirth={selectedEmployee?.personalInfo?.dateOfBirth as string}
        nationality={selectedEmployee?.personalInfo?.nationality as string}
        fullName={`${selectedEmployee?.personalInfo.firstName} ${selectedEmployee?.personalInfo.lastName}`}
        workStatus={selectedEmployee?.workStatus as string}
      />
      <InfoSection
        titleKey="cardPersonalInfo"
        iconUrl={UserPersonalInfoIcon}
        rows={[
          {
            labelKey: 'cardPesel',
            value: selectedEmployee?.personalInfo?.peselNumber as string,
          },
        ]}
      />
      <InfoSection
        titleKey="cardContactInfo"
        iconUrl={UserContactDataIcon}
        rows={[
          { labelKey: 'cardEmail', value: selectedEmployee?.personalInfo?.email as string },
          { labelKey: 'cardPolishPhone', value: selectedEmployee?.personalInfo?.polishPhoneNumber as string },
          { labelKey: 'cardNationalPhone', value: selectedEmployee?.personalInfo?.nationalPhoneNumber as string },
        ]}
      />

      <InfoSection
        titleKey="cardWorkInfo"
        iconUrl={UserWorkInfoIcon}
        rows={[
          { labelKey: 'cardCompany', value: selectedEmployee?.jobInfo.company as string },
          { labelKey: 'cardPosition', value: selectedEmployee?.jobInfo.position as string },
          { labelKey: 'cardHireDate', value: selectedEmployee?.jobInfo.employmentStartDate as string },
        ]}
      />
      <PrintDocumentsButton setIsUserDocumentsDrawerOpen={setIsUserDocumentsDrawerOpen} />

      <UserPreviewToolbar />
    </article>
  );
};
