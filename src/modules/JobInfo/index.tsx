import { Fragment, useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { JobInfoFormBody } from '@modules/JobInfo/features/JobInfoFromBody';
import { JobInfoPreviewBody } from '@modules/JobInfo/features/JobInfoPreviewBody';
import { Sidebar } from '@modules/Sidebar';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { GlobalContainer } from '@shared/components/GlobalContainer';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserJobInfoMutation } from '@global/api/updateUserData/collectData.api';
import { UserRoles } from '@shared/enums/user.enums';
import { JobInfo } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';
import { datePartsParser } from '@shared/utils/datePartsParser';

export const JobInformation = (): JSX.Element => {
  const { t } = useTranslation('employee-sidebar');
  const jobInfo = useTypedSelector((state) => state.userReducer.user?.jobInfo);
  const selectedEmployeeJobInfo = useTypedSelector((state) => state.employeeReducer.selectedEmployee?.jobInfo);
  const employeeId = useTypedSelector((state) => state.employeeReducer.selectedEmployee?._id);

  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const [collectUserJobInfo] = useCollectUserJobInfoMutation();
  const dispatch = useTypedDispatch();
  const { setIsEditModeEnabled } = CommonSlice.actions;

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? jobInfo : selectedEmployeeJobInfo;

  const methods = useForm<JobInfo>({
    defaultValues: {
      company: currentDataOrigin?.company || '',
      position: currentDataOrigin?.position || '',
      employmentStartDate: datePartsParser(currentDataOrigin?.employmentStartDate),
      employmentEndDate: datePartsParser(currentDataOrigin?.employmentEndDate),
    },
  });

  const onSaveHandler = async (data: JobInfo): Promise<void> => {
    if (!employeeId) return;

    const parsedData: JobInfo = {
      ...data,
      employmentStartDate: dateParser(JSON.stringify(data.employmentStartDate!)),
      employmentEndDate: dateParser(JSON.stringify(data.employmentEndDate!)),
    };
    try {
      await collectUserJobInfo({ jobInfo: parsedData, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save job info:', error);
    }
  };

  useEffect(() => {
    if (currentDataOrigin) {
      methods.reset({
        company: currentDataOrigin.company || '',
        position: currentDataOrigin.position || '',
        employmentStartDate: datePartsParser(currentDataOrigin?.employmentStartDate),
        employmentEndDate: datePartsParser(currentDataOrigin?.employmentEndDate),
      });
    }
  }, [currentDataOrigin]);

  return (
    <Fragment>
      {userRole !== UserRoles.EMPLOYEE ? (
        <GlobalContainer>
          <Sidebar />
          <FormProvider {...methods}>
            <section className={classNames('job-info')}>
              <form className={classNames('job-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
                <StatusPanel />
                <SharedSectionHeader title={t('routeJobInfo')} subtitle={t('jobInfoSubtitle')} />
                {isEditModeEnabled ? <JobInfoFormBody /> : <JobInfoPreviewBody />}
              </form>
            </section>
          </FormProvider>
        </GlobalContainer>
      ) : (
        <FormProvider {...methods}>
          <section className={classNames('job-info')}>
            <form className={classNames('job-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
              <StatusPanel />
              <SharedSectionHeader title={t('routeJobInfo')} subtitle={t('jobInfoSubtitle')} />
              {isEditModeEnabled ? <JobInfoFormBody /> : <JobInfoPreviewBody />}
            </form>
          </section>
        </FormProvider>
      )}
    </Fragment>
  );
};
