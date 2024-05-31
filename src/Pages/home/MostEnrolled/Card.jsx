import React from "react";
import { Link } from "react-router-dom";

const Card = ({ iteam }) => {
  const { _id, name, price, availableSeats, image, totalEnrolled } = iteam;
  //   console.log(iteam);
  //   console.log(_id);
  return (
    <div className="shadow-lg hover:translate-y-2 duration-200 rounded-lg flex flex-col justify-between border  overflow-hidden m-4">
      <img src={image} alt="classes imag error" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">{name}</h2>
        <p className="text-gray-600 mb-2 dark:text-white">
          Available Seats: {availableSeats}
        </p>
        <p className="text-gray-600 mb-2 dark:text-white">Price: {price}</p>
        <p className="text-gray-600 mb-2 dark:text-white">
          Total Enrolled: {totalEnrolled}
        </p>
        <Link to={`/api/class/${_id}`} className="text-center mt-2">
          <button className="px-2 w-full py-1 bg-secondary rounded-xl text-white font-bold mt-2">
            Let's See
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
