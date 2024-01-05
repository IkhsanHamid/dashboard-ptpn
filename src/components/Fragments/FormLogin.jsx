import Button from "../Elements/Button";
import { InputForm } from "../Elements/Input";
import { useEffect, useRef } from "react";

export const FormLogin = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("email", event.target.Email.value);
    localStorage.setItem("password", event.target.Password.value);
    window.location.href = "/product";
  };

  const emailRef = useRef(null);
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  return (
    <form onSubmit={handleLogin}>
      <InputForm
        title="email"
        type="email"
        placeholder="example@gmail.com"
        name="Email"
        ref={emailRef}
      />
      <InputForm
        title="password"
        type="password"
        placeholder="********"
        name="Password"
      />
      <Button variant="bg-gray-400 w-full" type="submit">
        Login
      </Button>
    </form>
  );
};
