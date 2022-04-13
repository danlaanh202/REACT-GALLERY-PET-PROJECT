import axios from "axios";
import React, { useEffect } from "react";
import ButtonScrollToTop from "../components/buttonScrollToTop/ButtonScrollToTop";
import CategoryNav from "../components/categoryNav/CategoryNav";
import Highlight from "../components/Highlight/Highlight";
import Navbar from "../components/navbar/Navbar";
import PhotoList from "../components/PhotoList/PhotoList";
import Search from "../components/search/Search";

const Home = () => {
  return (
    <div>
      <Navbar search={true} />
      <Highlight />
      <div className="w-screen md:hidden">
        <Search />
      </div>
      <PhotoList />
      <ButtonScrollToTop />
    </div>
  );
};

export default Home;
