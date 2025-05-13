import React, { createContext, useContext, useState, ReactNode } from "react";
import { AstronautData } from "../utils/interfaces";

// Define the context type
interface AstronautsContextType {
  astronautsData: AstronautData[] | null;
  setAstronautsData: React.Dispatch<React.SetStateAction<AstronautData[] | null>>;
}

// Create the context
const AstronautsContext = createContext<AstronautsContextType | undefined>(undefined);

// Create a provider component
export const AstronautsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [astronautsData, setAstronautsData] = useState<AstronautData[] | null>(null);

  return (
    <AstronautsContext.Provider value={{ astronautsData, setAstronautsData }}>
      {children}
    </AstronautsContext.Provider>
  );
};

// Custom hook to use the context
export const useAstronauts = () => {
  const context = useContext(AstronautsContext);
  if (!context) {
    throw new Error("useAstronauts must be used within an AstronautsProvider");
  }
  return context;
};