import { Fragment } from 'react';

import classNames from 'classnames';

import { CheckBoxField } from '@modules/Questionnaire/features/PersonalInfoSection/CheckBoxField';
import { DocumentsNumberField } from '@modules/Questionnaire/features/PersonalInfoSection/DocumetsNumberFields';
import { DrivingLicenceFields } from '@modules/Questionnaire/features/PersonalInfoSection/DrivingLicenceFields';
import { GenderFields } from '@modules/Questionnaire/features/PersonalInfoSection/GenderFields';
import { NameFields } from '@modules/Questionnaire/features/PersonalInfoSection/NameFields';
import { NationalityField } from '@modules/Questionnaire/features/PersonalInfoSection/Nationality';
import { StudentFields } from '@modules/Questionnaire/features/PersonalInfoSection/StudentFields';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

export const PersonalInfoSection = (): JSX.Element => {
  return (
    <Fragment>
      <SharedSectionHeader title="Questionnaire" subtitle="Niewielki opis funkcji strony" />
      <fieldset className={classNames('questionnaire-fields-wrapper')}>
        <NameFields />
        <SharedDateSelector dateSelectorTitle="Date of Birth:*" namePrefix="dateOfBirth" />
        <GenderFields />
        <NationalityField />
        <DocumentsNumberField />
        <StudentFields />
        <DrivingLicenceFields />
        <CheckBoxField />
      </fieldset>
    </Fragment>
  );
};
