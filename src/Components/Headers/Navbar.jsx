import React, { useContext } from "react";
import { useState } from "react";
import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import Swal from "sweetalert2";
// import { motion } from "framer-motion";
import userImg from "../../assets/home/userImg.jpg";
import { AuthContext } from "../../../utilities/AuthProvider";
import UseUser from "../../hooks/UseUser";
const navLinks = [
  { name: "Home", route: "/" },
  { name: "Instructors", route: "/api/instructors" },
  { name: "Classes", route: "/api/classes" },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff000",
    },
    secondary: {
      main: "#FF4500",
    },
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = UseUser();
  const [isHome, setIsHome] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navColor, setNavColor] = useState("bg-white-200");
  const { logOut, user } = useContext(AuthContext);

  const toggleMobile = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const darkClass = "dark";
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add(darkClass);
    } else {
      root.classList.remove(darkClass);
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsHome(location.pathname === "/");
    setIsLogin(location.pathname === "/login");
    setIsFixed(
      location.pathname === "/register" || location.pathname === "/login"
    );
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition > 100) {
      if (isHome) {
        setNavColor(
          "bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black"
        );
      } else {
        setNavColor(
          "bg-white backdrop-filter dark:bg-black dark:text-white text-black"
        );
      }
    } else {
      setNavColor(
        `${
          isHome || location.pathname === "/"
            ? "bg-transparent"
            : "bg-white dark:bg-black"
        } dark:text-white text-white`
      );
    }
  }, [scrollPosition, isHome, location]);

  const handleLogout = (e) => {
    e.preventDefault();
    // console.log("log_out");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logout!",
              text: "You'r successfully logout.",
              icon: "success",
            });
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${isHome ? "backdrop-blur-3xl" : navColor} ${
        isFixed ? "static" : "fixed"
      } top-0 transition-colors duration-500 ease-in-out w-full z-10`}
    >
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
        <div className="px-4 py-4 flex items-center justify-between">
          {/* logo here✔ */}
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <h1 className="text-2xl text-pink-400 inline-flex gap-3 items-center font-bold ">
              DevCourses <img src="/Logo.png" alt="" className="w-10 h-10" />
            </h1>
            <p className="font-bold text-[13px] tracking-[6px] dark:text-white">
              Explore & Enroll
            </p>
          </div>

          {/* Mobile Links are here ✔  */}
          <div className="md:hidden flex items-center">
            <button
              type="butto"
              onClick={toggleMobile}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <FaBars className="h-6 w-6 hover:text-primary" />
            </button>
          </div>
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className={`md:hidden absolute top-16 left-0 w-full bg-white dark:bg-black text-black dark:text-white transform transition-transform duration-600 ease-in-out ${
                isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
              }`}
            >
              <ul className="flex flex-col items-center space-y-4 py-4">
                {navLinks.map((Link) => (
                  <li key={Link.route}>
                    <NavLink
                      to={Link.route}
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : "text-black dark:text-white"
                        } hover:text-secondary duration-200`
                      }
                      onClick={toggleMobile}
                    >
                      {Link.name}
                    </NavLink>
                  </li>
                ))}
                {user ? null : isLogin ? (
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : "text-black dark:text-white"
                        } hover:text-secondary duration-200`
                      }
                      onClick={toggleMobile}
                    >
                      Register
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : "text-black dark:text-white"
                        } hover:text-secondary duration-200`
                      }
                      onClick={toggleMobile}
                    >
                      Login
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : "text-black dark:text-white"
                        } hover:text-secondary duration-200`
                      }
                      onClick={toggleMobile}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <img
                      src={currentUser?.image}
                      alt="User"
                      className="h-[40px] rounded-full w-[40px]"
                    />
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      className="font-bold px-3 py-2 bg-secondary text-white rounded-xl"
                    >
                      Logout
                    </NavLink>
                  </li>
                )}
                <li>
                  <ThemeProvider theme={theme}>
                    <div className="flex flex-col justify-center items-center">
                      <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="focus:outline-none"
                      >
                        {isDarkMode ? (
                          <FaSun size={24} />
                        ) : (
                          <FaMoon size={24} />
                        )}
                      </button>
                      <h1 className="text-[8px]">Light/Dark</h1>
                    </div>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          )}

          {/* Navigational Links are here✔ */}
          <div className="hidden md:block text-black dark:text-white">
            <div className="flex">
              <ul className="ml-10 flex items-center space-x-4 pr-4">
                {navLinks.map((Link) => (
                  <li key={Link.route}>
                    <NavLink
                      to={Link.route}
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navColor.includes("bg-transparent")
                                  ? "text-primary"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-200`
                      }
                    >
                      {Link.name}
                    </NavLink>
                  </li>
                ))}

                {/* Login tab is here ✔ */}
                {user ? null : isLogin ? (
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navColor.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-200`
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navColor.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-200`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navColor.includes("bg-transparent")
                                  ? "text-primary"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-200`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <img
                      src={currentUser?.image}
                      alt="404"
                      className="h-[40px] rounded-full w-[40px]"
                    />
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      className="font-bold px-3 py-2 bg-secondary text-white rounded-xl"
                    >
                      Logout
                    </NavLink>
                  </li>
                )}

                {/* Toogle tab here✔  */}
                <li>
                  <ThemeProvider theme={theme}>
                    <div className="flex flex-col justify-center items-center">
                      <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="focus:outline-none"
                      >
                        {isDarkMode ? (
                          <FaSun size={24} />
                        ) : (
                          <FaMoon size={24} />
                        )}
                      </button>
                      <h1 className="text-[8px]">Light/Dark</h1>
                    </div>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
