import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import student from "../../assets/classes/rahulDeb.jpg";
const StudentReviewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [students, setStudents] = useState([
    {
      id: 1,
      image: student,
      name: "John Doe",
      course: "Web Development",
      feedback:
        "The instructors were amazing and the course content was top-notch. Highly recommended!",
    },
    {
      id: 2,
      image: student,
      name: "Jane Smith",
      course: "Data Science",
      feedback:
        "This course has been a game-changer for my career. The instructors are knowledgeable and the hands-on projects were invaluable.",
    },
    {
      id: 3,
      image: student,
      name: "Mike Johnson",
      course: "Machine Learning",
      feedback:
        "I was impressed by the level of detail and the practical approach taken in this course. The instructors really know their stuff.",
    },
    {
      id: 3,
      image: student,
      name: "Mike Johnson",
      course: "Java Developer",
      feedback:
        "I was struck by the thoroughness and hands-on nature of this course. The teachers are truly knowledgeable.",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % students.length);
    }, 4000); // Auto slide every 2 seconds

    return () => clearInterval(interval);
  }, [students.length]);

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + students.length) % students.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % students.length);
  };

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Student Reviews</h2>
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 focus:outline-none"
              onClick={handlePrevious}
            >
              <FaArrowLeft />
            </button>
            <div className="review flex justify-center w-full md:w-3/5">
              <div className="bg-white shadow-md rounded-lg w-full md:w-3/4 lg:w-3/4">
                <div className="flex items-center p-6">
                  <img
                    src={students[currentIndex].image}
                    alt={students[currentIndex].name}
                    className="rounded-full w-16 h-16 mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-medium">
                      {students[currentIndex].name}
                    </h3>
                    <p className="text-gray-500">
                      {students[currentIndex].course}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700">
                    {students[currentIndex].feedback}
                  </p>
                </div>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 focus:outline-none"
              onClick={handleNext}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReviewsSlider;
