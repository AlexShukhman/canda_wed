import React from 'react';
import {ManageRoutes} from "routes";
import {useLocation} from 'react-router-dom'
import { useRef, useEffect } from 'react';

import "style/app.scss";

// Hook
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export const App = () => {
  const location = useLocation();
  const prevLocation = usePrevious(location);

  useEffect(() => {
    if (location.pathname !== prevLocation?.pathname) {
      window.scrollTo(0, 0);
    }
  });

    return (
        <ManageRoutes/>
    );
}
