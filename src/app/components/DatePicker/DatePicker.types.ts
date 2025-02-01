export type DatePickerProps = {
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;

  label: string;
  name: string;
  placeholder: string;

  value: Date | null;
  onChange: (date: Date | null) => void;
};
