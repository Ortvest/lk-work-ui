import classNames from 'classnames';

import { Passport } from '@modules/Documents/features/PassportForm';
import { ResidenceCard } from '@modules/Documents/features/ResidenceCard';
import { StudentInfo } from '@modules/Documents/features/StudentInfo';
import { VisaInfo } from '@modules/Documents/features/VisaInfo';
import { WorkPermission } from '@modules/Documents/features/WorkPermissionForm';
import { StatusPanel } from '@modules/StatusPanel';

import './style.css';

export const Documents = (): JSX.Element => {
  return (
    <section className={classNames('documents')}>
      <StatusPanel />
      <Passport />
      <WorkPermission />
      <StudentInfo />
      <ResidenceCard />
      <VisaInfo />
    </section>
  );
};
