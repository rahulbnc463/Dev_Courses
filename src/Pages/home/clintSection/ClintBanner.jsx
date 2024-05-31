import React from "react";

const ClintBanner = () => {
  return (
    <div className="bg-primary p-9">
      <div className="grid grid-cols-4 gap-2">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-2">21M+</h2>
          <p>Visitor</p>
        </div>
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-2">1M+</h2>
          <p>Subscriber</p>
        </div>
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-2">380k+</h2>
          <p>Students</p>
        </div>
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-2">97%</h2>
          <p>Success stories</p>
        </div>
      </div>
    </div>
  );
};

export default ClintBanner;
