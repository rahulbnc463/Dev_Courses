import React from "react";

const MidBanner = () => {
  return (
    <div className="flex flex-col md:flex-row bg-transparent p-6 md:p-12 rounded-lg items-center shadow-lg">
      <div className="w-full md:w-1/2 p-4">
        <h1 className="lg:text-8xl sm:text-5xl font-light text-blue-700 mb-4">
          Online <span className="font-bold">Education</span>
        </h1>
        <p className="lg:text-5xl sm:text-3xl text-orange-600 mb-6">
          Get Promo Up To 30% Off For This Year Only
        </p>
        <ul className="text-lg text-gray-700 mb-6 w-1/2 flex justify-between">
          <li>Business</li> |<li>Marketing</li> |<li>Accounting</li>
        </ul>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition">
          Register Now
        </button>
      </div>
      <div className="w-full md:w-1/2 p-4 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1620503580973-fd9a09337739?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Online Education"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default MidBanner;
