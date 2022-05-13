import { ReactNode } from 'react';
import { Spinner } from 'react-bootstrap';

export const FullLoader: React.FC<{
  children: ReactNode | JSX.Element;
  loading: boolean;
}> = ({ children, loading }) => {
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-coolGray-100 opacity-30">
          <Spinner animation="border" />
        </div>
      )}
      {children}
    </div>
  );
};
