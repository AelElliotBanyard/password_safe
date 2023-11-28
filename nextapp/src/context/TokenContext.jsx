"use client";

import { Token } from "@/types/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/utils/api";

const tokenContextDefaultValues = {
  setToken: () => {},
};

export const TokenContext = createContext(tokenContextDefaultValues);

export function useTokenContext() {
  return useContext(TokenContext);
}
const TokenProvider = ({ children }) => {
  const [token, setToken] = useState < Token > null;

  useEffect(() => {
    if (!token) {
      return;
    }

    const tenMinutesInMs = 10 * 60 * 1000;
    const id = setInterval(() => {
      api.verify(setToken);
    }, tenMinutesInMs);
    return () => {
      clearInterval(id);
    };
  }, [token]);

  const value = {
    setToken,
  };
  return (
    <>
      <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
    </>
  );
};

export default TokenProvider;
