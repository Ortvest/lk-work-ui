import { Fragment } from 'react';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { useGetAllWorkCompaniesQuery } from '@global/api/work-company/work-company.api';

export const PrefferedCompaniesSection = (): JSX.Element => {
  const { register } = useFormContext();
  const { t } = useTranslation('employee-sidebar');

  useGetAllWorkCompaniesQuery(undefined);

  const companies = useTypedSelector((state) => state.workCompanyReducer.workCompanies);

  const options = companies.map((company) => ({
    value: company.name,
    label: company.name,
  }));

  return (
    <Fragment>
      <SharedSectionHeader
        title={t('whichCompanyWorkFor')}
        subtitle={t('indicatePreferences')}
      />
      <fieldset className={classNames('questionnaire-preffered-companies-fields-wrapper')}>
        <SharedLabel title={t('companiesSelectLabel')}>
          <SharedSelect {...register('whichCompanyDoYouWantWorkFor')} options={options} />
        </SharedLabel>
      </fieldset>
    </Fragment>
  );
};
