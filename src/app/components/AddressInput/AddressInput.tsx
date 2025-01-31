import { AddressInputProps } from "./AddressInput.types";

const inputClassName =
  "text-paragraph text-input w-full h-10 rounded bg-input-background px-4  outline-none focus:ring-1 focus:ring-primary-green";

export function AddressInput({}: AddressInputProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label
        htmlFor="address"
        className="w-full font-semibold text-xs text-paragraph"
      >
        Address
      </label>
      <div className="w-full flex flex-col gap-2">
        <input
          name="streetAddress"
          className={inputClassName}
          placeholder="Street address"
        />
        <input name="city" className={inputClassName} placeholder="City" />
        <div className="flex gap-2">
          <input name="state" className={inputClassName} placeholder="State" />
          <input
            name="zipCode"
            className={inputClassName}
            placeholder="ZIP Code"
          />
        </div>
      </div>
    </div>
  );
}
