import React, { useEffect, useRef, useState } from "react";
import { useHover } from "../../hooks/useHover";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CollectionsIcon from "@mui/icons-material/Collections";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryNav from "../categoryNav/CategoryNav";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import { useAuthDispatch } from "../../Context/context";
import { logout } from "../../Context/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useClickOutside } from "../../hooks/useClickOutside";

const Navbar = (props) => {
  // const location = useLocation();
  const [user, setUser] = useState();
  const dispatch = useAuthDispatch();
  // const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const { hovered, setHovered, nodeRef } = useHover();
  const {
    show: showButton,
    setShow: setShowButton,
    nodeRef: showRef,
  } = useClickOutside();
  const handleShowButton = (e) => {
    setShowButton((prev) => !prev);
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  return (
    <>
      <div
        className={`flex sticky md:top-0 z-[1000] items-center justify-between px-6 py-2 bg-white border-b shadow-md ${
          props.isFixed ? " top-0 left-0 right-0" : ""
        } `}
      >
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            version="1.1"
            aria-labelledby="unsplash-home"
            aria-hidden="false"
          >
            <title>Unsplash Home</title>
            <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
          </svg>
        </div>
        <div className="relative flex items-center justify-center lg:w-3/4 md:w-2/4">
          <h1 className="text-xl font-semibold md:hidden">Unplash</h1>
          {props.search && (
            <>
              <svg
                className="absolute hidden w-6 h-6 md:top-0 translate-y-2/4 md:left-3 md:block"
                fill="black"
                viewBox="0 0 16 16"
                width="1em"
                height="1em"
              >
                <g fillRule="evenodd" transform="translate(-448 -544)">
                  <g fillRule="nonzero">
                    <path
                      d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z"
                      transform="translate(448 544)"
                    ></path>
                    <path
                      d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z"
                      transform="translate(448 544)"
                    ></path>
                    <path
                      d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z"
                      transform="translate(448 544)"
                    ></path>
                    <path
                      d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z"
                      transform="translate(448 544)"
                    ></path>
                  </g>
                </g>
              </svg>

              <input
                type="text"
                className="hidden w-full py-3 pr-3 text-black bg-gray-300 focus:bg-white md:block md:pl-12 rounded-xl"
                placeholder="Search your image..."
              />
            </>
          )}
        </div>
        <div className="relative z-[100]" ref={nodeRef}>
          {user && user.username ? (
            <>
              <div
                onClick={() => {
                  setHovered(!hovered);
                }}
                className="flex items-center gap-x-2 z-[100]"
              >
                <img
                  src={
                    user.avatar ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                  }
                  alt=""
                  className="object-cover w-10 h-10 rounded-full shadow-lg cursor-pointer"
                />
              </div>
              <div
                className={` absolute flex gap-y-3 rounded-b-lg right-0 min-w-[200px] items-center flex-col text-black bg-gray-300 top-full translate-y-3 max-w-[500px] ${
                  hovered ? "" : "hidden"
                }`}
              >
                <div className="absolute -top-8 right-0 border-[20px] border-l-transparent border-r-transparent border-t-transparent border-gray-300"></div>
                <div className="w-full py-3 text-center border-b border-gray-400 ">
                  Hi, {user.username}
                </div>
                <div className="flex flex-col items-center w-full cursor-pointer gap-y-2 ">
                  <Link
                    className="flex items-center justify-center w-full py-3 gap-x-1 hover:bg-gray-500"
                    to={`/gallery/${user._id}`}
                  >
                    <CollectionsIcon />
                    <span>Gallery</span>
                  </Link>

                  <Link
                    to="/upload"
                    className="flex items-center justify-center w-full py-3 gap-x-1 hover:bg-gray-500"
                  >
                    <AddIcon />
                    <span>Upload</span>
                  </Link>

                  <Link
                    to={`/user/info/${user._id}`}
                    className="flex items-center justify-center w-full py-3 gap-x-1 hover:bg-gray-500"
                  >
                    <InfoIcon />
                    <span>My info</span>
                  </Link>

                  <Link
                    to="/favorite"
                    className="flex items-center justify-center w-full py-3 gap-x-1 hover:bg-gray-500"
                  >
                    <FavoriteBorderIcon />
                    <span>Favorite</span>
                  </Link>
                </div>
                <button
                  onClick={() => {
                    logout(dispatch);

                    window.location.reload();
                  }}
                  className="flex items-center justify-center w-full py-3 gap-x-1 hover:bg-gray-500"
                >
                  <LogoutIcon />
                  <span>Log out</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="relative w-10 h-8 transition-all bg-black rounded-md cursor-pointer menu-container">
                <div
                  className="absolute block w-full h-full"
                  onClick={handleShowButton}
                  ref={showRef}
                >
                  <span
                    className={`line-1 line transition-all`}
                    style={
                      showButton
                        ? { transform: "translate(-50%, -50%) rotate(45deg)" }
                        : {}
                    }
                  ></span>
                  <span
                    className="transition-all line-2 line"
                    style={showButton ? { display: "none" } : {}}
                  ></span>
                  <span
                    className="transition-all line-3 line"
                    style={
                      showButton
                        ? { transform: "translate(-50%, -50%) rotate(-45deg)" }
                        : {}
                    }
                  ></span>
                </div>
                {showButton && (
                  <div className=" absolute flex gap-y-3 rounded-b-lg right-0 min-w-[150px] items-center flex-col text-black bg-gray-300 top-full translate-y-3 max-w-[500px]">
                    <Link
                      className="flex items-center justify-center w-full py-3 gap-x-1 hover:bg-gray-500"
                      to="/login"
                    >
                      <LoginIcon />
                      <span>Login</span>
                    </Link>
                    <Link
                      className="flex items-center justify-center w-full py-3 gap-x-1 hover:bg-gray-500"
                      to="/signup"
                    >
                      <VpnKeyIcon />
                      <span>Register</span>
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
