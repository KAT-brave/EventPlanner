"use client";

import { createContext, useContext, useState, useCallback } from "react";

type FlashType = "success" | "error";

type Flash = {
  message: string;
  type: FlashType;
} | null;

type FlashContextType = {
  flash: Flash;
  showFlash: (message: string, type?: FlashType) => void;
};

const FlashContext = createContext<FlashContextType | undefined>(undefined);

export function FlashProvider({ children }: { children: React.ReactNode }) {
  const [flash, setFlash] = useState<Flash>(null);

  const showFlash = useCallback((message: string, type: FlashType = "success") => {
    setFlash({ message, type });
    setTimeout(() => setFlash(null), 3000);
  }, []);

  return (
    <FlashContext.Provider value={{ flash, showFlash }}>
      {children}
    </FlashContext.Provider>
  );
}

export function useFlash() {
  const context = useContext(FlashContext);
  if (!context) throw new Error("useFlash must be used within FlashProvider");
  return context;
}
