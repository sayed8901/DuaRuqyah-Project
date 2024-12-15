"use client";

import React, { createContext, useState, useContext } from "react";

// Create the Context
const AppContext = createContext();

// Create a Provider Component
export const ContextProvider = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  const setSidebarOpen = (value) => {
    setIsSidebarOpen(value);
  };

  return (
    <AppContext.Provider
      value={{ isSettingsOpen, toggleSettings, isSidebarOpen, setSidebarOpen }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook for using the context
export const useAppContext = () => useContext(AppContext);
