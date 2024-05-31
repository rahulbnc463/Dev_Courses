import React from "react";
import { useState } from "react";
import UseUser from "../../../hooks/UseUser";
import { ScaleLoader } from "react-spinners";
import UseFetch from "../../../hooks/UseFetch";
import UseSecurity from "../../../hooks/UseSecurity";

const InstructorAddClasses = () => {
  const { currentUser, isLoading } = UseUser();
  const axiosSecure = UseSecurity();
  const onSubmit = (e) => {
    e.preventDefault();
    const formatDate = (date) => {
      return date.toISOString().split("T")[0];
    };
    const date = new Date();
    const formattedDate = formatDate(date);

    const name = e.target.className.value;
    const image = e.target.thumbnailPhoto.value;
    const availableSeats = +e.target.availableSeats.value;
    const price = e.target.price.value;
    const videoLink = e.target.youtubeLink.value;
    const description = e.target.description.value;
    const instructorName = e.target.instructorName.value;
    const instructorEmail = e.target.instructorEmail.value;
    const status = "pending";
    const submitted = formattedDate;
    const totalEnrolled = 0;
    const reason = null;

    const data = {
      name,
      image,
      availableSeats,
      price,
      videoLink,
      description,
      instructorName,
      instructorEmail,
      status,
      submitted,
      totalEnrolled,
      reason,
    };
    // console.log("data:", data);
    axiosSecure.post(`/api/new_class`, data).then((res) => {
      console.log("data:", res.data);
      alert("added your request✅");
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center align-middle h-screen">
        <ScaleLoader
          color="#f7a5b9"
          height={60}
          margin={3}
          radius={3}
          width={5}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4 md:p-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-8">
          Add Your Class
        </h1>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="className"
              >
                Class name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="className"
                required
                name="className"
                type="text"
                placeholder="Your Class Name"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="thumbnailPhoto"
              >
                Thumbnail Photo
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="thumbnailPhoto"
                name="thumbnailPhoto"
                placeholder="Past Here Your Image URL..."
                type="text"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            You can not change your name or email!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="instructorName"
              >
                Instructor name
              </label>
              <input
                value={currentUser?.name}
                disabled
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="instructorName"
                name="instructorName"
                type="text"
                placeholder="Your Assistant"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="instructorEmail"
              >
                Instructor email
              </label>
              <input
                value={currentUser?.email}
                disabled
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="instructorEmail"
                name="instructorEmail"
                type="email"
                placeholder="help.yourassistant@gmail.com"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="availableSeats"
              >
                Available seats
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="availableSeats"
                name="availableSeats"
                type="number"
                placeholder="How many seats are available?"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                name="price"
                type="text"
                placeholder="How much does it cost?"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="youtubeLink"
            >
              YouTube Link
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="youtubeLink"
              name="youtubeLink"
              type="url"
              placeholder="Your course intro video link"
            />
            <p className="text-xs text-gray-500 mt-1">
              Only YouTube videos are supported
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description About your course
            </label>
            <textarea
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              type="text"
              rows="4"
              placeholder="Description about your course"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 w-1/2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructorAddClasses;
