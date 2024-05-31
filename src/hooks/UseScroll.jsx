import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const UseScroll = () => {
  const { pathName } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);
};

export default UseScroll;
