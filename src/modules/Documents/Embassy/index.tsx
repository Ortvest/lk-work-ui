import { useState } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { EmbassyFormBody } from '@modules/Documents/Embassy/features/EmbassyFormBody';
import { StatusPanel } from '@modules/StatusPanel';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { EmbassyData } from '@shared/interfaces/DocumentsData.interfaces';

export const Embassy = (): JSX.Element => {
  const [formBodies, setFormBodies] = useState<number[]>([0]);

  const methods = useForm<EmbassyData>();

  const onSaveHandler = (data: EmbassyData): void => {
    console.log(data);
  };

  const onAddFormBodyHandler = (): void => {
    setFormBodies((prev) => [...prev, prev.length]);
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('embassy')}>
        <form className={classNames('embassy-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader title="Embassy" subtitle="Leave information about your work" />
          {formBodies.map((index: number) => (
            <EmbassyFormBody key={index} />
          ))}
          <div className={classNames('embassy-button-wrapper')}>
            <button className={classNames('embassy-button')} onClick={onAddFormBodyHandler}>
              + Add a document
            </button>
          </div>
        </form>
      </section>
    </FormProvider>
  );
};
