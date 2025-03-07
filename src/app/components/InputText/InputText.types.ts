export type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;

  label: string;
  name: string;
  placeholder: string;
};
