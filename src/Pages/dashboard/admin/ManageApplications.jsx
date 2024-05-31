import React from "react";
import UseUser from "../../../hooks/UseUser";

const ManageApplications = () => {
  const { currentUser } = UseUser();
  return (
    <div>
      <div className="text-center my-4">
        <h1 className="lg:text-4xl">
          Manage Your
          <span className="text-secondary font-bold">Application </span>
        </h1>
        <p>
          It's a Static Page for now, If you want to add any Functionality
          please add
        </p>
      </div>
      <div className="min-h-screen bg-gray-100 p-4 flex flex-col lg:flex-row">
        <div className="lg:w-1/4 p-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full">
                <img src={currentUser?.image} alt="" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-bold">{currentUser?.name}</h2>
                <p className="text-gray-600">{currentUser?.address}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-bold text-lg">$150.700</p>
              <p className="text-gray-600">
                Your salary will be paid every 26th
              </p>
            </div>
            <div className="mt-4">
              <p className="font-bold">My Expertise</p>
              <ul className="list-disc ml-4 text-gray-600">
                <li>Mobile App</li>
                <li>Landing Page</li>
                <li>Prototyping & Wireframing</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:w-3/4 p-4">
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="text-lg font-bold">Upcoming Project</h2>
            <div className="mt-4 space-y-2">
              <div className="p-4 bg-gray-200 rounded flex justify-between items-center">
                <div>Grocery Mobile App</div>
                <div>iOS Development</div>
              </div>
              <div className="p-4 bg-gray-200 rounded flex justify-between items-center">
                <div>Company Profile Property</div>
                <div>Landing Page</div>
              </div>
              <div className="p-4 bg-gray-200 rounded flex justify-between items-center">
                <div>Furniture Mobile App</div>
                <div>Mobile App</div>
              </div>
              <button className="w-full py-2 bg-blue-500 text-white rounded">
                Add Project
              </button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold">Activity</h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <div>Jane Cooper</div>
                <div>5/21/14, 00:15</div>
                <div>Village Podcast</div>
                <div>Wireframing</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Floyd Miles</div>
                <div>5/3/14, 10:00</div>
                <div>Nebula NTT Art</div>
                <div>Prototyping</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Jerome Bell</div>
                <div>8/5/17, 14:45</div>
                <div>Fin Payroll SaaS</div>
                <div>Brainstorming</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageApplications;
