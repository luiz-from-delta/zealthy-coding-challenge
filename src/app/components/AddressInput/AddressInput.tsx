import { useOnboarding } from "@/app/providers";
import { AddressInputProps } from "./AddressInput.types";

const inputClassName =
  "text-paragraph text-input w-full h-10 rounded bg-input-background px-4  outline-none focus:ring-1 focus:ring-primary-green";

export function AddressInput({}: AddressInputProps) {
  const { form } = useOnboarding();
  const { register } = form;

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
          className={inputClassName}
          placeholder="Street address"
          {...register("address.streetAddress")}
        />
        <input
          className={inputClassName}
          placeholder="City"
          {...register("address.city")}
        />
        <div className="flex gap-2">
          <input
            className={inputClassName}
            placeholder="State"
            {...register("address.state")}
          />
          <input
            className={inputClassName}
            placeholder="ZIP Code"
            {...register("address.zipCode")}
          />
        </div>
      </div>
    </div>
  );
}
