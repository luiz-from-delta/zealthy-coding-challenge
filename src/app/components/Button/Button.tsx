import { ButtonProps } from "./Button.types";
import cx from "classnames";

export function Button({
  LeftIcon,
  RightIcon,
  children,
  className,
  isLoading = false,
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
          "opacity-50 cursor-not-allowed": props.disabled || isLoading,
        },
        className
      )}
      disabled={props.disabled || isLoading}
    >
      {LeftIcon && <LeftIcon />}
      {children}
      {RightIcon && <RightIcon />}
    </button>
  );
}
