import { RouterProvider } from 'react-router-dom';

import { router } from '@global/router/router';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import '@shared/config/style-config.css';

function App(): JSX.Element {
  const { isAuth } = useTypedSelector((state) => state.userReducer);

  const currentRouter = router(isAuth);

  return <RouterProvider router={currentRouter} />;
}

export default App;
