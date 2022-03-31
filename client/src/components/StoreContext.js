import { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  return (
    <StoreContext.Provider value={{ cart, setCart }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
