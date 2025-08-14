import { Fragment } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { useGetAllWorkCompaniesQuery } from '@global/api/work-company/work-company.api';

export const PrefferedCompaniesSection = (): JSX.Element => {
  const { register } = useFormContext();

  useGetAllWorkCompaniesQuery(undefined);

  const companies = useTypedSelector((state) => state.workCompanyReducer.workCompanies);

  const options = companies.map((company) => ({
    value: company.name,
    label: company.name,
  }));

  return (
    <Fragment>
      <SharedSectionHeader
        title="Which company do you want to work for?"
        subtitle="Indicate your preferences, choose one or more companies"
      />
      <fieldset className={classNames('questionnaire-preffered-companies-fields-wrapper')}>
        <SharedLabel title="Select companies:*">
          <SharedSelect {...register('whichCompanyDoYouWantWorkFor')} options={options} />
        </SharedLabel>
      </fieldset>
    </Fragment>
  );
};
