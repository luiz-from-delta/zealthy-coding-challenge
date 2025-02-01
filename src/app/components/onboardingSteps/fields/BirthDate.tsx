import { useOnboarding } from "@/app/providers";
import { ErrorWrapper } from "../../ErrorWrapper";
import { InputText } from "../../InputText";
import { CaretDown } from "phosphor-react";

export function BirthDate() {
  const { form } = useOnboarding();
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <ErrorWrapper error={errors.birthDate?.message}>
      <InputText
        label="Birth Date"
        placeholder="Type or select your birth date..."
        RightIcon={CaretDown}
        {...register("birthDate")}
      />
    </ErrorWrapper>
  );
}
