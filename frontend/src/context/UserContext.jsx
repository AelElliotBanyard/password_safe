"use client";
import React, { createContext, useContext, useState } from "react";

const userContextDefaultValues = {
  setUser: () => {},
  user: {},
};

export const UserContext = createContext(userContextDefaultValues);

export function useUserContext() {
  return useContext(UserContext);
}
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const value = {
    user,
    setUser,
  };
  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
};

export default UserProvider;
