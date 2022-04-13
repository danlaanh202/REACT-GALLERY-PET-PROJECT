import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

export default function UploadDemo() {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const handleCategoryChange = (e) => {
    const tempCat = e.target.value.split(",").map((item) => {
      return item.trim();
    });
    setCategory(tempCat);
  };
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

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    const userData = JSON.parse(localStorage.getItem("currentUser"));

    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/upload`, {
          data: base64EncodedImage,
          uploader: userData,
          category: category,
        })
        .then((response) => {
          console.log(response);
          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="w-full h-screen overflow-hidden ">
        <Navbar isFixed={true} search={false} />
        <div className="w-full h-full ">
          <div className="flex items-center  w-full h-full gap-5 bg-[url('https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-no-repeat bg-cover">
            <div className="flex flex-col items-center gap-10 px-5 py-5 mx-auto bg-black rounded-lg md:min-w-[500px] bg-opacity-70">
              <h1 className="text-3xl font-bold text-white">Upload an Image</h1>
              <form
                onSubmit={handleSubmitFile}
                className="flex flex-col items-center justify-center w-3/4 gap-10"
              >
                <div className="relative flex flex-col items-center justify-center w-full h-32 gap-5 border-2 border-white border-dashed">
                  <label htmlFor="fileInput" className="absolute text-white">
                    Choose Photo
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="absolute inset-0 opacity-0"
                  />
                </div>
                {previewSource && (
                  <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: "100px" }}
                  />
                )}
                <div className="">
                  <input
                    name="category"
                    id="category"
                    placeholder="Nhap category"
                    className="px-3 py-5 bg-white "
                    onChange={handleCategoryChange}
                  />
                </div>
                <button
                  className="px-6 py-3 mb-5 text-xl bg-white rounded-lg hover:bg-gray-300"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
