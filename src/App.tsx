
import { RouterProvider } from 'react-router-dom';

import { router } from '@global/router/router';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import '@shared/config/style.config.css';

export const App = (): JSX.Element => {

  const authed = useTypedSelector((state) => state.userReducer.isAuth);

  const currentRouter = router(Boolean(authed), false);

  return <RouterProvider router={currentRouter} key={String(authed)} />;
};
