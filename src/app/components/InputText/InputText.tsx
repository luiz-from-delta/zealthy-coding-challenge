import { InputTextProps } from "./InputText.types";
import cx from "classnames";

export function InputText({
  RightIcon,
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
      <div className="w-full relative">
        <input
          {...props}
          name={name}
          className={cx(
            "text-paragraph text-input w-full h-10 rounded bg-input-background px-4",
            inputClassName
          )}
          placeholder={placeholder}
        />
        {RightIcon && (
          <div className="absolute top-1/2 -mt-[7px] right-4">
            <RightIcon size={14} />
          </div>
        )}
      </div>
    </div>
  );
}
