import { createRoot } from 'react-dom/client';

import './global/i18n/index';
import { App } from './App';
import { Providers } from './Providers';

createRoot(document.getElementById('root')!).render(
  <Providers>
    <App />
  </Providers>
);
