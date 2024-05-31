import React, { useContext } from "react";
import { AuthContext } from "../../utilities/AuthProvider";

const UseAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default UseAuth;
