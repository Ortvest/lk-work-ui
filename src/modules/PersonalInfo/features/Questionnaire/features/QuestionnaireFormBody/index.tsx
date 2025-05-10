import { Fragment } from 'react';

import classNames from 'classnames';

import { CheckBoxField } from '@modules/PersonalInfo/features/PersonalInfoSection/CheckBoxField';
import { DocumentsNumberField } from '@modules/PersonalInfo/features/PersonalInfoSection/DocumetsNumberFields';
import { DrivingLicenceFields } from '@modules/PersonalInfo/features/PersonalInfoSection/DrivingLicenceFields';
import { GenderFields } from '@modules/PersonalInfo/features/PersonalInfoSection/GenderFields';
import { NameFields } from '@modules/PersonalInfo/features/PersonalInfoSection/NameFields';
import { NationalityField } from '@modules/PersonalInfo/features/PersonalInfoSection/Nationality';
import { Student } from '@modules/PersonalInfo/features/Questionnaire/features/Student';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

export const QuestionnaireFormBody = (): JSX.Element => {
  return (
    <Fragment>
      <SharedSectionHeader title="Questionnaire" subtitle="Niewielki opis funkcji strony" />
      <fieldset className={classNames('personal-info-fields-wrapper')}>
        <NameFields />
        <SharedDateSelector dateSelectorTitle="Date of Birth:*" namePrefix="dateOfBirth" />
        <GenderFields />
        <NationalityField />
        <DocumentsNumberField />
        <Student />
        <DrivingLicenceFields />
        <CheckBoxField />
      </fieldset>
    </Fragment>
  );
};
