import { createContext, useContext, useState, ReactNode } from "react";

type FiltersContextType = {
  search: string;
  status: string;
  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
};

const FiltersContext = createContext<FiltersContextType | null>(null);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  return (
    <FiltersContext.Provider value={{ search, status, setSearch, setStatus }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context)
    throw new Error("useFilters must be used within a FiltersProvider");
  return context;
};
