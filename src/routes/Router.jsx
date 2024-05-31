import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import MainLayout from "../Layout/MainLayout";
import Classes from "../Pages/classes/Classes";
import SingleClass from "../Pages/classes/SingleClass";
import AdminHome from "../Pages/dashboard/admin/AdminHome";
import ManageApplications from "../Pages/dashboard/admin/ManageApplications";
import ManageClasses from "../Pages/dashboard/admin/ManageClasses";
import ManageUser from "../Pages/dashboard/admin/ManageUser";
import UpdateUser from "../Pages/dashboard/admin/UpdateUser";
import Dashboard from "../Pages/dashboard/Dashboard";
import InstructorAddClasses from "../Pages/dashboard/instructor/InstructorAddClasses";
import InstructorClasses from "../Pages/dashboard/instructor/InstructorClasses";
import InstructorHome from "../Pages/dashboard/instructor/InstructorHome";
import InstructorMyApproved from "../Pages/dashboard/instructor/InstructorMyApproved";
import InstructorMyPending from "../Pages/dashboard/instructor/InstructorMyPending";
import ApplyInstructor from "../Pages/dashboard/student/ApplyInstructor";
import EnrolledClasses from "../Pages/dashboard/student/EnrolledClasses";
import MyPayment from "../Pages/dashboard/student/MyPyment";
import SelectedClasses from "../Pages/dashboard/student/SelectedClasses";
import Student from "../Pages/dashboard/student/Student";
import UserPayment from "../Pages/dashboard/student/UserPayment";
import Following from "../Pages/extra/Following";
import Tranding from "../Pages/extra/Tranding";
import Home from "../Pages/home/Home";
import Instructors from "../Pages/instructors/Instructors";
import Login from "../Pages/user/Login";
import Register from "../Pages/user/Register";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/api/instructors",
        element: <Instructors />,
      },
      {
        path: "/api/classes",
        element: <Classes />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/api/class/:id",
        element: <SingleClass />,
        loader: ({ params }) =>
          fetch(
            `https://dev-courses-rahul-server.onrender.com/api/class/${params.id}`
          ),
      },
      {
        path: "trending",
        element: <Tranding />,
      },
      {
        path: "following",
        element: <Following />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      //for Students route start from here
      {
        path: "student",
        element: <Student />,
      },
      {
        path: "enrolled-class",
        element: <EnrolledClasses />,
      },
      {
        path: "my-selected",
        element: <SelectedClasses />,
      },
      {
        path: "my-payments",
        element: <MyPayment />,
      },
      {
        path: "apply-instructor",
        element: <ApplyInstructor />,
      },
      {
        path: "user/payment",
        element: <UserPayment />,
      },
      // for instructor Route start from here
      {
        path: "instructor",
        element: <InstructorHome />,
      },
      {
        path: "my-classes",
        element: <InstructorClasses />,
      },
      {
        path: "add-class",
        element: <InstructorAddClasses />,
      },
      {
        path: "my-pending",
        element: <InstructorMyPending />,
      },
      {
        path: "my-approved",
        element: <InstructorMyApproved />,
      },

      // For Admin Route start from here
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "manageUser",
        element: <ManageUser />,
      },
      {
        path: "manageClass",
        element: <ManageClasses />,
      },
      {
        path: "manageApplications",
        element: <ManageApplications />,
      },
      {
        path: "api/update-user/:id",
        element: <UpdateUser />,
        loader: ({ params }) =>
          fetch(
            `https://dev-courses-rahul-server.onrender.com/api/user/${params.id}`
          ),
      },
    ],
  },
]);

export default Router;
