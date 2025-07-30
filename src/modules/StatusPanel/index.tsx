import classNames from 'classnames';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { Status } from '@modules/StatusPanel/layout/Status';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedButton } from '@shared/components/SharedButton';

import './style.css';

import { UserRoles } from '@shared/enums/user.enums';

export const StatusPanel = (): JSX.Element => {
  const dispatch = useTypedDispatch();
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const { setIsEditModeEnabled } = CommonSlice.actions;

  const onEditModeToggleHanlder = (e: React.MouseEvent): void => {
    e.preventDefault();
    dispatch(setIsEditModeEnabled(true));
  };

  return (
    <section className={classNames('status-panel')}>
      <div className={classNames('status-panel-wrapper')}>
        <Status />
        {userRole !== UserRoles.EMPLOYEE &&
          (isEditModeEnabled ? (
            <SharedButton type="submit" text="Save" />
          ) : (
            <SharedButton type="button" text="Edit" onClick={onEditModeToggleHanlder} />
          ))}
      </div>
    </section>
  );
};
