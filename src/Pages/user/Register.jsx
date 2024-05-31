import React from "react";
import {
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlinePicture,
  AiOutlineUser,
} from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../utilities/AuthProvider";
import GoogleLogin from "../../Components/google/GoogleLogin";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const { signUp, updateUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const onSubmit = (data) => {
    // console.log("data:", data);
    signUp(data.email, data.password).then((res) => {
      const user = res.user;
      // console.log("user:", user);
      if (user) {
        return updateUser(data.name, data.image)
          .then(() => {
            const userImp = {
              name: user?.displayName,
              email: user?.email,
              image: user?.photoURL,
              role: "user",
              gender: data.gender,
              phone: data.phone,
              address: data.address,
            };
            if (user.email && user.displayName) {
              return axios
                .post(
                  "https://dev-courses-rahul-server.onrender.com/api/new-user",
                  userImp
                )
                .then(() => {
                  navigate("/");
                  return "Registration Successful";
                })
                .catch((err) => {
                  throw new Error(err);
                });
            }
          })
          .catch((err) => {
            setError(err.code);
            throw new Error(err);
          });
      }
    });
  };

  return (
    <div className="justify-center flex items-center pt-14 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-secondary">
          Register Here!
        </h2>

        {/* Main Form data start from here */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineUser className="inline-block mr-2 mb-2 text-lg" />
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Name..."
                {...register("name", { required: true })}
                className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              {/* Email div  */}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineMail className="inline-block mr-2 mb-2 text-lg" />
                Email
              </label>
              <input
                type="text"
                placeholder="Enter Your Email..."
                {...register("email", { required: true })}
                className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          {/* 2nd line for password and confirm pass owrd starts here */}
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineLock className="inline-block mr-2 mb-2 text-lg" />
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Your Password..."
                {...register("password", { required: true })}
                className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              {/* Confirm pass div  */}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmpassword"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineLock className="inline-block mr-2 mb-2 text-lg" />
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Your Password"
                {...register("confirmpassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "Password doesn't match",
                })}
                className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          {/* 3rd Line start from here  */}

          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlinePhone className="inline-block mr-2 mb-2 text-lg" />
                Phone Number
              </label>
              <input
                type="number"
                placeholder="Enter Your 📱 number"
                {...register("phone", { required: true })}
                className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              {/* Photo URL */}
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlinePicture className="inline-block mr-2 mb-2 text-lg" />
                Photo URL
              </label>
              <input
                type="text"
                placeholder="submit your Pic URL"
                {...register("image", { required: true })}
                className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          {/* 4th Line Start From herer */}
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 font-bold mb-2"
            >
              <AiOutlineUser className="inline-block mr-2 mb-2 text-lg" />
              Gender
            </label>
            <select
              {...register("gender", { required: true })}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">other</option>
            </select>
          </div>

          {/* 5th Line Start From herer */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              <CiLocationOn className="inline-block mr-2 mb-2 text-lg" />
              Address
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              {...register("address", { required: true })}
              rows="3"
              placeholder="Enter Your Address"
            />
          </div>

          {/* Submit button  */}
          <div className="text-center">
            <button
              // className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-red-500"
              className="block w-full rounded-lg bg-primary hover:bg-secondary focus:outline-none focus:ring-2 transition duration-300 ease-in-out px-5 py-3 text-sm font-medium text-white"
              type="submit"
            >
              Submit
            </button>
            {/* {errors && (
              <div className="text-red-500 text-sm w-full mt-1">
                <p>Check your Password!</p>
              </div>
            )} */}
            {errors.confirmpassword && (
              <div className="text-red-500 text-sm w-full mt-1">
                <p>{errors.confirmpassword.message}</p>
              </div>
            )}
          </div>
        </form>
        <p className="text-center mt-4">
          Already Have an accoutn?{" "}
          <Link to="/login" className="text-primary underline">
            Login here
          </Link>
        </p>

        {/* Google Login start from here  */}
        <div>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
