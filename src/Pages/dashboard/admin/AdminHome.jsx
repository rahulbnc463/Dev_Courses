import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import UseFetch from "../../../hooks/UseFetch";
import UseUser from "../../../hooks/UseUser";
import AdminStatus from "./AdminStatus";

const AdminHome = () => {
  const { currentUser } = UseUser();
  const axiosFetch = UseFetch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosFetch
      .get(`/api/users`)
      .then((res) => {
        setUsers(res.data);
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <div>
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <input
                type="text"
                placeholder="Search anything"
                className="p-2 border border-gray-300 rounded-md w-full max-w-xs"
              />
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"></path>
                    <path d="M9 17h6v1a2 2 0 01-2 2H11a2 2 0 01-2-2v-1z"></path>
                  </svg>
                </div>
                <div className="relative">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 12H5"></path>
                    <path d="M12 19l-7-7 7-7"></path>
                  </svg>
                </div>
                <div className="relative">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 12H5"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </div>
                <div className="relative">
                  <img
                    src={currentUser?.image}
                    alt="User Avatar"
                    className="rounded-full w-10 h-10"
                  />
                </div>
              </div>
            </div>
            {/* heading and p data  */}
            <h1 className="text-4xl text-center my-3">
              Admin <span className="text-secondary">Home</span>
            </h1>
            <p className="text-1xl font-bold text-center">
              Welcome to your Dashboard Admin:{" "}
              <span className="text-primary">{currentUser?.name}</span>{" "}
            </p>
            {/* Main Content  */}
            <div>
              <AdminStatus users={users} />
            </div>
            {/* Demo for design */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Course Cards */}
                <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold">1</div>
                    <div className="text-right">
                      <p className="text-sm">Skill One</p>
                      <p className="text-xs">15 Videos</p>
                    </div>
                  </div>
                  <button className="bg-white text-blue-500 py-2 px-4 rounded-md">
                    Start Now
                  </button>
                </div>
                <div className="bg-teal-500 text-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold">2</div>
                    <div className="text-right">
                      <p className="text-sm">Skill Two</p>
                      <p className="text-xs">23 Videos</p>
                    </div>
                  </div>
                  <button className="bg-white text-teal-500 py-2 px-4 rounded-md">
                    Start Now
                  </button>
                </div>
                <div className="bg-gray-700 text-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold">3</div>
                    <div className="text-right">
                      <p className="text-sm">Skill Three</p>
                      <p className="text-xs">36 Videos</p>
                    </div>
                  </div>
                  <button className="bg-white text-gray-700 py-2 px-4 rounded-md">
                    Start Now
                  </button>
                </div>
                <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold">4</div>
                    <div className="text-right">
                      <p className="text-sm">Skill Four</p>
                      <p className="text-xs">18 Videos</p>
                    </div>
                  </div>
                  <button className="bg-white text-red-500 py-2 px-4 rounded-md">
                    Start Now
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold mb-4">Course Progress</h2>
                <div className="relative">
                  <svg
                    className="w-full h-40"
                    viewBox="0 0 500 150"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0.00,49.98 C150.00,150.00 350.00,0.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                      className="stroke-none fill-blue-100"
                    ></path>
                  </svg>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="bg-white px-4 py-2 rounded-full shadow-lg">
                      5 Lessons
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Sidebar Buttons */}
                <button className="bg-blue-500 text-white py-4 rounded-lg shadow-md">
                  Become Teacher Now
                </button>
                <button className="bg-gray-200 text-gray-700 py-4 rounded-lg shadow-md">
                  Best Seller
                </button>
                <button className="bg-gray-200 text-gray-700 py-4 rounded-lg shadow-md">
                  Explore
                </button>
                <button className="bg-gray-200 text-gray-700 py-4 rounded-lg shadow-md">
                  Favorites
                </button>
                <button className="bg-gray-200 text-gray-700 py-4 rounded-lg shadow-md">
                  My Wallet
                </button>
                <button className="bg-gray-200 text-gray-700 py-4 rounded-lg shadow-md">
                  Support
                </button>
                <button className="bg-gray-200 text-gray-700 py-4 rounded-lg shadow-md">
                  Notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
