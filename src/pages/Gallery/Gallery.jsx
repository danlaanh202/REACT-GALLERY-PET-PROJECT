import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import PhotoCard from "../../components/PhotoColumn/PhotoCard";
import PhotoCardModal from "../../components/PhotoColumn/PhotoCardModal";
import UserInfomation from "./UserInfomation";

const Gallery = () => {
  const [imageData, setImageData] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [modalIndex, setModalIndex] = useState();

  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("currentUser"))?.favorite
  );

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  useEffect(() => {
    const getImage = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/image/${id}`)
          .then((response) => {
            setImageData(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getImage();
    setFavorite(JSON.parse(localStorage.getItem("currentUser"))?.favorite);
  }, []);
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
      } catch (err) {}
    };
    likeSend();
  }, [favorite]);
  return (
    <>
      {isShowing && (
        <PhotoCardModal
          data={imageData}
          modalIndex={modalIndex}
          setModalIndex={setModalIndex}
          setIsShowing={setIsShowing}
          imageId={imageData[modalIndex]?._id}
          isShowing={isShowing}
          favorite={favorite}
          setFavorite={setFavorite}
        />
      )}
      <Navbar />
      <UserInfomation data={imageData} id={id} />
      <div className="flex justify-center">
        <div className="max-w-[1320px] flex  gap-5">
          <div className="flex flex-wrap gap-5">
            {imageData.map((item, index) => {
              return (
                <div
                  key={item._id}
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
                  {/* <PhotoCard
                    url={item.url}
                    uploader={item.uploader}
                    avatar={item.uploader_avatar}
                    name={item.uploader_name}
                    index={index}
                    key={`${item._id}-user`}
                    home={true}
                    isModalShowing={isShowing}
                    setModalShowing={setIsShowing}
                    setModalId={setModalIndex}
                  /> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
