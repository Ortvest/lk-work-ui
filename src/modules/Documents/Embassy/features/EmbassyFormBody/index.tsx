import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { SharedDateSelector } from '@shared/components/SharedDateSelector';
import { SharedFileUpload } from '@shared/components/SharedFileUpload';

import './style.css';

export const EmbassyFormBody = (): JSX.Element => {
  const { register } = useFormContext();

  return (
    <fieldset className={classNames('embassy-form-fields-wrapper')}>
      <SharedFileUpload {...register('firstDocumentPhoto')} />
      <SharedFileUpload {...register('secondDocumentPhoto')} />
      <SharedDateSelector dateSelectorTitle="Date of issue:*" namePrefix="dateOfIssue" />
    </fieldset>
  );
};
