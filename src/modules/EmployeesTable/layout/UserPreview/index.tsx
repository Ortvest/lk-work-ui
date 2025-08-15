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
        title="Personal Info"
        iconUrl={UserPersonalInfoIcon}
        rows={[{ label: 'Pesel', value: selectedEmployee?.personalInfo?.peselNumber as string }]}
      />
      <InfoSection
        title="Contact Info"
        iconUrl={UserContactDataIcon}
        rows={[
          { label: 'Email', value: selectedEmployee?.personalInfo?.email as string },
          { label: 'Polish phone number', value: selectedEmployee?.personalInfo?.polishPhoneNumber as string },
          { label: 'National phone number', value: selectedEmployee?.personalInfo?.nationalPhoneNumber as string },
        ]}
      />
      <InfoSection
        title="Work Info"
        iconUrl={UserWorkInfoIcon}
        rows={[
          { label: 'Company', value: selectedEmployee?.jobInfo.company as string },
          { label: 'Position', value: selectedEmployee?.jobInfo.position as string },
          { label: 'Hire Date', value: selectedEmployee?.jobInfo.employmentStartDate as string },
        ]}
      />
      <PrintDocumentsButton setIsUserDocumentsDrawerOpen={setIsUserDocumentsDrawerOpen} />

      <UserPreviewToolbar />
    </article>
  );
};
