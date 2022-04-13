import React, { useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const mockCategory = [
  "Act For Nature",
  "Color of Water",
  "Current Events",
  "Wallpapers",
  "3D Renders",
  "Textures & Patterns",
  "Experimental",
  "Architecture",
  "Nature",
  "Business & Work",
  "Fashion",
  "Film",
  "Food & Drink",
  "Health & Wellness",
  "People",
  "Interiors",
  "Street Photography",
];

const CategoryNav = () => {
  const sliderRef = useRef();
  const [translateX, setTranslateX] = useState(0);
  const [leftShow, setLeftShow] = useState(false);
  const [rightShow, setRightShow] = useState(true);
  const [prevBorder, setPrevBorder] = useState();
  const sliderCurrent = sliderRef.current;

  const handleDirectionSlider = (direction) => {
    if (direction === "right") {
      setTranslateX((prev) => prev - 50);
    } else {
      setTranslateX((prev) => prev + 50);
    }
  };
  const handleChooseCategory = (e) => {
    sliderRef.current.querySelectorAll("span").forEach((item, index) => {
      item.style.borderBottom = "";
    });
    e.target.style.borderBottom = "2px solid black";
  };

  useEffect(() => {
    sliderRef.current.style.transform = `translateX(${translateX}px)`;
    if (sliderRef.current?.getBoundingClientRect()?.x > 50) {
      setLeftShow(false);
    } else if (sliderRef.current?.getBoundingClientRect()?.x < -390) {
      setRightShow(false);
    } else {
      setRightShow(true);
      setLeftShow(true);
    }
  }, [translateX]);

  return (
    <div className="flex shadow-md">
      <div className="z-50 bg-white border-b-2 border-black">
        <div className="p-3 md:border-r-2 md:p-5">Editorial</div>
      </div>
      <div className="relative flex overflow-x-auto no-scrollbar md:gap-x-3 ">
        <ChevronLeftIcon
          onClick={(e) => handleDirectionSlider("left")}
          className={`absolute  cursor-pointer top-[30%] left-3  ${
            leftShow ? "z-40" : "text-white z-0 pointer-events-none"
          } `}
        />
        <span
          className={`absolute top-0 flex-shrink-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent ${
            leftShow ? "z-30" : "hidden"
          }`}
        ></span>
        <div ref={sliderRef} className="z-10 flex transition-all no-scrollbar">
          {mockCategory.map((item, index) => {
            return (
              <span
                className="flex-shrink-0 p-3 cursor-pointer md:p-5"
                onClick={handleChooseCategory}
                key={item}
              >
                {item}
              </span>
            );
          })}
        </div>
        <span
          className={`absolute top-0 right-0 hidden md:block  flex-shrink-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent
          ${rightShow ? "md:z-10" : "md:hidden"}
        `}
        ></span>
        <ChevronRightIcon
          onClick={(e) => handleDirectionSlider("right")}
          className={`absolute cursor-pointer right-3 text-white z-0 pointer-events-none  md:top-[30%] ${
            rightShow
              ? "md:z-40"
              : "md:text-white md:z-0 md:pointer-events-none"
          }`}
        />
      </div>
    </div>
  );
};

export default CategoryNav;
