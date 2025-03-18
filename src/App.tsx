import { useState } from 'react';

import { RouterProvider } from 'react-router-dom';

import { router } from '@global/router/router';

import '@shared/config/style.config.css';

export const App = (): JSX.Element => {
  const [authed] = useState(true);

  const currentRouter = router(authed);

  return <RouterProvider router={currentRouter} />;
};
