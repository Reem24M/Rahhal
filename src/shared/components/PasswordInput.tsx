import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import Input from "./Input";

interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
}

function PasswordInput({ label, error, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      type={showPassword ? "text" : "password"}
      label={label}
      error={error}
      icon={<HiOutlineLockClosed className="h-5 w-5" />}
      iconPosition="left"
      className="pr-10"
      rightElement={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <HiOutlineEyeSlash className="h-5 w-5" />
          ) : (
            <HiOutlineEye className="h-5 w-5" />
          )}
        </button>
      }
    />
  );
}

export default PasswordInput;
