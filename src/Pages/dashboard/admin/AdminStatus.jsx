import React, { useState } from "react";
import { useEffect } from "react";
import UseSecurity from "../../../hooks/UseSecurity";
import {
  FaUsers,
  FaCheck,
  FaChalkboardTeacher,
  FaDatabase,
} from "react-icons/fa";

const AdminStatus = ({ users }) => {
  const [data, setData] = useState();
  const axiosSecure = UseSecurity();
  useEffect(() => {
    axiosSecure
      .get(`/api/admin-status`)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);
  const totalUsers = users.length;
  const approvedClasses = data?.approvedClasses || 0;
  const instructors = data?.instructors || 0;
  const pendingClasses = data?.pendingClasses || 0;
  // console.log("total data:", data);
  const stats = [
    {
      icon: <FaUsers className="text-white text-3xl" />,
      label: "Total Member",
      value: totalUsers,
      bgColor: "bg-green-500",
    },
    {
      icon: <FaCheck className="text-white text-3xl" />,
      label: "Approved Class",
      value: approvedClasses,
      bgColor: "bg-blue-500",
    },
    {
      icon: <FaChalkboardTeacher className="text-white text-3xl" />,
      label: "Instructors",
      value: instructors,
      bgColor: "bg-purple-500",
    },
    {
      icon: <FaDatabase className="text-white text-3xl" />,
      label: "Pending Class",
      value: pendingClasses,
      bgColor: "bg-red-500",
    },
  ];
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-lg shadow-lg ${stat.bgColor}`}
          >
            <div className="mr-4">{stat.icon}</div>
            <div>
              <div className="text-white text-xl font-semibold">
                {stat.value}
              </div>
              <div className="text-white">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStatus;
