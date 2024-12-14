'use client'

import React, { createContext, useState, useContext } from "react";

// Create the Context
const AppContext = createContext();

// Create a Provider Component
export const ContextProvider = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  return (
    <AppContext.Provider value={{ isSettingsOpen, toggleSettings }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook for using the context
export const useAppContext = () => useContext(AppContext);
