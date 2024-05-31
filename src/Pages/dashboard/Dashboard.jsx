import React from "react";
import UseUser from "../../hooks/UseUser";
import { ScaleLoader } from "react-spinners";
import DashboardNavigate from "./DashboardNavigate";

const Dashboard = () => {
  const { currentUser, isLoading } = UseUser();
  const role = currentUser?.role;
  // console.log(role);

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
  return <DashboardNavigate />;
};

export default Dashboard;
