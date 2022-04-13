import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useController, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../components/formcomponent/Input";
import HomeIcon from "@mui/icons-material/Home";

const schema = yup.object({
  username: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
  email: yup
    .string()
    .required("This field is required")
    .email("email is invalid"),
  passwordConfirmation: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
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

  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    if (!isValid) {
      return;
    }
    const { username, password, email } = getValues();
    // console.log({ username, password, email });
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          await axios
            .post(`${process.env.REACT_APP_API_URL}/auth/register`, {
              username,
              password,
              email,
            })
            .then((response) => {
              console.log(response.data);
              if (!errors) {
                navigate("/login");
              }
            });
        } catch (err) {
          if (err.response.data.code === 11000) {
            if (err.response.data.keyPattern.email) {
              setError("email", {
                type: "unique",
                message: "Email has already taken",
              });
            } else if (err.response.data.keyPattern.username) {
              setError("username", {
                type: "unique",
                message: "Username has already taken",
              });
            }
          }
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
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[url('https://images.unsplash.com/photo-1649712908546-57feb5ea45a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1636&q=80')] bg-no-repeat bg-cover">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-3/4 p-10 bg-white rounded-lg bg-opacity-80 lg:w-1/3 md:w-1/2"
      >
        <div className="text-center">
          <Link className="font-semibold " to="/">
            <HomeIcon className="" style={{ fontSize: "50px" }} />
          </Link>
        </div>
        <h1 className="my-5 text-2xl font-semibold text-black">Register</h1>
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
          <label htmlFor="password" className="cursor-pointer text-md">
            Password:
          </label>
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
        <div className="flex flex-col gap-2 mb-5">
          <label
            htmlFor="passwordConfirmation"
            className="cursor-pointer text-md"
          >
            Password confirmation:
          </label>
          <Input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            placeholder="Confirm your password"
            control={control}
            error={errors.passwordConfirmation}
          />
          {errors.passwordConfirmation && (
            <p className="text-base text-red-500 ">
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="email" className="cursor-pointer text-md">
            Email:
          </label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            control={control}
            error={errors.email}
          />
          {errors.email && (
            <p className="text-base text-red-500 ">{errors.email.message}</p>
          )}
        </div>

        <button
          className={`w-full p-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg mt-5 font-semibold ${
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
          <span className="">Already have an account? </span>
          <Link className="text-blue-700 underline" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
