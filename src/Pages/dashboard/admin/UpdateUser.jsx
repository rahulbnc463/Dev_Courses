import React from "react";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import UseAuth from "../../../hooks/UseAuth";
import UseSecurity from "../../../hooks/UseSecurity";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const navigate = useNavigate();
  const axiosSecure = UseSecurity();
  const { user } = UseAuth();
  const userCredential = useLoaderData();
  // console.log("userCredential:", userCredential);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updateData = Object.fromEntries(formData);
    // console.log("updateData:", updateData);
    axiosSecure
      .put(`/api/update-user/${userCredential?._id}`, updateData)
      .then((res) => {
        let timerInterval;
        Swal.fire({
          title: "Please wait......🚀",
          html: "User Status Updating in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            navigate("/dashboard/manageUser");
          }
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full md:max-w-md lg:max-w-full"
      >
        <h1 className="font-semibold text-center text-4xl mb-6">
          Welcome : <span className="text-secondary"> {user?.displayName}</span>
        </h1>

        {/* Name  */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={userCredential?.name ? userCredential?.name : ""}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Assistant"
          />
        </div>
        {/* Email  */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={userCredential?.email ? userCredential?.email : ""}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="help.yourassistant@gmail.com"
          />
          <p className="text-red-500 text-xs mt-1">
            Update email is not recommended. Please leave it default.
          </p>
        </div>
        {/* Address  */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Address</label>
          <input
            type="text"
            name="address"
            defaultValue={
              userCredential?.address ? userCredential?.address : ""
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Is not Provided"
          />
        </div>
        {/* Phone  */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            defaultValue={userCredential?.phone ? userCredential?.phone : ""}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Is not Provided"
          />
        </div>
        {/* skills  */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Skills</label>
          <input
            type="text"
            name="skills"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Skills"
          />
          <p className="text-red-500 text-xs mt-1">
            If the user is an instructor, then set skills; otherwise, leave it
            empty.
          </p>
        </div>
        {/* Image  */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Image</label>
          <input
            type="text"
            name="image"
            defaultValue={userCredential?.image ? userCredential?.image : ""}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://lh3.googleusercontent.com/a/ACg8ocJREvU6wmpe6inZaMcQUWK7DU2RIVO5M8aTiiVdawg=s"
          />
        </div>
        <div className="mb-4">
          <h1 className="block text-gray-700 mb-2">Please select a role</h1>
          <div className="flex space-x-2">
            <div>
              <input
                className="peer sr-only"
                id="option1"
                type="radio"
                value="user"
                name="option"
                tabIndex="-1"
                defaultChecked={userCredential?.role === "user" ? true : false}
              />
              <label
                htmlFor="option1"
                className="block w-full rounded-lg border border-secondary p-3 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white"
                tabIndex="0"
              >
                <span className="text-sm font-medium">User</span>
              </label>
            </div>
            <div>
              <input
                className="peer sr-only"
                id="option2"
                type="radio"
                value="instructor"
                name="option"
                tabIndex="-1"
                defaultChecked={
                  userCredential?.role === "instructor" ? true : false
                }
              />
              <label
                htmlFor="option2"
                className="block w-full rounded-lg border border-secondary p-3 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white"
                tabIndex="0"
              >
                <span className="text-sm font-medium">Instructor</span>
              </label>
            </div>
            <div>
              <input
                className="peer sr-only"
                id="option3"
                type="radio"
                value="admin"
                name="option"
                tabIndex="-1"
                defaultChecked={userCredential?.role === "admin" ? true : false}
              />
              <label
                htmlFor="option3"
                className="block w-full rounded-lg border border-secondary p-3 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white"
                tabIndex="0"
              >
                <span className="text-sm font-medium">Admin</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">About user</label>
          <textarea
            name="about"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="About user"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update user
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
