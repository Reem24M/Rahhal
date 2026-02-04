import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  label?: string;
  error?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
  iconPosition?: "left" | "right";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      label,
      error,
      icon,
      iconPosition = "left",
      className,
      rightElement,
      id,
      ...props
    },
    ref,
  ) => {
    const hasIcon = Boolean(icon);

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-600"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {hasIcon && (
            <span
              className={clsx(
                "pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-400",
                iconPosition === "left" ? "left-3" : "right-3",
              )}
            >
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={type}
            {...props}
            className={clsx(
              "w-full rounded-md border py-2.5 text-sm transition",
              "focus:outline-none focus:ring-2 bg-gray-0",
              hasIcon
                ? iconPosition === "left"
                  ? "pl-10 pr-3"
                  : "pr-10 pl-3"
                : "px-3",
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-600",
              className,
            )}
          />
          {rightElement}
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
