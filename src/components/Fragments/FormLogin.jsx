import Swal from "sweetalert2";
import Button from "../Elements/Button";
import { InputForm } from "../Elements/Input";
import { useEffect, useRef } from "react";

export const FormLogin = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    const enteredUsername = event.target.Username.value;
    const enteredPassword = event.target.Password.value;

    if (enteredUsername !== "ptpn" || enteredPassword !== "admin") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid username or password. Please try again."
      });
      return;
    }

    localStorage.setItem("username", enteredUsername);
    localStorage.setItem("password", enteredPassword);
    Swal.fire({
      icon: "success",
      title: "Success Login!",
    })
    window.location.href = "/dashboard";
  };

  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        title="username"
        type="text"
        placeholder="username"
        name="Username"
        ref={usernameRef}
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
