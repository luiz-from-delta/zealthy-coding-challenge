import { useOnboarding } from "@/app/providers";
import { ErrorWrapper } from "../../ErrorWrapper";
import { AddressInput } from "../../AddressInput";

export function Address() {
  const { form } = useOnboarding();
  const {
    formState: { errors },
  } = form;

  return (
    <ErrorWrapper
      error={
        errors.address?.message ||
        errors.address?.streetAddress?.message ||
        errors.address?.city?.message ||
        errors.address?.state?.message ||
        errors.address?.zipCode?.message
      }
    >
      <AddressInput />
    </ErrorWrapper>
  );
}
