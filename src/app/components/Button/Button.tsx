import { ButtonProps } from "./Button.types";
import cx from "classnames";

export function Button({
  children,
  className,
  isLoading = false,
  LeftIcon,
  RightIcon,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cx(
        "w-full h-10 rounded font-bold transition-colors flex justify-center items-center gap-3",
        {
          "bg-primary-green text-white hover:bg-dark-primary-green":
            variant === "primary",
          "bg-transparent text-primary-green border border-solid border-primary-green hover:text-dark-primary-green hover:border-dark-primary-green":
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
