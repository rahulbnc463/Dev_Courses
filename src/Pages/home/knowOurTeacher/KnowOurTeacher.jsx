import React, { useEffect, useState } from "react";
import UseFetch from "../../../hooks/UseFetch";
import CardTeacher from "./CardTeacher";
import demo from "../../../assets/error/instructor_demo.png";

const KnowOurTeacher = () => {
  const [instructors, setInstructors] = useState([]);
  const FetchData = UseFetch();
  useEffect(() => {
    FetchData.get("/api/popular-instructors").then((data) => {
      setInstructors(data.data);
    });
    // console.log(response.data);
  }, []);

  // console.log(instructors);
  return (
    <div className="md:w-[80%] mx-auto my-36">
      <div>
        <h1 className="text-5xl font-bold text-center dark:text-white">
          Discover Best <span className="text-secondary">Educators</span>
        </h1>
        <div className="w-[40%] text-center mx-auto">
          <p className="text-gray-500">
            Explore our Best expert educators. Here is some popular Profile's
            based on our Student's choise.
          </p>
        </div>
      </div>

      {/* main Section to show our Teacher */}

      {instructors ? (
        <>
          <div className="grid mb-28 lg:grid-cols-3 mb:grid-cols-2 w-[90%] gap-4 mx-auto">
            {instructors?.map((item, index) => (
              // console.log(iteam),
              <CardTeacher key={index} instructor={item} />
            ))}
          </div>
        </>
      ) : (
        <>
          <p>Server Error Instructor Details`${demo}` not able to Fetch </p>
        </>
      )}
    </div>
  );
};

export default KnowOurTeacher;
