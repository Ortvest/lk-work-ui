import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import { SharedFileUpload } from '@shared/components/SharedFileUpload';
import { useTranslation } from 'react-i18next';

import './style.css';

export const UkrainianDocsFormBody = (): JSX.Element => {
  const { control } = useFormContext();
  const { t } = useTranslation('employee-sidebar');

  return (
    <fieldset className={classNames('ukrainian-docs-form-fields-wrapper')}>
      <Controller
        name="statementDocumentFileKey"
        control={control}
        render={({ field }) => (
          <SharedFileUpload
            title={t('ukrainianStatementFile')}
            onChange={(file) => field.onChange(file)}
          />
        )}
      />
    </fieldset>
  );
};
