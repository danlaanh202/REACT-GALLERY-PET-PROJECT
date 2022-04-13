import React from "react";
import { useController } from "react-hook-form";

const Input = ({ control, error, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <input
      className={`p-2 bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500  ${
        error ? "border-red-500" : ""
      }`}
      {...field}
      {...props}
    ></input>
  );
};

export default Input;
