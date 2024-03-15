import React, { Suspense } from 'react';

// project import
import PageLoader from './Loader/PageLoader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<PageLoader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
