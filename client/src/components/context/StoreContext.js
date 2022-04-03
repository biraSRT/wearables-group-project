import { createContext, useState } from "react";
import usePersistedState from '../hooks/use-persisted-state.hook';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [cart, setCart] = usePersistedState([]);
  const [purchased, setPurchased] = useState(false);

  return (
    <StoreContext.Provider value={{ cart, setCart, purchased, setPurchased }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
