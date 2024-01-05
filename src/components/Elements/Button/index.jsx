/* eslint-disable react/prop-types */
const Button = (props) => {
  const {
    children = "button",
    variant = "bg-yellow-500",
    onClick = () => {},
    type = "button",
  } = props;
  return (
    <button
      className={`h-10 px-6 font-semibold rounded-md ${variant} text-black`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
