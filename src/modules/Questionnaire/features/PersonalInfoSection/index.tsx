import { Fragment } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['employee-sidebar', 'questionnaire']);

  return (
    <Fragment>
      <SharedSectionHeader title={t('questionnaire:title')} subtitle={t('questionnaire:subtitle')} />
      <fieldset className={classNames('questionnaire-fields-wrapper')}>
        <NameFields />
        <SharedDateSelector dateSelectorTitle={t('dateOfBirth')} namePrefix="dateOfBirth" />
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
