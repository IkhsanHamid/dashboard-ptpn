/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { Input } from "./Input";
import { Label } from "./Label";

export const InputForm = forwardRef((props, ref) => {
  const { title, type, name, placeholder } = props;
  return (
    <div className="mb-6">
      <Label htmlFor={name}>{title}</Label>
      <Input name={name} type={type} placeholder={placeholder} ref={ref} />
    </div>
  );
});
