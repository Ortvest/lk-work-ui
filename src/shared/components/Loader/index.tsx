import { ReactNode } from 'react';

import './styles.css';

interface LoaderProps {
  width?: number;
  height?: number;
}
export const Loader = ({ width, height }: LoaderProps): ReactNode => {
  return (
    <div className="loader-container">
      <div style={{ width: `${width}px`, height: `${height}px` }} className="loader-ring" />
    </div>
  );
};
