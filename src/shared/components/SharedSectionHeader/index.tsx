import classNames from 'classnames';

import './style.css';

interface SharedSectionHeaderProps {
  title: string;
  subtitle: string;
}
export const SharedSectionHeader = ({ title, subtitle }: SharedSectionHeaderProps): JSX.Element => {
  return (
    <div className={classNames('shared-header-wrapper')}>
      <header className={classNames('shared-section-header')}>
        <h2 className={classNames('shared-section-title')}>{title}</h2>
        <p className={classNames('shared-section-subtitle')}>{subtitle}</p>
      </header>
    </div>
  );
};
