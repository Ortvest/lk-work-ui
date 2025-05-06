import { Fragment } from 'react';

import classNames from 'classnames';

import { CheckBoxField } from '@modules/PersonalInfo/features/PersonalInfoSection/CheckBoxField';
import { CitizenshipField } from '@modules/PersonalInfo/features/PersonalInfoSection/Citizenship';
import { DocumentsNumberField } from '@modules/PersonalInfo/features/PersonalInfoSection/DocumetsNumberFields';
import { DrivingLicenceFields } from '@modules/PersonalInfo/features/PersonalInfoSection/DrivingLicenceFields';
import { GenderFields } from '@modules/PersonalInfo/features/PersonalInfoSection/GenderFields';
import { NameFields } from '@modules/PersonalInfo/features/PersonalInfoSection/NameFields';
import { PhotoField } from '@modules/PersonalInfo/features/PersonalInfoSection/PhotoField';
import { StudentFields } from '@modules/PersonalInfo/features/PersonalInfoSection/StudentFields';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

export const PersonalInfoSection = (): JSX.Element => {
  return (
    <Fragment>
      <SharedSectionHeader title="Personal info" subtitle="Niewielki opis funkcji strony" />
      <fieldset className={classNames('personal-info-fields-wrapper')}>
        <PhotoField />
        <NameFields />
        <SharedDateSelector dateSelectorTitle="Date of Birth:*" namePrefix="dateOfBirth" />
        <GenderFields />
        <CitizenshipField />
        <DocumentsNumberField />
        <StudentFields />
        <DrivingLicenceFields />
        <CheckBoxField />
      </fieldset>
    </Fragment>
  );
};
