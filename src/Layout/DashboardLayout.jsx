import React, { useState } from "react";
import UseAuth from "../hooks/UseAuth";
import UseUser from "../hooks/UseUser";
import { AiFillHome } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { LuServer } from "react-icons/lu";
import {
  MdSettingsApplications,
  MdHome,
  MdPendingActions,
} from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoIosTrendingUp, IoMdDoneAll } from "react-icons/io";
import { SlUserFollowing } from "react-icons/sl";
import { TbLogout } from "react-icons/tb";
import { SiGoogleclassroom, SiInstructure } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { MdExplore, MdPayments } from "react-icons/md";
import { BiHomeAlt, BiSelectMultiple } from "react-icons/bi";

import Swal from "sweetalert2";
import UseScroll from "../hooks/UseScroll";
import { ScaleLoader } from "react-spinners";

const adminNavItems = [
  {
    to: "/dashboard/adminHome",
    icon: <AiFillHome className="text-2xl" />,
    label: "Dashboard Home",
  },
  {
    to: "/dashboard/manageUser",
    icon: <FaUserGroup className="text-2xl" />,
    label: "manage user",
  },
  {
    to: "/dashboard/manageClass",
    icon: <LuServer className="text-2xl" />,
    label: "Manage Class",
  },
  {
    to: "/dashboard/manageApplications",
    icon: <MdSettingsApplications className="text-2xl" />,
    label: "Applications",
  },
];

const instructorNavItems = [
  {
    to: "/dashboard/instructor",
    icon: <FaHome className="text-2xl" />,
    label: "Home",
  },
  {
    to: "/dashboard/my-classes",
    icon: <IoSchool className="text-2xl" />,
    label: "My Classes",
  },
  {
    to: "/dashboard/add-class",
    icon: <MdExplore className="text-2xl" />,
    label: "Add A class",
  },
  {
    to: "/dashboard/my-pending",
    icon: <MdPendingActions className="text-2xl" />,
    label: "Pending Courses",
  },
  {
    to: "/dashboard/my-approved",
    icon: <IoMdDoneAll className="text-2xl" />,
    label: "Approved Classes",
  },
];

const studentsLink = [
  {
    to: "/dashboard/student",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Dashboard",
  },
  {
    to: "/dashboard/enrolled-class",
    icon: <SiGoogleclassroom className="text-2xl" />,
    label: "My Enroll",
  },
  {
    to: "/dashboard/my-selected",
    icon: <BiSelectMultiple className="text-2xl" />,
    label: "My Selected",
  },
  {
    to: "/dashboard/my-payments",
    icon: <MdPayments className="text-2xl" />,
    label: "Payment History",
  },
  {
    to: "/dashboard/apply-instructor",
    icon: <SiInstructure className="text-2xl" />,
    label: "Apply for Instructor",
  },
];

const lastMenuItems = [
  { to: "/", icon: <MdHome />, label: "Home" },
  { to: "/trending", icon: <IoIosTrendingUp />, label: "Trending" },
  { to: "/following", icon: <SlUserFollowing />, label: "Following" },
];

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const { loader, logOut } = UseAuth();
  const { currentUser } = UseUser();
  const role = currentUser?.role;
  const navigate = useNavigate();

  // Handle Logout function is here
  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, LogOut!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(
            Swal.fire({
              title: "Done!",
              text: "logout successful.",
              icon: "success",
            }),
            navigate("/")
          )
          .catch((err) => console.log("err:", err));
      }
    });
  };

  if (loader) {
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
    <div className="flex">
      <div
        className={`${
          open ? "w-72 overflow-y-auto" : "w-[90px] overflow-auto"
        } bg-slate-100 h-screen p-5 md:block hidden relative pt-9 duration-300 `}
      >
        <div className="flex gap-x-4 items-center">
          <img
            onClick={() => setOpen(!open)}
            src="/Logo.png"
            alt="Logo"
            className={`cursor-pointer h-[40px] duration-500 ${open && ""}`}
          />
          <h1
            onClick={() => setOpen(!open)}
            className={`text-pink-400 inline-flex gap-3 items-center font-bold text-xl duration-200 ${
              !open && "rotate-[360deg] scale-0"
            }`}
          >
            DevCourses
          </h1>
        </div>
        {/* Nav-items start from here */}
        {role === "admin" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-600 ${!open && "hidden"}`}>
              <small>MENU</small>
            </p>
            {role === "admin" &&
              adminNavItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-secondary text-white" : "text-gray-600"
                      }rounded-md p-2 cursor-pointer font-bold text-sm items-center gap-x-4 transition ease-in-out duration-200 hover:bg-primary hover:text-white`
                    }
                  >
                    {item.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}

        {/* Instructor role */}
        {role === "instructor" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-600 ${!open && "hidden"}`}>
              <small>MENU</small>
            </p>
            {role === "instructor" &&
              instructorNavItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-secondary text-white" : "text-gray-600"
                      }rounded-md p-2 cursor-pointer font-bold text-sm items-center gap-x-4 transition ease-in-out duration-200 hover:bg-primary hover:text-white`
                    }
                  >
                    {item.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}

        {/* Student role */}
        {role === "user" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-600 ${!open && "hidden"}`}>
              <small>MENU</small>
            </p>
            {role === "user" &&
              studentsLink.map((item, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-secondary text-white" : "text-gray-600"
                      }rounded-md p-2 cursor-pointer font-bold text-sm items-center gap-x-4 transition ease-in-out duration-200 hover:bg-primary hover:text-white`
                    }
                  >
                    {item.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}

        {/* lastMenuItems is here  */}
        {
          <ul className="pt-6">
            <p className={`ml-3 text-gray-600 uppercase ${!open && "hidden"}`}>
              <small>Usefull Links</small>
            </p>
            {lastMenuItems.map((item, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex ${
                      isActive ? "bg-secondary text-white" : "text-gray-600"
                    }rounded-md p-2 cursor-pointer font-bold text-sm items-center gap-x-4 transition ease-in-out duration-200 hover:bg-primary hover:text-white`
                  }
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/"
                onClick={handleLogout}
                className={({ isActive }) =>
                  `flex ${
                    isActive ? "bg-secondary text-white" : "text-gray-600"
                  }rounded-md p-2 cursor-pointer font-bold text-sm items-center gap-x-4 transition ease-in-out duration-200 hover:bg-primary hover:text-white`
                }
              >
                <TbLogout className="text-2xl" />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  logout
                </span>
              </NavLink>
            </li>
          </ul>
        }
      </div>

      <div className="h-screen overflow-y-auto px-8 flex-1">
        <UseScroll />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
