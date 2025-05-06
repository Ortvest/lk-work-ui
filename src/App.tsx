import { RouterProvider } from 'react-router-dom';

import { router } from '@global/router/router';

//import { useTypedSelector } from '@shared/hooks/useTypedSelector';
import '@shared/config/style.config.css';

export const App = (): JSX.Element => {
  const authed = true;
  const isAdmin = false;
  const currentRouter = router(authed, isAdmin);

  return <RouterProvider router={currentRouter} key={authed.toString()} />;
};
