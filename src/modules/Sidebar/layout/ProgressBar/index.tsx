import classNames from 'classnames';

import './style.css';

interface ProgressBarProps {
  currentProgress: number;
  totalProgress: number;
}

export const ProgressBar = ({ currentProgress, totalProgress }: ProgressBarProps): JSX.Element => {
  const progressValue = (currentProgress / totalProgress) * 100;

  return (
    <div className={classNames('progress-bar')}>
      <header className={classNames('progress-bar-header')}>
        <h4 className={classNames('progress-bar-title')}>Questionnaire</h4>
        <p className={classNames('progress-bar-numbers')}>
          {currentProgress} out of {totalProgress}
        </p>
      </header>
      <div className={classNames('progress-bar-line')}>
        <div className={classNames('progress-bar-value')} style={{ width: `${progressValue}%` }} />
      </div>
    </div>
  );
};
