/** @format */

import React, { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";

export const CurrentPathContext = createContext({
  currentPath: "",
  setCurrentPath: () => {},
});

export const CurrentPathProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const location = useLocation();

  useEffect(() => {
    // Update currentPath when the location changes
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <CurrentPathContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </CurrentPathContext.Provider>
  );
};
