import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { SharedBooleanSelector } from '@shared/components/SharedBooleanSelector';

import './style.css';

export const StudentFields = (): JSX.Element => {
  const { t } = useTranslation('employee-sidebar');

  return (
    <div className={classNames('questionnaire-student-info-wrapper')}>
      <SharedBooleanSelector name="isStudent" label={t('student')} />
    </div>
  );
};
