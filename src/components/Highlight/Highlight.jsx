import React, { useState } from "react";
import Search from "../search/Search";

const Highlight = () => {
  const [onHover, setOnHover] = useState(false);
  const handleHover = () => {};
  return (
    <div className="relative hidden md:block">
      <div className="w-full">
        <img
          src="https://images.unsplash.com/photo-1647681105535-b3d6e4f1a0b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=1&auto=format%2Ccompress&fit=crop&w=1999&h=594"
          alt=""
          className="object-cover w-full"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center w-full gap-5 ">
        <h2 className="text-3xl font-semibold text-white">Gallery</h2>

        <h3 className="text-xl text-white">The gallery project</h3>
      </div>
    </div>
  );
};

export default Highlight;
