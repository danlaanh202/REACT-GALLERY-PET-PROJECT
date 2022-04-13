import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/formcomponent/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HomeIcon from "@mui/icons-material/Home";
import { loginUser } from "../../Context/actions";
import { useAuthDispatch } from "../../Context/context";

const schema = yup.object({
  username: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
});
const Login = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const currentUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))?.username
    : "";
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    getValues,
    control,
    reset,
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const handleLogin = (e) => {
    if (!isValid) {
      return;
    }
    const { username, password } = getValues();
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          await axios
            .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
              username,
              password,
            })
            .then((response) => {
              console.log(response);
              localStorage.setItem(
                "currentUser",
                JSON.stringify(response.data)
              );
            });
        } catch (err) {
          setErrorMsg(err.response.data);
        }
        resolve();

        // reset({
        //   username: "",
        //   password: "",
        //   email: "",
        // });
      }, 1000);
    });
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);
  return (
    <div className="relative flex items-center bg-no-repeat bg-cover justify-center h-screen bg-[url('https://images.unsplash.com/photo-1649452815618-1f359a5b3d14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')]">
      {errorMsg && (
        <div className="absolute top-0 w-full py-3 font-medium text-center text-white bg-red-500 lg:text-xl">
          {errorMsg}
        </div>
      )}
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-3/4 p-10 bg-white rounded-lg bg-opacity-80 lg:w-1/3 md:w-1/2"
      >
        <div className="text-center">
          <Link className="font-semibold " to="/">
            <HomeIcon className="" style={{ fontSize: "50px" }} />
          </Link>
        </div>
        <h1 className="my-5 text-2xl font-semibold text-black">Login</h1>
        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="username" className="cursor-pointer text-md">
            Username:
          </label>
          <Input
            id="username"
            name="username"
            placeholder="Enter your username"
            control={control}
            error={errors.username}
          />
          {errors.username && (
            <p className="text-base text-red-500 ">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-5">
          <div className="flex justify-between">
            <label
              htmlFor="password"
              className="text-sm cursor-pointer md:text-md"
            >
              Password:
            </label>
            <Link
              tabIndex="-1"
              className="text-sm text-blue-500 underline md:text-md hover:text-black"
              to=""
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            control={control}
            error={errors.password}
          />
          {errors.password && (
            <p className="text-base text-red-500 ">{errors.password.message}</p>
          )}
        </div>

        <button
          className={`w-full p-3 bg-blue-500 text-white rounded-lg mt-5 font-semibold hover:bg-blue-700 ${
            isSubmitting ? "opacity-50" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 mx-auto border-2 border-white rounded-full border-r-transparent animate-spin"></div>
          ) : (
            "Submit"
          )}
        </button>
        <div className="py-3">
          <span className="">You don't have an account? </span>
          <Link className="text-blue-700 underline" to="/signup">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
