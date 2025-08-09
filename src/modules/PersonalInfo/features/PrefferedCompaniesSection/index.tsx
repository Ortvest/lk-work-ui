import { Fragment } from 'react';

import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedLabel } from '@shared/components/SharedLabel';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';
import { SharedSelect } from '@shared/components/SharedSelect';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';
import { companies } from '@shared/mocks/JobInfo.mocks';

export const PrefferedCompaniesSection = (): JSX.Element => {
  const { register } = useFormContext();
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);

  const selectedEmployeePersonalInfo = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.personalInfo
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);

  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? personalInfo : selectedEmployeePersonalInfo;

  return (
    <Fragment>
      <SharedSectionHeader
        title="Which company do you want to work for?"
        subtitle="Indicate your preferences, choose one or more companies"
      />
      <fieldset className={classNames('preffered-companies-fields-wrapper')}>
        {isEditModeEnabled ? (
          <SharedLabel title="Select companies:*">
            <SharedSelect {...register('whichCompanyDoYouWantWorkFor')} options={companies} />
          </SharedLabel>
        ) : (
          <SharedLabel title="Companies:">
            {currentDataOrigin?.whichCompanyDoYouWantWorkFor
              ? currentDataOrigin?.whichCompanyDoYouWantWorkFor?.map((company, index: number) => (
                  <span className={classNames('preffered-companies-text')} key={index}>
                    {company}
                  </span>
                ))
              : '-'}
            <span></span>
          </SharedLabel>
        )}
      </fieldset>
    </Fragment>
  );
};
