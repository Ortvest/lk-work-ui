import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import { StudentInfoData } from '@shared/interfaces/DocumentsData.interfaces';

export const StudentInfo = (): JSX.Element => {
  const methods = useForm<StudentInfoData>();

  const onSaveHandler = (data: StudentInfoData): void => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <section className="student-info">
        <form className={classNames('student-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <SharedSectionHeader title="Student info" subtitle="Leave a photo of the document." />
          <fieldset className={classNames('documents-form-fields-wrapper')}>
            <SharedFileUpload {...methods.register('studentInfoFile')} />
            <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="dateOfIssue" />
          </fieldset>
        </form>
      </section>
    </FormProvider>
  );
};
