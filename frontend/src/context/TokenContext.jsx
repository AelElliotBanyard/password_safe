"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/utils/api";

const tokenContextDefaultValues = {
  setToken: () => {},
  token: null,
};

export const TokenContext = createContext(tokenContextDefaultValues);

export function useTokenContext() {
  return useContext(TokenContext);
}
const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const value = {
    token,
    setToken,
  };
  return (
    <>
      <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
    </>
  );
};

export default TokenProvider;
