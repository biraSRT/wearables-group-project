import { createContext, useState } from "react";
import usePersistedState from '../hooks/use-persisted-state.hook';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [cart, setCart] = usePersistedState([]);

  return (
    <StoreContext.Provider value={{ cart, setCart }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
