import { useState } from 'react';

import { RouterProvider } from 'react-router-dom';

import { router } from '@global/router/router';

import '@shared/config/style-config.css';

function App(): JSX.Element {
  const [authed] = useState(false);

  const currentRouter = router(authed);

  return <RouterProvider router={currentRouter} />;
}

export default App;
