import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { JobInfoFormBody } from '@modules/JobInfo/features/JobInfoFromBody';
import { JobInfoPreviewBody } from '@modules/JobInfo/features/JobInfoPreviewBody';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserJobInfoMutation } from '@global/api/updateUserData/collectData.api';
import { JobInfo } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';

export const JobInformation = (): JSX.Element => {
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const [collectUserJobInfo] = useCollectUserJobInfoMutation();
  const dispatch = useTypedDispatch();
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const methods = useForm<JobInfo>();

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

  return (
    <FormProvider {...methods}>
      <section className={classNames('job-info')}>
        <form className={classNames('job-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader title="Job Info" subtitle="Leave information about your work" />
          {isEditModeEnabled ? <JobInfoFormBody /> : <JobInfoPreviewBody />}
        </form>
      </section>
    </FormProvider>
  );
};
