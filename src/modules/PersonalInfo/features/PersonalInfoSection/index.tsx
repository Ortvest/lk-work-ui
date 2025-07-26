import { Fragment } from 'react';

import classNames from 'classnames';

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

export const PersonalInfoSection = (): JSX.Element => {
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);

  return (
    <Fragment>
      <SharedSectionHeader title="Personal info" subtitle="Niewielki opis funkcji strony" />
      <fieldset className={classNames('personal-info-fields-wrapper')}>
        <PhotoField />
        <NameFields />
        {isEditModeEnabled ? (
          <SharedDateSelector dateSelectorTitle="Date of Birth:*" namePrefix="dateOfBirth" />
        ) : (
          <SharedLabel title="Date of Birth:">
            <span>{(personalInfo?.dateOfBirth as string) || '-'}</span>
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
