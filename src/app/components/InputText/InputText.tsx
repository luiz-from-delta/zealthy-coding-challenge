import { InputTextProps } from "./InputText.types";
import cx from "classnames";

export function InputText({
  inputClassName,
  label,
  labelClassName,
  name,
  placeholder,
  wrapperClassName,
  ...props
}: InputTextProps) {
  return (
    <div className={cx("w-full flex flex-col gap-2", wrapperClassName)}>
      <label
        htmlFor={name}
        className={cx(
          "w-full font-semibold text-xs text-paragraph",
          labelClassName
        )}
      >
        {label}
      </label>

      <input
        {...props}
        name={name}
        className={cx(
          "text-paragraph text-input w-full h-10 rounded bg-input-background px-4 outline-none focus:ring-1 focus:ring-primary-green hover:ring-1 hover:ring-primary-green transition-all",
          inputClassName
        )}
        placeholder={placeholder}
      />
    </div>
  );
}
