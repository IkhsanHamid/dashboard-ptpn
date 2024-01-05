import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export const AuthLayouts = (props) => {
  const { children, title, description, type } = props;
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400">
      <div className="p-10 bg-white rounded-xl">
        <h1 className="text-3xl font-bold mb-2 text-black">{title}</h1>
        <p className="font-medium text-black mb-8">{description}</p>
        {children}
        <p className="text-center mt-2">
          {type === "login" ? "Don't have an account? " : "Have an account? "}
          {type === "login" && (
            <Link to="/register" className="underline text-blue-500">
              Sign Up
            </Link>
          )}
          {type === "sign-up" && (
            <Link to="/" className="underline text-blue-500">
              Sign In
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};
