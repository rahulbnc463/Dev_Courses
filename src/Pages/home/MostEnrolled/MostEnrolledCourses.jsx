import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import UseFetch from "../../../hooks/UseFetch";
import Card from "./Card";
import { ScaleLoader } from "react-spinners";

const MostEnrolledCourses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const FetchData = UseFetch();
  useEffect(() => {
    const fetchClasses = async () => {
      const response = await FetchData.get("/api/classes/all");
      // console.log(response.data);
      setData(response.data);
      setLoading(false);
    };
    fetchClasses();
  }, []);
  // console.log(data);
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
    <div className="md:w-[80%] mx-auto my-36">
      <div>
        <h1 className="text-5xl font-bold text-center dark:text-white">
          Most <span className="text-secondary">Enrolled</span> Courses
        </h1>
        <div className="w-[40%] text-center mx-auto">
          <p className="text-gray-500">
            Explore our Most Enrooled Courses. Here is some popular classes
            based on our Student's choise.
          </p>
        </div>
      </div>

      {/* main Section to show our classes  */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.slice(0, 6).map((iteam, index) => (
          <Card key={index} iteam={iteam} />
        ))}
      </div>
    </div>
  );
};

export default MostEnrolledCourses;
