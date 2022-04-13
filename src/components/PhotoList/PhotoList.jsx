import React, { useEffect, useState } from "react";
import PhotoCol from "../PhotoColumn/PhotoCol";

const PhotoList = () => {
  return (
    <div className="mt-5 md:flex md:justify-center md:my-10">
      <div className="md:max-w-[1320px]">
        <div className="flex gap-x-6 ">
          <PhotoCol />
        </div>
      </div>
    </div>
  );
};

export default PhotoList;
