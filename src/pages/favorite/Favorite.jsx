import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import PhotoCard from "../../components/PhotoColumn/PhotoCard";
import PhotoCardModal from "../../components/PhotoColumn/PhotoCardModal";

import { mockData } from "../../mock/mockdata";
const Favorite = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [modalIndex, setModalIndex] = useState();
  const [favoriteImageData, setFavoriteImageData] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(
    JSON.parse(localStorage.getItem("currentUser"))?.favorite
  );

  useEffect(() => {
    const getImage = async () => {
      try {
        await axios
          .post(`${process.env.REACT_APP_API_URL}/image/getfavoriteimage`, {
            favoriteIds: favoriteIds,
          })
          .then((response) => {
            setFavoriteImageData(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getImage();
    setFavorite(JSON.parse(localStorage.getItem("currentUser"))?.favorite);
  }, [favoriteIds]);
  useEffect(() => {
    const likeSend = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));

        await axios
          .put(`${process.env.REACT_APP_API_URL}/user/favorite`, {
            id: user._id,
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

  return (
    <>
      {isShowing && (
        <PhotoCardModal
          data={favoriteImageData}
          modalIndex={modalIndex}
          setModalIndex={setModalIndex}
          setIsShowing={setIsShowing}
          isShowing={isShowing}
          favorite={favorite}
          setFavorite={setFavorite}
          imageId={favoriteImageData[modalIndex]?._id}
        />
      )}
      <div className="w-screen">
        <Navbar search={true} />
        <div className="md:max-w-[1320px] border-b-2 border-gray-500 shadow-md my-10  mx-auto">
          <span className="ml-5 text-3xl font-medium lg:ml-0">Favorite</span>
        </div>
        <div className="md:max-w-[1320px] mx-auto">
          <div className="flex flex-wrap w-full gap-5 lg:flex">
            {favoriteImageData.map((item, index) => {
              return (
                <div
                  key={item.url}
                  className="lg:w-[calc(33.3%-1.25rem)] md:w-[calc(50%-1.25rem)] w-full"
                >
                  <PhotoCard
                    userId={item.uploader_id}
                    url={item.url}
                    uploader={item.uploader}
                    avatar={item.uploader_avatar}
                    name={item.uploader_name}
                    index={index}
                    imageId={item._id}
                    key={item._id}
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
        </div>
      </div>
    </>
  );
};

export default Favorite;
