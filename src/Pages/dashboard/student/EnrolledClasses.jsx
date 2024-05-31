import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseSecurity from "../../../hooks/UseSecurity";
import UseUser from "../../../hooks/UseUser";
import { ScaleLoader } from "react-spinners";

const EnrolledClasses = () => {
  const [data, setData] = useState([]);
  const axiosSecure = UseSecurity();
  const { currentUser } = UseUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/api/enrolled-classes/${currentUser?.email}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        // console.log("my Data:", res.data);
      })
      .catch((error) => console.error(error));
  }, [currentUser?.email]);

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
    <div>
      <h1 className="text-4xl my-3 text-center">
        Enrolled <span className="text-primary font-bold">Classes</span>
      </h1>
      <p className="text-gray-500 py-4 text-sm text-center">
        You can see your all{" "}
        <span className="text-secondary font-bold">Enrolled</span> classes here
      </p>
      <div className="grid md:grid-cols-2 gap-7 grid-cols-1 lg:grid-cols-3">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-7 max-w-sm mx-auto"
            >
              <img
                src={item.classes.image}
                alt="Make a Peaceful Liv"
                className="w-full rounded-lg mb-4"
              />
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-2">{item.classes.name}</h2>
                <p className="text-gray-600 mb-4">
                  By {item.classes.instructorName}
                </p>
                <p className="text-gray-500 text-sm mb-6 flex justify-around w-full">
                  {item.classes.submitted}
                  <span>
                    {"\u20B9"}
                    {item.classes.price}
                  </span>
                </p>
                <Link
                  to={item.classes.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded flex items-center justify-center"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EnrolledClasses;
