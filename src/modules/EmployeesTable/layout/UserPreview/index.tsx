import React from 'react';

import { InfoSection } from '@modules/EmployeesTable/layout/UserPreview/layout/InfoSection';
import { PrintDocumentsButton } from '@modules/EmployeesTable/layout/UserPreview/layout/PrintDocumentsButton';
import { UserPreviewHeader } from '@modules/EmployeesTable/layout/UserPreview/layout/UserPreviewHeader';
import { UserPreviewPersonalData } from '@modules/EmployeesTable/layout/UserPreview/layout/UserPreviewPersonalData';
import { UserPreviewToolbar } from '@modules/EmployeesTable/layout/UserPreview/layout/UserPreviewToolbar';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { UserDocumentsStatus } from '@shared/enums/user.enums';

interface UserPreviewProps {
  setIsDrawerOpen: (isOpen: boolean) => void;
  setIsUserDocumentsDrawerOpen: (isOpen: boolean) => void;
}
export const UserPreview = ({ setIsDrawerOpen, setIsUserDocumentsDrawerOpen }: UserPreviewProps): React.ReactNode => {
  const { selectedEmployee } = useTypedSelector((state) => state.employeeReducer);
  return (
    <article style={{ position: 'relative' }}>
      <UserPreviewHeader
        setIsDrawerOpen={setIsDrawerOpen}
        fullName={`${selectedEmployee?.personalInfo.firstName} ${selectedEmployee?.personalInfo.lastName}`}
      />
      <UserPreviewPersonalData
        avatarUrl={''}
        dateOfBirth={selectedEmployee?.personalInfo?.dateOfBirth as string}
        nationality={selectedEmployee?.personalInfo?.nationality as string}
        fullName={`${selectedEmployee?.personalInfo.firstName} ${selectedEmployee?.personalInfo.lastName}`}
        documentStatus={selectedEmployee?.documentStatus as UserDocumentsStatus}
      />
      <InfoSection
        title="Contact Info"
        rows={[
          { label: 'Email', value: selectedEmployee?.personalInfo?.email as string },
          { label: 'Polish phone number', value: selectedEmployee?.personalInfo?.polishPhoneNumber as string },
          { label: 'National phone number', value: selectedEmployee?.personalInfo?.nationalPhoneNumber as string },
        ]}
      />
      <InfoSection
        title="Work Info"
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
