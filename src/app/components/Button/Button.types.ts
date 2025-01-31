import { Icon } from "phosphor-react";

export type ButtonVariant = "primary" | "outline";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.PropsWithChildren<{
    className?: string;

    LeftIcon?: Icon;
    RightIcon?: Icon;

    variant?: ButtonVariant;
  }>;
