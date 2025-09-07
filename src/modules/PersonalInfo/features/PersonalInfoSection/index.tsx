import { Fragment } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { CheckBoxField } from '@modules/PersonalInfo/features/PersonalInfoSection/CheckBoxField';
import { DocumentsNumberField } from '@modules/PersonalInfo/features/PersonalInfoSection/DocumetsNumberFields';
import { DrivingLicenceFields } from '@modules/PersonalInfo/features/PersonalInfoSection/DrivingLicenceFields';
import { GenderFields } from '@modules/PersonalInfo/features/PersonalInfoSection/GenderFields';
import { NameFields } from '@modules/PersonalInfo/features/PersonalInfoSection/NameFields';
import { NationalityField } from '@modules/PersonalInfo/features/PersonalInfoSection/Nationality';
import { PhotoField } from '@modules/PersonalInfo/features/PersonalInfoSection/PhotoField';
import { StudentFields } from '@modules/PersonalInfo/features/PersonalInfoSection/StudentFields';
import { TimeFromWorkStartDate } from '@modules/PersonalInfo/features/PersonalInfoSection/TimeFromWorkStartDate';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';

export const PersonalInfoSection = (): JSX.Element => {
  const { t } = useTranslation('employee-sidebar');
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);

  const selectedEmployeePersonalInfo = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.personalInfo
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);

  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? personalInfo : selectedEmployeePersonalInfo;

  return (
    <Fragment>
      <SharedSectionHeader title={t('routePersonalInfo')} subtitle={t('personalInfoSubtitle')} />
      <fieldset className={classNames('personal-info-fields-wrapper')}>
        <PhotoField />
        <NameFields />
        {isEditModeEnabled ? (
          <SharedDateSelector dateSelectorTitle={t('dateOfBirth')} namePrefix="dateOfBirth" />
        ) : (
          <SharedLabel title={t('dateOfBirth')}>
            <span>{(currentDataOrigin?.dateOfBirth as string) || '-'}</span>
          </SharedLabel>
        )}
        <GenderFields />
        <NationalityField />
        <DocumentsNumberField />
        <StudentFields />
        <DrivingLicenceFields />
        <TimeFromWorkStartDate />
        <CheckBoxField />
      </fieldset>
    </Fragment>
  );
};
