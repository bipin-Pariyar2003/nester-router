import React, { createContext, useState, useContext, useEffect } from "react";
import database from "../assets/data";

const NameContext = createContext();

export const NameProvider = ({ children }) => {
  const [selectedName, setSelectedName] = useState("");
  const [nameSet, setNameSet] = useState(new Set());

  useEffect(() => {
    // Get unique names from database
    const names = new Set();
    database.data.forEach((day) => {
      day.entries.forEach((entry) => {
        names.add(entry.staffName);
      });
    });
    setNameSet(names);
  }, []);

  const value = {
    selectedName,
    setSelectedName,
    nameSet,
  };

  return <NameContext.Provider value={value}>{children}</NameContext.Provider>;
};

export const useName = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error("useName must be used within a NameProvider");
  }
  return context;
};
