import React from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import UseFetch from "../../hooks/UseFetch";
import UseSecurity from "../../hooks/UseSecurity";
import UseUser from "../../hooks/UseUser";
import student from "../../assets/classes/rahulDeb.jpg";
import {
  FaFileVideo,
  FaRegPlayCircle,
  FaUserTie,
  FaUsers,
  FaGraduationCap,
  FaSortAlphaUp,
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import RelatedCourses from "./RelatedCourses";
import TrustedCompanies from "./TrustedCompanies";

const SingleClass = () => {
  const course = useLoaderData();
  const { currentUser } = UseUser();
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const fetchData = UseFetch();
  const useSecure = UseSecurity();
  // console.log("course: ", course);
  // console.log("currentUser: ", currentUser);

  // Handle Select is Here
  const handleSelect = (id) => {
    // console.log(id);
    useSecure
      .get(`/api/enrolled-classes/${currentUser?.email}`)
      .then((res) => setEnrolledClasses(res.data))
      .catch((err) => console.log(err));

    if (!currentUser) {
      return alert("Login First!");
    }

    useSecure
      .get(`/api/cart-data/class/${id}??email= ${currentUser.email}`)
      .then((res) => {
        if (res.data.classId === id) {
          return alert("Already Selected!");
        } else if (enrolledClasses.find((item) => item.classes._id === id)) {
          return alert("Already Enrolled");
        } else {
          const data = {
            classId: id,
            userMail: currentUser.email,
            date: new Date(),
          };
          useSecure.post("/api/cart", data).then((res) => {
            alert("add to cart ☺");
            console.log(res.data);
          });
        }
      });
  };

  return (
    <>
      <div
        className="font-Ubuntu font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto"
        data-new-gr-c-s-check-loaded="14.1157.0"
        data-gr-ext-installed=""
      >
        <div className="py-20 mt-10 bg-transparent section-padding bg-cover bg-center bg-no-repeat">
          <div className="container text-center">
            <h2 className="text-5xl font-bold text-center dark:text-white">
              Course <span className="text-secondary">Details</span>
            </h2>
          </div>
        </div>

        <div className="nav-tab-wrapper tabs section-padding mt-8">
          <div className="container">
            <div className="grid grid-cols-12 md: gap-[30px] ">
              <div className="lg:col-span-8 col-span-12">
                <div className="single-class-details">
                  <div className="xl:h-[470px] h-[350px] mb-10">
                    <img
                      src={course?.image}
                      alt="404 img"
                      className="rounded-md object-fit w-full h-full block"
                    />
                  </div>
                  <h2 className="font-bold">{course?.name}</h2>

                  <div className="author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-2 sm:space-y-0 items-center">
                    <div className="flex space-x-4 items-center group">
                      <div className="flex-none">
                        <div className="h-12 w-12 rounded">
                          <img
                            src={student}
                            alt=""
                            className="object-cover w-full h-full rounded"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-secondary">
                          Instructor{" "}
                          <a
                            href="#"
                            className="text-black ml-1 dark:text-white"
                          >
                            : {course?.instructorName}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="text-secondary">
                        Last Update:{" "}
                        <a href="#" className="text-black ml-1">
                          {new Date(course?.submitted).toLocaleDateString()}
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="nav-tab-wrapper mt-12">
                    <ul id="tabs-nav" className="course-tab mb-8">
                      <li className="active">
                        <a href="#tab1">Overview</a>
                      </li>
                      <li>
                        <a href="#tab2">Carriculum</a>
                      </li>
                      <li>
                        <a href="#tab3">Instructor</a>
                      </li>
                      <li>
                        <a href="#tab4">Reviews</a>
                      </li>
                    </ul>
                    <div id="tabs-content">
                      <div id="tab1" className="tab-content">
                        <div>
                          <h3 className="text-2xl mt-8">Course Description</h3>
                          <p className="mt-4">{course?.description}</p>
                          <div className="bg-[#ebeaea] dark:bg-indigo-400 space-y-6 p-8 rounded-md my-8">
                            <h4 className="text-2xl">
                              This Course is For Beginners
                            </h4>
                          </div>
                          <div>
                            <h4 className="text-2xl">What you will Learn?</h4>
                            <p className="mt-4">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Saepe repellendus voluptate eos
                              molestiae fuga odit ipsam nemo tenetur quod eaque
                              error voluptatibus sapiente quis quaerat veniam,
                              reprehenderit dolorum nisi in. Lorem ipsum dolor
                              sit amet consectetur adipisicing elit. Adipisci,
                              ipsum possimus sapiente minus facere est? Dolore
                              necessitatibus eaque dolores magnam explicabo
                              delectus harum aperiam animi! Fuga sapiente
                              doloribus blanditiis rerum? Lorem ipsum dolor sit
                              amet consectetur adipisicing elit. Omnis ab esse
                              adipisci earum laboriosam eos fugit eius
                              temporibus I architecto hic reprehenderit ducimus
                              soluta maxime sunt numquam quo consectetur, facere
                              pariatur?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side  */}
              <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0 border shadow-md">
                <div className="space-y-[30px]">
                  <div className="space-y-5">
                    <a className="rounded relative block h-[220pm]" href="#">
                      <img
                        src={course?.image}
                        alt=""
                        className="block w-half h-full object-cover rounded"
                      />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <FaRegPlayCircle className="w-20 h-20 text-white" />
                      </div>
                    </a>
                    <h3>
                      {" "}
                      <span className="text-secondary mx-2">Price:</span> $
                      {course?.price}
                    </h3>
                    <button
                      onClick={() => handleSelect(course._id)}
                      title={
                        role === "admin" || role === "instructor"
                          ? "Instructor/Admin Can not be able to Select"
                            ? course.availableSeats < 1
                            : "No Seat Available"
                          : "You can select This Classes"
                      }
                      disabled={
                        role === "admin" ||
                        role === "instructor" ||
                        course.availableSeats < 1
                      }
                      className="btn btn-primary w-full text-center bg-secondary hover:bg-primary transition-colors duration-200 py-2 px-6 text-white"
                    >
                      Enroll Now
                    </button>
                    <ul className="list-disc mx-2">
                      <li className="flex space-x-3 border-b mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaUserTie className="inline-flex" />
                          <div className="text-black font-semibold">
                            Instructor
                          </div>
                        </div>
                        <div className="flex-none">
                          {course?.instructorName}
                        </div>
                      </li>
                      <li className="flex space-x-3 border-b mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaFileVideo className="inline-flex" />
                          <div className="text-black font-semibold">
                            Lecture
                          </div>
                        </div>
                        <div className="flex-none">30</div>
                      </li>
                      <li className="flex space-x-3 border-b mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <IoMdTime className="inline-flex" />
                          <div className="text-black font-semibold">
                            Duration
                          </div>
                        </div>
                        <div className="flex-none">10Hr 22Minute</div>
                      </li>
                      <li className="flex space-x-3 border-b mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaUsers className="inline-flex" />
                          <div className="text-black font-semibold">
                            Enrolled
                          </div>
                        </div>
                        <div className="flex-none">
                          {course?.totalEnrolled} Students
                        </div>
                      </li>
                      <li className="flex space-x-3 border-b mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaGraduationCap className="inline-flex" />
                          <div className="text-black font-semibold">
                            Course Level
                          </div>
                        </div>
                        <div className="flex-none">Intermediate</div>
                      </li>
                      <li className="flex space-x-3 border-b mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaSortAlphaUp className="inline-flex" />
                          <div className="text-black font-semibold">
                            Language
                          </div>
                        </div>
                        <div className="flex-none">English</div>
                      </li>

                      {/* Share on section start from here  */}
                    </ul>
                  </div>
                </div>
                <RelatedCourses className="flex space-x-3 border-b mb-4 pb-4 last:pb-0 last:mb-0 last:border-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TrustedCompanies section from here */}
      <div className="mt-10">
        <hr />
        <TrustedCompanies />
      </div>
    </>
  );
};

export default SingleClass;
