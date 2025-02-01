export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    wrapperClassName?: string;
    labelClassName?: string;
    inputClassName?: string;

    label: string;
    name: string;
    placeholder: string;
  };
