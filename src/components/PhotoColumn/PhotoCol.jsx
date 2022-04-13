import axios from "axios";
import React, { useEffect, useState } from "react";

import PhotoCard from "./PhotoCard";
import PhotoCardModal from "./PhotoCardModal";

const PhotoCol = ({ id }) => {
  const [limit, setLimit] = useState(10);
  const [imageData, setImageData] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [modalIndex, setModalIndex] = useState();
  const [favorite, setFavorite] = useState([]);
  useEffect(() => {
    const likeSend = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        await axios
          .put(`${process.env.REACT_APP_API_URL}/user/favorite`, {
            id: user?._id,
            favorite: favorite,
          })
          .then((response) => {
            const tempUser = { ...user, favorite: response.data };
            localStorage.setItem("currentUser", JSON.stringify(tempUser));
          });
      } catch (err) {
        console.log(err);
      }
    };
    likeSend();
  }, [favorite]);
  useEffect(() => {
    const getImage = async () => {
      try {
        await axios
          .get(
            `${process.env.REACT_APP_API_URL}/image/getimage?limit=${
              limit || ""
            }`
          )
          .then((response) => {
            setImageData(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getImage();
  }, [limit]);
  useEffect(() => {
    setFavorite(JSON.parse(localStorage.getItem("currentUser"))?.favorite);
  }, []);
  return (
    <>
      {isShowing && (
        <PhotoCardModal
          setIsShowing={setIsShowing}
          isShowing={isShowing}
          data={imageData}
          modalIndex={modalIndex}
          setModalIndex={setModalIndex}
          imageId={imageData[modalIndex]?._id}
          favorite={favorite}
          setFavorite={setFavorite}
        />
      )}
      <div className="">
        <div className={`flex w-full gap-5 lg:flex flex-wrap`}>
          {imageData?.map((item, index) => {
            return (
              <div
                key={item._id}
                className="w-full lg:w-[calc(33.3%-1.25rem)] md:w-[calc(50%-1.25rem)]"
              >
                <PhotoCard
                  userId={item.uploader_id}
                  url={item.url}
                  uploader={item.uploader}
                  avatar={item.uploader_avatar}
                  name={item.uploader_name}
                  index={index}
                  imageId={item._id}
                  key={`${item._id} home`}
                  home={true}
                  isModalShowing={isShowing}
                  setModalShowing={setIsShowing}
                  setModalId={setModalIndex}
                  favorite={favorite}
                  setFavorite={setFavorite}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center my-10">
          <button
            onClick={() => setLimit((prev) => prev + 15)}
            className="p-5 font-semibold text-white bg-gray-600 border hover:bg-gray-800"
          >
            Load more photos
          </button>
        </div>
      </div>
    </>
  );
};

export default PhotoCol;
