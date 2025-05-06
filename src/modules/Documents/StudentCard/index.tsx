import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { StudentCardFormBody } from '@modules/Documents/StudentCard/features/StudentCardFormBody';
import { StatusPanel } from '@modules/StatusPanel';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { StudentCardData } from '@shared/interfaces/DocumentsData.interfaces';

export const StudentCard = (): JSX.Element => {
  const methods = useForm<StudentCardData>();

  const onSaveHandler = (data: StudentCardData): void => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('student-card')}>
        <form className={classNames('student-card-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader
            title="Student Card"
            subtitle="Leave a photo of the document. Make sure the document is in good quality."
          />
          <StudentCardFormBody />
        </form>
      </section>
    </FormProvider>
  );
};
