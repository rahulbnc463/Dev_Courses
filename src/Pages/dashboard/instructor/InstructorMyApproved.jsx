import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseSecurity from "../../../hooks/UseSecurity";
import UseUser from "../../../hooks/UseUser";
import { ScaleLoader } from "react-spinners";

const InstructorMyApproved = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser } = UseUser();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosSecure = UseSecurity();

  useEffect(() => {
    axiosSecure
      .get(`/api/classes/${currentUser?.email}`)
      .then((res) => {
        setClasses(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const approvedClasses = classes.filter((cls) => cls.status === "approved");
  if (loading) {
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold lg:text-4xl mb-4 text-center">
        Instructor All <span className="text-secondary">Classes</span>
      </h1>
      <p className="mb-6 text-center">
        Here you can see how many classes added by you and all classes status
      </p>
      {approvedClasses.length === 0 ? (
        "No Classes Added Till Now"
      ) : (
        <div>
          {approvedClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <div className="flex items-center mb-4" key={cls.id}>
                <img
                  src={cls.image}
                  alt={cls.name}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">{cls.name}</h2>
                  <p className="text-gray-600">
                    Created By: {cls.instructorName}
                  </p>
                  <p className="text-gray-600">
                    Total Students: {cls.totalEnrolled}
                  </p>
                  <p className="text-gray-600">
                    Price: {"\u20B9 "}
                    {cls.price}
                  </p>
                  <p className="text-gray-600">
                    Total Seats: {cls.availableSeats}
                  </p>
                  <p className="text-gray-600">Submitted: {cls.submitted}</p>
                  <p
                    className={`text-gray-600 ${
                      cls.status === "approved"
                        ? "text-green-500"
                        : "text-orange-500"
                    }`}
                  >
                    Status: {cls.status}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-orange-500 text-white px-4 py-2 rounded">
                  View Feedback
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                  View Details
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorMyApproved;
