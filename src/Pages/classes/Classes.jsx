import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import UseFetch from "../../hooks/UseFetch";
import { toast } from "react-toastify";
import demo from "../../assets/error/instructor_demo.png";
import CardClasses from "./CardClasses";
import StudentReviewsSlider from "./StudentReviewsSlider";
import UseUser from "../../hooks/UseUser";
import UseSecurity from "../../hooks/UseSecurity";
import { AuthContext } from "../../../utilities/AuthProvider";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const fetchData = UseFetch();
  const useSecure = UseSecurity();
  const { currentUser } = UseUser();
  const role = currentUser?.role;
  // console.log("role", currentUser);

  useEffect(() => {
    fetchData
      .get("/api/classes")
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
    <div className="md:w-[80%] mx-auto my-36">
      <div>
        <h1 className="text-5xl font-bold text-center dark:text-white">
          Our <span className="text-secondary">Classes</span> ~ {classes.length}
        </h1>
        <div className="w-[60%] text-center flex justify-center mx-auto mb-8">
          <p className="text-gray-500 lg:w-1/2">
            Explore our Top Classes. Here is some popular Courses's based on our
            Student's choise.
          </p>
        </div>
      </div>

      {/* main Section to show our Teacher */}

      {classes ? (
        <>
          <div className="grid mb-28 lg:grid-cols-3 mb:grid-cols-2 w-[90%] gap-4 mx-auto">
            {classes?.map((item, index) => (
              // console.log(iteam),
              <CardClasses
                key={index}
                data={item}
                role={role}
                handleSelect={() => handleSelect(item._id)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <p>Server Error Instructor Details`${demo}` not able to Fetch </p>
        </>
      )}
      <>
        <StudentReviewsSlider />
      </>
    </div>
  );
};

export default Classes;
