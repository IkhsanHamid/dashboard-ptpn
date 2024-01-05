import Button from "../Elements/Button";
import { InputForm } from "../Elements/Input";
import { useEffect, useRef } from "react";

export const FormRegister = () => {
  const nameRef = useRef(null);
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  return (
    <form action="">
      <InputForm
        title="Fullname"
        type="text"
        placeholder="Insert your fullname ....."
        name="Fullname"
        ref={nameRef}
      />
      <InputForm
        title="Email"
        type="email"
        placeholder="example@gmail.com"
        name="Email"
      />
      <InputForm
        title="Password"
        type="password"
        placeholder="********"
        name="Password"
      />
      <InputForm
        title="Confirm Password"
        type="password"
        placeholder="********"
        name="Confirm Password"
      />
      <Button variant="bg-gray-400 w-full">Register</Button>
    </form>
  );
};
