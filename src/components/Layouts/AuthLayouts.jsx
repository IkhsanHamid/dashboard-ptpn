// import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export const AuthLayouts = (props) => {
  const { children, title, description, type } = props;
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400">
      <div className="p-10 bg-white rounded-xl">
        <h1 className="text-3xl font-bold mb-2 text-black">{title}</h1>
        <p className="font-medium text-black mb-8">{description}</p>
        {children}
      </div>
    </div>
  );
};
