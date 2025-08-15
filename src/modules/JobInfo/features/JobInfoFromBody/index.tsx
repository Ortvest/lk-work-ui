import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { useGetAllWorkCompaniesQuery } from '@global/api/work-company/work-company.api';
import { positions } from '@shared/mocks/JobInfo.mocks';

export const JobInfoFormBody = (): JSX.Element => {
  const { register } = useFormContext();
  useGetAllWorkCompaniesQuery(undefined);

  const companies = useTypedSelector((state) => state.workCompanyReducer.workCompanies);

  const options = companies.map((company) => ({
    value: company.name,
    label: company.name,
  }));

  return (
    <fieldset className={classNames('job-info-form-fields-wrapper')}>
      <SharedLabel title="Company:">
        <SharedSelect {...register('company')} options={options} />
      </SharedLabel>
      <SharedLabel title="Position:">
        <SharedSelect {...register('position')} options={positions} />
      </SharedLabel>
      <SharedDateSelector dateSelectorTitle="Date of Commencement:" namePrefix="employmentStartDate" />
      <SharedDateSelector dateSelectorTitle="Date of Completion:" namePrefix="employmentEndDate" />
    </fieldset>
  );
};
