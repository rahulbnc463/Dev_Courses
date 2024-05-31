import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const CardClasses = ({ data, handleSelect, role }) => {
  return (
    <div className="bg-white dark:bg-black dark:text-white dark:border-2 shadow-md duration-300 hover:scale-105 cursor-pointer rounded-lg overflow-hidden">
      <div className="relative">
        <div className="group">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-48 object-cover group-hover:blur-sm duration-300"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => handleSelect()}
              title={
                role === "admin" || role === "instructor"
                  ? "Instructor/Admin can not be able to select"
                  : data.availableSeats < 1
                  ? "No Seat Available"
                  : "You can select Classes"
              }
              disabled={
                role === "admin" ||
                role === "instructor" ||
                data.availableSeats < 1
              }
              className="bg-primary hover:bg-secondary text-white transition-colors duration-200 font-bold py-4 px-7 rounded opacity-1"
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-md">
          ${data.price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2">{data.name}</h3>
        <p className="text-gray-600 mb-1">Instructor : {data.instructorName}</p>
        <p className="text-gray-600 mb-4">Enrolled : {data.totalEnrolled}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-blue-500 mr-1">Available Seats:</span>
            <span>{data.availableSeats}</span>
          </div>
          <Link
            to={`/api/class/${data._id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            View
          </Link>
        </div>
      </div>
      <div className="bg-gray-100 px-6 py-4 flex justify-center space-x-4">
        <Link to={"#"} className="text-blue-500 hover:text-blue-700">
          <FaFacebookF />
        </Link>
        <Link to={"#"} className="text-blue-500 hover:text-blue-700">
          <FaInstagram />
        </Link>
        <Link to={"#"} className="text-blue-500 hover:text-blue-700">
          <FaTwitter />
        </Link>
        <Link to={"#"} className="text-blue-500 hover:text-blue-700">
          <FaGithub />
        </Link>
      </div>
    </div>
  );
};

export default CardClasses;
