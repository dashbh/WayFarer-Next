"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext } from "react";

// Define context type
type UpdateParamsContextType = {
  updateParams: (key: string, value: string | number) => void;
  resetFilters: () => void;
  searchParams: URLSearchParams;
};

// Create Context with default values
export const UpdateParamsContext = createContext<UpdateParamsContextType>({
  searchParams: new URLSearchParams(""),
  updateParams: () => {},
  resetFilters: () => {},
});

// Hook to use the context
export const useUpdateParams = () => useContext(UpdateParamsContext);

// Client-side provider to manage search params
const UpdateParamsProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateParams = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }

    router.replace(`?${params.toString()}`);
  };

  const resetFilters = () => {
    router.replace("?");
  }

  return (
    <UpdateParamsContext.Provider value={{ updateParams, resetFilters, searchParams }}>
      {children}
    </UpdateParamsContext.Provider>
  );
};

export default UpdateParamsProvider;
