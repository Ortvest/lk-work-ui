import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';

import './style.css';

interface EmbassyFormBodyProps {
  index: number;
}

export const EmbassyFormBody = ({ index }: EmbassyFormBodyProps): JSX.Element => {
  const { control } = useFormContext();

  return (
    <fieldset className={classNames('embassy-form-fields-wrapper')}>
      <Controller
        name={`documents.${index}.embassyFirstDocumentPhoto`}
        control={control}
        render={({ field }) => <SharedFileUpload onChange={(file) => field.onChange(file)} />}
      />
      <Controller
        name={`documents.${index}.embassySecondDocumentPhoto`}
        control={control}
        render={({ field }) => <SharedFileUpload onChange={(file) => field.onChange(file)} />}
      />
      <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix={`documents.${index}.embassyDateOfIssue`} />
    </fieldset>
  );
};
