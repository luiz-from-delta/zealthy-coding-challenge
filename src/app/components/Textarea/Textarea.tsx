import { TextareaProps } from "./Textarea.types";
import cx from "classnames";

export function Textarea({
  inputClassName,
  label,
  labelClassName,
  name,
  placeholder,
  wrapperClassName,
  ...props
}: TextareaProps) {
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
        <textarea
          {...props}
          name={name}
          className={cx(
            "text-paragraph text-input w-full h-[200px] rounded bg-input-background p-4 resize-none outline-none focus:ring-1 focus:ring-primary-green hover:ring-1 hover:ring-primary-green transition-all",
            inputClassName
          )}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
