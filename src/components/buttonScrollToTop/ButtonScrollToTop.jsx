import React, { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ButtonScrollToTop = () => {
  const [show, setShow] = useState(true);
  const showController = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", showController);
    return () => {
      window.removeEventListener("scroll", showController);
    };
  }, []);

  return (
    <div className={`sticky bottom-16 ${show ? "" : "hidden"}`}>
      <button
        onClick={handleScroll}
        className="absolute p-3 text-white bg-black opacity-50 right-4 "
      >
        <ArrowUpwardIcon />
      </button>
    </div>
  );
};

export default ButtonScrollToTop;
