import { useNavigate } from 'react-router-dom';

import { UserSlice } from '@global/store/slices/User.slice';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';

export const EmployeersTable = (): JSX.Element => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { setUserAuthStatus, setUserAdminStatus } = UserSlice.actions;

  const onLogoutHanlder = (): void => {
    localStorage.clear();
    dispatch(setUserAuthStatus(false));
    dispatch(setUserAdminStatus(false));
    navigate('/');
  };
  return (
    <section>
      Employeers table
      <button onClick={onLogoutHanlder}>Log out</button>
    </section>
  );
};
