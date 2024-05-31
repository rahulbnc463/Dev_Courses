import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../Components/google/GoogleLogin";
import UseAuth from "../../hooks/UseAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const { logIn, error, setError, loader, setLoader } = UseAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);
    // console.log(formData);
    logIn(formData.email, formData.password)
      .then(() => {
        navigate(location.state?.form || "/api/classes");
      })
      .catch((err) => {
        setError(err.code);
        setLoader(false);
      });
  };

  return (
    <div className="mx-auto max max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-secondary sm:text-3xl text-center">
        Get Started Today
      </h1>
      <p className="text-primary mx-auto mt-4 max-w-md text-center">
        Login to your account and explore the platform
      </p>
      <div className="mx-auto max-w-lg mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-center text-secondary text-lg font-medium">
            Sign in to your account
          </p>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <MdOutlineAlternateEmail className="h-4 w-4 text-gray-400" />
              </span>
            </div>
          </div>

          {/* Password  */}
          <div>
            <label htmlFor="email" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your Password"
                className="w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                required
              />
              <span
                className="absolute inset-y-0 end-0 grid place-content-center px-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-4 w-4 text-gray-400" />
                ) : (
                  <AiOutlineEye className="h-4 w-4 text-gray-400" />
                )}
              </span>
            </div>
          </div>

          {/* sign in button  */}
          <button
            type="submit"
            className="block w-full rounded-lg bg-primary hover:bg-secondary focus:outline-none focus:ring-2 transition duration-300 ease-in-out px-5 py-3 text-sm font-medium text-white"
          >
            Sign In
          </button>
          <p className="text-center text-sm text-gray-500">
            Don't have account?{" "}
            <Link className="underline" to="/register">
              Register
            </Link>
          </p>
        </form>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
