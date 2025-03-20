import React from "react";
import Image from "next/image";
const careers = () => {
  return (
    <div className="relative w-full max-w-2xl h-64   mx-auto mt-24">
      <Image
        src="/assets/careerHomepageImage.png"
        alt="Card Image"
        layout="fill"
      />
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm">
        WITH GUMISOFTS
      </div>
    </div>
  );
};

export default careers;
