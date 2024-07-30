import React, { createContext, useContext } from "react";

import Store from "./store";

/* 
CONTEXT / PROVIDER INIT
*/
interface StoreProviderProps {
    children: React.ReactNode;
}

const UserStoreContext = createContext<Store | null>(null);

export const StoreProvider: React.FC<StoreProviderProps> = (props) => {
  const { children } = props;

  return (
    <UserStoreContext.Provider value={new Store()}>
      {children}
    </UserStoreContext.Provider>
  );
};

/* 
HOOK DEFINITION
*/

export const useUserStore = () => useContext(UserStoreContext);
