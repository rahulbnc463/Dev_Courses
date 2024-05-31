import React from "react";
import axios from "axios";
import { useEffect } from "react";

const UseFetch = () => {
  const instance = axios.create({
    baseURL: "https://dev-courses-rahul-server.onrender.com",
  });

  useEffect(() => {
    //Request Interceptor
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    //Response Interceptor
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.request.eject(responseInterceptor);
    };
  }, [instance]);
  return instance;
};

export default UseFetch;
