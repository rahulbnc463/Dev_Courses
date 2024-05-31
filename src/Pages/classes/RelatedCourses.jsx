import React from "react";

const RelatedCourses = () => {
  const courses = [
    {
      title: "Greatest Passion In...",
      price: 38.0,
      image:
        "https://inzint.com/wp-content/uploads/2023/02/Features-of-Mern-stack-development-services-You-Should-Know-1.png",
    },
    {
      title: "Greatest Passion In...",
      price: 38.0,
      image:
        "https://miro.medium.com/v2/resize:fit:1400/1*Hm-G7dLwMZtLOPWbL6nkww.jpeg",
    },
    {
      title: "Greatest Passion In...",
      price: 38.0,
      image:
        "https://miro.medium.com/v2/resize:fit:1400/1*Hm-G7dLwMZtLOPWbL6nkww.jpeg",
    },
    {
      title: "Greatest Passion In...",
      price: 38.0,
      image:
        "https://cdn.educba.com/academy/wp-content/uploads/2023/08/MERN-Stack.jpg",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Related Courses</h2>
      <div className="">
        {courses.map((course, index) => (
          <div
            key={index}
            className="rounded-lg items-center border-b overflow-hidden flex"
          >
            <div className="w-30">
              <img
                src={course.image}
                alt={course.title}
                className="w-40 h-30 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-secondary">${course.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;
