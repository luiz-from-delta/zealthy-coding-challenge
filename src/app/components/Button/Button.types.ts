import { Icon } from "phosphor-react";

export type ButtonVariant = "primary" | "outline";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.PropsWithChildren<{
    className?: string;

    isLoading?: boolean;

    LeftIcon?: Icon;
    RightIcon?: Icon;

    variant?: ButtonVariant;
  }>;
