import React from "react";
import banner1 from "../../../assets/home/banner2.jpg";
const Container2 = () => {
  return (
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: `url(${banner1})` }}
    >
      <div className="min-h-screen flex justify-start items-center pl-11 text-white bg-black bg-opacity-60">
        <div>
          <div className="space-y-4">
            <p className="md:text-4xl text-2xl">Dev Team Provide</p>
            <h1 className="md:text-7xl text-4xl font-bold">
              Let's start Your Journey
            </h1>
            <div className="md:w-1/2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                aperiam error expedita libero officiis nulla vel repellat
                molestiae et velit quam dolore modi, dolorum impedit minima
                fuga, alias exercitationem nam.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <button className="px-7 py-3 rounded-lg bg-secondary font-bold uppercase">
                Start Now
              </button>
              <button className="px-7 py-3 rounded-lg border hover:bg-primary transition ease-in-out duration-300 font-bold uppercase">
                View Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container2;
