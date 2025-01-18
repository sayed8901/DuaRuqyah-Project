"use client";

import React, { createContext, useState, useContext } from "react";

// Create the Context
const AppContext = createContext();

// Create a Provider Component
export const ContextProvider = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState("english"); // Default language is English

  // to toggle settings panel open-close
  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  // to toggle category sidebar panel open-close
  const setSidebarOpen = (value) => {
    setIsSidebarOpen(value);
  };

  // Toggle language between English and Bangla
  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <AppContext.Provider
      value={{
        isSettingsOpen,
        toggleSettings,
        isSidebarOpen,
        setSidebarOpen,
        language,
        toggleLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook for using the context
export const useAppContext = () => useContext(AppContext);
