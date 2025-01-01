import React, { createContext, useState } from "react";

// Create Context
const Idcontext = createContext();

// Create Provider Component
export const IdcontextProvider = ({ children }) => {
  const [paramid, setparamid] = useState(null);

  return (
    <Idcontext.Provider value={{ paramid, setparamid }}>
      {children}
    </Idcontext.Provider>
  );
};

export default Idcontext;
