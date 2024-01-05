/* eslint-disable react/prop-types */
import Button from "../Elements/Button";

export const Card = (props) => {
  const { children } = props;
  return (
    <div className="mt-10 p-10 bg-gray-300 rounded-lg shadow mx-2 flex flex-col justify-between">
      {children}
    </div>
  );
};

const Header = (props) => {
  const { title } = props;
  return <h1 className="font-medium text-4xl text-center">{title}</h1>;
};

const Body = (props) => {
  const { children, title } = props;
  return (
    <div className="px-5 pb-5 h-full">
      <a href="">
        <h5 className="text-xl font-semibold tracking-tight text-black">
          {title}
        </h5>
        <p className="text-s text-black">{children}</p>
      </a>
    </div>
  );
};

const Footer = (props) => {
  const { price, name, handleAddToCart, id } = props;
  return (
    <div className="flex items-center justify-between px-5 pb-5">
      <span className="text-xl font-bold text-white">
        Rp{" "}
        {price.toLocaleString("id-ID", { styles: "currency", currency: "IDR" })}
      </span>
      <Button onClick={() => handleAddToCart(id)}>{name}</Button>
    </div>
  );
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
