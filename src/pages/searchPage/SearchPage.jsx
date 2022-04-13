import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import PhotoCard from "../../components/PhotoColumn/PhotoCard";

const SearchPage = () => {
  const location = useLocation();
  const [searchWord, setSearchWord] = useState();
  const [isShowing, setIsShowing] = useState(false);
  const [modalIndex, setModalIndex] = useState();
  const [favorite, setFavorite] = useState();
  // const [favoriteIds, setFavoriteIds] = useState(
  //   JSON.parse(localStorage.getItem("currentUser"))?.favorite
  // );
  useEffect(() => {
    setSearchWord(location.pathname.split("/")[2]);
    // console.log(searchWord);
  }, []);
  return (
    <div className="w-screen">
      <Navbar search={true} />
      <div className="md:max-w-[1320px] border-b-2 border-gray-500 shadow-md my-10  mx-auto">
        <span className="ml-5 text-3xl font-medium lg:ml-0">
          Search: {searchWord}
        </span>
        <div className="md:max-w-[1320px] mx-auto">
          <div className="flex flex-wrap w-full gap-5 lg:flex">
            {[].map((item, index) => {
              return (
                <div className="lg:w-[calc(33.3%-1.25rem)] md:w-[calc(50%-1.25rem)]">
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
    </div>
  );
};

export default SearchPage;
