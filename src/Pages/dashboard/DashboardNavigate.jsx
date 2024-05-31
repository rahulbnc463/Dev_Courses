import React from "react";
import { Navigate } from "react-router-dom";
import UseUser from "../../hooks/UseUser";

const DashboardNavigate = () => {
  const { currentUser, isLoading } = UseUser();
  const role = currentUser?.role;
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
  if (role === "admin") return <Navigate to="/dashboard/adminHome" replace />;
  if (role === "instructor")
    return <Navigate to="/dashboard/instructor" replace />;
  if (role === "user") return <Navigate to="/dashboard/student" replace />;
};

export default DashboardNavigate;
