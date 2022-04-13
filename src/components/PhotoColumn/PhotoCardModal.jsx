import React, { Fragment, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
const PhotoCardModal = ({
  isShowing,
  setIsShowing,
  data,
  modalIndex,
  setModalIndex,
  favorite,
  setFavorite,
  imageId,
}) => {
  const modalRef = useRef(null);

  const handleDownload = (url) => {
    window.open(url, "_blank").focus();
  };
  const handleIncreaseId = () => {
    if (modalIndex == data.length - 1) {
      return;
    }
    setModalIndex((prev) => prev + 1);
  };
  const handleDecreaseId = () => {
    if (modalIndex == 0) {
      return;
    }
    setModalIndex((prev) => prev - 1);
  };
  const handleIncreaseOrDecrease = (e) => {
    if (isShowing) {
      switch (e.which) {
        case 37: {
          handleDecreaseId();
          break;
        }
        case 39: {
          handleIncreaseId();
          break;
        }
        default: {
          break;
        }
      }
    }
  };
  const handleLike = () => {
    // console.log("e.target ~", imageId);

    setFavorite((prev) => {
      if (prev.includes(imageId)) {
        const temp = [...prev];

        const index = prev.indexOf(imageId);
        temp.splice(index, 1);
        return temp;
      } else {
        return [...prev, imageId];
      }
    });
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (isShowing) {
        if (
          modalRef.current &&
          !modalRef.current.contains(e.target) &&
          !e.target.matches("button")
        ) {
          setIsShowing(false);
        }
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      onKeyDown={handleIncreaseOrDecrease}
      className={`z-[100000] h-screen flex justify-center no-scrollbar fixed top-0  left-0 right-0   bg-gray-700 bg-opacity-50 overflow-x-hidden  ${
        !isShowing ? "hidden" : " "
      }`}
      tabIndex={`${isShowing ? "0" : ""}`}
    >
      <div className="fixed text-white cursor-pointer left-3 top-3 ">
        <CloseIcon />
      </div>

      <div
        ref={modalRef}
        className="flex flex-col justify-between w-4/5 h-screen p-5 my-10 bg-gray-200 "
      >
        <button
          className={`absolute text-white cursor-pointer right-0 px-10  top-[50vh] ${
            modalIndex === data.length - 1
              ? "opacity-0 pointer-events-none"
              : ""
          }`}
        >
          <ArrowForwardIosIcon onClick={handleIncreaseId} />
        </button>
        <button
          className={`absolute text-white cursor-pointer px-10 left-0  top-[50vh] ${
            modalIndex === 0 ? "opacity-0 pointer-events-none" : ""
          }`}
        >
          <ArrowBackIosNewIcon onClick={handleDecreaseId} />
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5 cursor-pointer">
            <img
              src={data[modalIndex]?.uploader_avatar}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <span className="text-xl font-medium opacity-70 hover:opacity-100">
              {data[modalIndex]?.uploader_name}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={handleLike}
              className={`px-3 py-1 bg-white rounded-lg ${
                favorite?.includes(imageId)
                  ? "text-white bg-red-500"
                  : "text-gray-700"
              }`}
            >
              <FavoriteBorderIcon />
            </button>
            <button className="px-3 py-1 bg-white rounded-lg">
              <AddIcon />
            </button>
            <button
              onClick={() => handleDownload(data[modalIndex]?.url)}
              className="p-2 bg-gray-100 border border-black rounded-md"
            >
              DownLoad
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-5 ">
          <img
            src={data[modalIndex]?.url}
            alt=""
            className="max-h-[75vh] border shadow-md "
          />
        </div>
        <div className="flex gap-10 mt-5 ">
          <div className="flex flex-col">
            <span>Views</span>
            <span>11.250</span>
          </div>
          <div className="flex flex-col">
            <span>Downloads</span>
            <span>500</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCardModal;
