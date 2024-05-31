import axios from "axios";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
const GoogleLogin = () => {
  const navigate = useNavigate();
  const { googleLogin } = UseAuth();
  // console.log("Google", googleLogin);
  const handleGoogle = () => {
    googleLogin()
      .then((userCredention) => {
        const user = userCredention.user;
        console.log("user :", user);
        if (user) {
          const userImp = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
            role: "user",
            gender: "Is not specified",
            address: "Is not specified",
            phone: "Is not specified",
          };
          if (user.email && user.displayName) {
            return axios
              .post(
                "https://dev-courses-rahul-server.onrender.com/api/new-user",
                userImp
              )
              .then(() => {
                navigate("/");
                return "registration Successfull";
              })
              .catch((error) => {
                throw new Error(error);
              });
          }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error: ", errorMessage);
      });
  };
  return (
    <div className="flex items-center justify-center my-3">
      <button
        onClick={() => handleGoogle()}
        className="flex items-center outline-none bg-white border border-gray-300 rounded-lg shadow-sm px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none"
      >
        <FcGoogle className="h-6 w-6 mr-2" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
