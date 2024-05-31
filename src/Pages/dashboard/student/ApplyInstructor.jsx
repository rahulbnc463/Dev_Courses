import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import UseFetch from "../../../hooks/UseFetch";
import UseUser from "../../../hooks/UseUser";
import { FaTelegramPlane } from "react-icons/fa";

const ApplyInstructor = () => {
  const { currentUser, isLoading } = UseUser();
  const axiosFetch = UseFetch();
  const [submitedData, setSubmitedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosFetch
      .get(`/api/applied-instructor/${currentUser?.email}`)
      .then((res) => {
        setSubmitedData(res.data);
        // console.log(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const experience = e.target.experience.value;
    const data = {
      name,
      email,
      experience,
    };
    axiosFetch.post(`/api/hire-instructor`, data).then((res) => {
      console.log("data:", res.data);
      alert("added your request✅");
    });
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://source.unsplash.com/random/1920x1080')",
          }}
        ></div>
        {!submitedData?.name && (
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  defaultValue={currentUser?.name}
                  disabled
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  defaultValue={currentUser?.email}
                  disabled
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  name="email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="experience"
                >
                  Experience
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="experience"
                  name="experience"
                  placeholder="Tell us about your experience..."
                  rows="15"
                ></textarea>
              </div>
              <div className="flex text-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold flex items-center py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  <FaTelegramPlane className="mr-2" />
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplyInstructor;
