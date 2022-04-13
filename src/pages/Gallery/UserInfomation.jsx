import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import { useAuthState } from "../../Context/context";

const UserInfomation = (props) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const getUser = async (id) => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/user/${id}`)
        .then((response) => {
          setData(response.data);
        });
    };
    getUser(props.id);
  }, []);
  return (
    <div className="flex flex-col md:flex-row px-3 py-14 max-w-[1320px] min-h-[300px] mx-auto w-full">
      <div className="relative flex justify-center w-[300px] h-[300px] mx-auto md:mx-0 md:w-1/2 lg:w-1/3 md:p-10">
        <img
          src={
            data.avatar ||
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          }
          alt="Avatar"
          className="md:w-[180px] md:h-[180px]   cursor-pointer object-cover w-full h-full rounded-full border-2 border-black"
        />
      </div>
      <div className="flex flex-col justify-center gap-3 md:gap-5 w-full mt-5 md:mt-0  md:w-[70%]">
        <h1 className="px-5 text-5xl font-semibold text-center md:text-left">
          {data.name || data.username}
        </h1>
        <div className="px-5 ">{data.description}</div>
        {!data?.link && (
          <a href="" className="px-5 text-gray-500">
            oppo.com/en/events/reno-academy
          </a>
        )}
      </div>
    </div>
  );
};

export default UserInfomation;
