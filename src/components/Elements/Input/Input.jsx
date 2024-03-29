/* eslint-disable react/display-name */
import { forwardRef } from "react";

/* eslint-disable react/prop-types */
export const Input = forwardRef((props, ref) => {
  const { type, placeholder, name } = props;
  return (
    <input
      type={type}
      className="text-sm border rounded w-full py-2 px-3 placeholder: opacity-100"
      placeholder={placeholder}
      name={name}
      id={name}
      ref={ref}
    />
  );
});
