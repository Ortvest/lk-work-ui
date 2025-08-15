import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { SharedFileUpload } from '@shared/components/SharedFileUpload';

import './style.css';

export const UkrainianDocsFormBody = (): JSX.Element => {
  const { control } = useFormContext();

  return (
    <fieldset className={classNames('ukrainian-docs-form-fields-wrapper')}>
      <Controller
        name="statementDocumentFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload
            title="Add a Scan or Photo of ukrainian statement document"
            onChange={(file) => field.onChange(file)}
          />
        )}
      />
    </fieldset>
  );
};
