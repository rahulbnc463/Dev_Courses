import React from "react";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import UseUser from "../../../hooks/UseUser";

const Student = () => {
  const { currentUser, isLoading } = UseUser();
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
    <div className="h-screen flex justify-center items-center p-2">
      <div>
        <div>
          <div>
            <img
              src="https://static.vecteezy.com/system/resources/previews/001/999/916/non_2x/dashboard-business-people-cartoon-flat-style-free-vector.jpg"
              alt=""
              className="h-[250px] items-center"
            />
          </div>
          <h1 className="text-4xl capitalize font-bold">
            Hi,
            <span className="text-secondary items-stretch">
              {currentUser?.name}!
            </span>
            Welcome to your Dashboard
          </h1>
          <p className="text-center text-base py-2">
            Hey Dear, This is your Dashboard Home. We will Update your dashboard
            very soon...
          </p>
          <div className="text-center">
            <h2 className="font-bold">Checkout Your pages from here</h2>
            <div className="flex justify-center items-center my-4 gap-3">
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-300 px-3 py-1">
                <Link to="/dashboard/enrolled-class">My Enroll</Link>
              </div>
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-300 px-3 py-1">
                <Link to="/dashboard/my-selected">My Selected</Link>
              </div>
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-300 px-3 py-1">
                <Link to="/dashboard/my-payments">Payment History</Link>
              </div>
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-300 px-3 py-1">
                <Link to="/dashboard/apply-instructor">
                  Apply For Instructor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
