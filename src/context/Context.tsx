import React, { createContext, FC, useState, useRef } from "react";

export const Context = createContext<{
  revolve: boolean;
  setRevolve: (a: boolean) => void;
  rotate: boolean;
  setRotate: (a: boolean) => void;
}>({
  revolve: true,
  setRevolve: () => {},
  rotate: true,
  setRotate: () => {},
});

const ContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [revolve, setRevolve] = useState(true);
  const [rotate, setRotate] = useState(true);

  const value = {
    revolve,
    setRevolve,
    rotate,
    setRotate,
  };
  return (
    <>
      <Context.Provider value={value}>{children}</Context.Provider>
    </>
  );
};

export default ContextProvider;
