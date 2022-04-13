import UploadDemo from "../pages/createImgDemo/UploadDemo";
import Favorite from "../pages/favorite/Favorite";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import SearchPage from "../pages/searchPage/SearchPage";
import Signup from "../pages/Signup/Signup";
import Gallery from "../pages/Gallery/Gallery";
import UserInfo from "../pages/userInfo/UserInfo";

export const routes = [
  {
    path: "/search",
    component: <SearchPage />,
  },
  {
    path: "/search/:slug",
    component: <SearchPage />,
  },
  {
    path: "/favorite",
    component: <Favorite />,
  },
  {
    path: "/user/info/:id",
    component: <UserInfo />,
  },
  {
    path: "/gallery/:id",
    component: <Gallery />,
  },
  {
    path: "/upload",
    component: <UploadDemo />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/signup",
    component: <Signup />,
  },
  {
    path: "/",
    component: <Home />,
  },
];
