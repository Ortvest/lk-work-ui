import classNames from 'classnames';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { Status } from '@modules/StatusPanel/layout/Status';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedButton } from '@shared/components/SharedButton';

import './style.css';

export const StatusPanel = (): JSX.Element => {
  const dispatch = useTypedDispatch();
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;

  const onEditModeToggleHanlder = (e: React.MouseEvent): void => {
    e.preventDefault();
    dispatch(setIsEditModeEnabled(true));
  };

  return (
    <section className={classNames('status-panel')}>
      <div className={classNames('status-panel-wrapper')}>
        <Status />
        {isEditModeEnabled ? (
          <SharedButton type="submit" text="Save" />
        ) : (
          <SharedButton type="button" text="Edit" onClick={(e) => onEditModeToggleHanlder(e)} />
        )}
      </div>
    </section>
  );
};
