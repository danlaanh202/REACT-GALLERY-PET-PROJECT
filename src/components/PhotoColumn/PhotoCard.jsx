import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import axios from "axios";

const PhotoCard = ({
  userId,
  index,
  url,
  name,
  uploader,
  avatar,
  isModalShowing,
  imageId,
  setModalId,
  setModalShowing,
  favorite,
  setFavorite,
}) => {
  const navigate = useNavigate();

  const [hoverShow, setHoverShow] = useState(false);

  const handleLike = () => {
    if (!JSON.parse(localStorage.getItem("currentUser"))?.username) {
      return;
    }
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

  // setIsShowing(true);
  const handleDownload = (url) => {
    window.open(url, "_blank").focus();
  };
  const handleMouseEnter = () => {
    setHoverShow(true);
  };
  const handleMouseLeave = () => {
    setHoverShow(false);
  };

  return (
    <>
      <div
        className={`relative mb-10 `}
        id={index}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        key={url}
      >
        {hoverShow && (
          <div className="hidden md:block">
            <div
              className="absolute inset-0 bg-black opacity-50 cursor-zoom-in "
              onClick={() => {
                setModalShowing(true);
                setModalId(index);
              }}
            ></div>

            <div className="absolute flex gap-2 top-5 right-5">
              <button
                onClick={handleLike}
                className={`px-3 py-1 bg-white  rounded-lg  ${
                  favorite?.includes(imageId)
                    ? "text-white bg-red-500"
                    : "text-gray-700 md:hover:text-black"
                }`}
              >
                <FavoriteOutlinedIcon />
              </button>
              <button className="px-3 py-1 bg-white rounded-lg">
                <AddIcon />
              </button>
            </div>
            <div className="absolute right-5 bottom-5">
              <button
                onClick={() => handleDownload(url)}
                className="px-3 py-1 text-gray-500 bg-white rounded-lg md:hover:text-black"
              >
                <FileDownloadIcon />
              </button>
            </div>
            <div
              onClick={() => navigate(`/gallery/${userId}`)}
              className="absolute flex items-center gap-x-3 left-5 bottom-5"
            >
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={avatar}
                alt=""
              />
              <span className="text-xl font-medium text-white cursor-pointer">
                {name || uploader}
              </span>
            </div>
          </div>
        )}

        <div
          onClick={() => navigate(`/gallery/${userId}`)}
          className="flex items-center gap-5 px-5 py-2 md:hidden"
        >
          <div className="flex items-center w-8 h-8 rounded-full cursor-pointer">
            <img src={avatar} alt="" className="w-full h-full rounded-full" />
          </div>
          <h1 className="text-xl font-semibold text-gray-600 cursor-pointer hover:text-black">
            {name}
          </h1>
        </div>
        <img src={url} alt="" className="object-cover w-full" />
        <div className="flex items-center justify-between px-5 py-5 border-b border-black md:hidden">
          <div className="flex gap-3">
            <button
              onClick={handleLike}
              className={`p-2  border border-gray-500 rounded-lg md:hover:bg-red-300 ${
                favorite?.includes(imageId)
                  ? "text-white bg-red-500"
                  : "text-gray-700"
              }`}
            >
              <FavoriteOutlinedIcon />
            </button>
            <button className="p-2 bg-gray-100 border border-gray-500 rounded-lg">
              <AddIcon />
            </button>
          </div>
          <div className="">
            <button
              onClick={() => handleDownload(url)}
              className="p-2 bg-gray-100 border border-black rounded-md"
            >
              DownLoad
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoCard;
