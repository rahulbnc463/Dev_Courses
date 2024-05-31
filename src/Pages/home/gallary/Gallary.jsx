import React from "react";
import img1 from "../../../assets/gallary/image1.jpg";
import ImageGrid from "./ImageGrid";

const Gallary = () => {
  return (
    <div className="md:w-[80%] mx-auto my-28">
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-center dark:text-white">
          Our <span className="text-secondary">Record</span>
        </h1>
      </div>

      {/* Image Container  */}
      <div className="md:grid grid-cols-2 items-center justify-center  gap-4">
        <div className="mb-4 md:mb-0">
          <img
            src={img1}
            alt="gallery img"
            className="md:h-[720px] w-full mx-auto rounded-sm"
          />
        </div>

        <ImageGrid />
      </div>
    </div>
  );
};

export default Gallary;
