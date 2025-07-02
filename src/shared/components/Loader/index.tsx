import { ReactNode } from 'react';

import './styles.css';

export const Loader = (): ReactNode => {
  return (
    <div className="loader-container">
      <div className="loader-ring" />
    </div>
  );
};
