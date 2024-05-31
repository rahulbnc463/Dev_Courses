import { Link } from "react-router-dom";
import {
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillGithub,
} from "react-icons/ai";
import demo from "../../assets/error/instructor_demo.png";
const CardAll_instructor = ({ instructor }) => {
  return (
    <div className="flex border dark:text-white hover:translate-y-2 duration-200 cursor-pointer flex-col shadow-md md:px-8 px-10 py-8 rounded-md">
      <div className="flex flex-col gap-6 md:gap-8">
        <img
          className="rounded-full border-4 h-24 w-24 mx-auto border-secondary border-600"
          src={instructor?.image || `${demo}`}
          alt="404 instructor img"
        />
        <div className="flex flex-col text-center">
          <p className="font-medium text-lg dark:text-white text-gray-800">
            {instructor?.name}
          </p>
          <p className="text-gray-500 whitespace-nowrap">Instructor</p>
          <p className="text-gray-500 whitespace-nowrap">
            Address: {instructor?.address}
          </p>
          <p className="text-gray-500 whitespace-nowrap mb-4">
            Email: {instructor?.email}
          </p>
          <p className="whitespace-nowrap flex justify-center text-secondary text-2xl mb-4">
            <Link to={instructor?.linkedin} target="_blank">
              <AiFillLinkedin />
            </Link>
            <Link
              to={instructor?.linkedin}
              target="_blank"
              className="ml-2 mr-2"
            >
              <AiFillTwitterCircle />
            </Link>
            <Link to={instructor?.linkedin} target="_blank">
              <AiFillGithub />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardAll_instructor;
