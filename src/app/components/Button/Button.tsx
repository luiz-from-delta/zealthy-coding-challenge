import { ButtonProps } from "./Button.types";
import cx from "classnames";

export function Button({
  LeftIcon,
  RightIcon,
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cx(
        "w-full h-10 rounded font-bold",
        {
          "bg-primary-green text-white": variant === "primary",
          "bg-transparent text-primary-green border border-solid border-primary-green":
            variant === "outline",
        },
        className
      )}
    >
      {LeftIcon && <LeftIcon />}
      {children}
      {RightIcon && <RightIcon />}
    </button>
  );
}
