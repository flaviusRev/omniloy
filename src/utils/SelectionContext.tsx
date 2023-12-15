/** @format */

// SelectionContext.tsx

import React, { useState, useContext, createContext } from "react";

// Define the shape of the context data
interface SelectionContextData {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

// Create context with a default value
const SelectionContext = createContext<SelectionContextData>({
  selectedOption: "Dashboard",
  setSelectedOption: () => {},
});

// Create a provider component
export const SelectionProvider = ({ children }: any) => {
  const [selectedOption, setSelectedOption] = useState("Dashboard");

  return (
    <SelectionContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </SelectionContext.Provider>
  );
};

// Create a custom hook to use the context
export const useSelection = () => {
  return useContext(SelectionContext);
};
