import axios from "axios";
import React, { useEffect, useState } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";

const UserAbout = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({}); //Data lưu lại current user
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //For Photo Input change
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleEditInfo = () => {
    setEdit((prev) => !prev);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      updateUser();
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };

    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };
  const updateUser = async () => {
    try {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/user/info/${data._id}`, {
          ...data,
          name: name,
          description: description,
        })
        .then((response) => {
          localStorage.setItem("currentUser", JSON.stringify(response.data));
          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };
  const uploadImage = async (base64EncodedImage) => {
    try {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/user/info/${data._id}`, {
          ...data,
          avatar: base64EncodedImage,
          name: name,
          description: description,
        })
        .then((response) => {
          localStorage.setItem("currentUser", JSON.stringify(response.data));

          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setName(user?.name);
    setDescription(user?.description);
    setData(user);
  }, []);
  return (
    <div className="pt-10 w-full mx-auto  md:max-w-[700px]">
      <div className="flex flex-col items-center gap-5 ">
        {/* <h1 className="text-6xl font-semibold">About</h1> */}

        {!edit ? (
          <>
            <div className="">
              <img
                src={
                  data?.avatar ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                }
                alt=""
                className="w-[150px] h-[150px] border border-black object-cover rounded-full "
              />
            </div>
            <div className="">
              <span className="font-medium md:text-xl text-md ">
                Username:{" "}
              </span>

              <span className="font-medium md:text-xl text-md ">
                {data?.username}
              </span>
            </div>
            <div>
              <span className="font-medium md:text-xl text-md ">Name: </span>
              <span className="font-medium md:text-xl text-md ">
                {data?.name}
              </span>
            </div>
            <div>
              <span className="font-medium md:text-xl text-md ">Email: </span>
              <span className="font-medium md:text-xl text-md ">
                {data?.email}
              </span>
            </div>
            <div>
              <span className="font-medium md:text-xl text-md ">
                description:
              </span>
              <span className="font-medium md:text-xl text-md ">
                {data?.description}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="">
              <img
                src={
                  previewSource
                    ? previewSource
                    : data.avatar ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                }
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover"
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col gap-5"
            >
              <div className="flex items-center justify-end gap-x-3">
                <label htmlFor="name">Name: </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  id="name"
                  type="text"
                  className="px-5 py-3 border border-gray-300"
                  placeholder="Type your name"
                  defaultValue={data?.name}
                />
              </div>
              <div className="flex items-center justify-end gap-x-3">
                <label htmlFor="description">Description: </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  id="description"
                  type="text"
                  className="h-40 px-8 py-3 border border-gray-300"
                  placeholder="Type your description"
                  defaultValue={data?.description}
                />
              </div>
              <div className="absolute flex flex-col items-center justify-end translate-x-7 -top-12 left-1/2 gap-x-3">
                <label
                  className="p-2 text-black bg-gray-200 rounded-lg cursor-pointer"
                  htmlFor="avatar"
                >
                  <PhotoCameraIcon />
                </label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  className="absolute w-3 h-3 opacity-0"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="px-5 py-2 bg-gray-300 rounded-lg"
                >
                  Confirm edit
                </button>
              </div>
            </form>
          </>
        )}
        {!edit && (
          <button
            onClick={handleEditInfo}
            className="px-5 py-2 bg-gray-300 rounded-lg"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default UserAbout;
