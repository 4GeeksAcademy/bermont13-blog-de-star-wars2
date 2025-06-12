import { createContext, useContext, useReducer } from "react";
import storeReducer, { initialStore } from "../store.js";


const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, undefined, initialStore); // ✅ aquí va undefined

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

const useGlobalReducer = () => useContext(StoreContext);
export default useGlobalReducer;
