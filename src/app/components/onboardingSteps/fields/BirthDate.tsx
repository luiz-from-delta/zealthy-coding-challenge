import { useOnboarding } from "@/app/providers";
import { ErrorWrapper } from "../../ErrorWrapper";
import { DatePicker } from "../../DatePicker";

export function BirthDate() {
  const { form } = useOnboarding();
  const {
    formState: { errors },
    setValue,
    watch,
  } = form;

  return (
    <ErrorWrapper error={errors.birthDate?.message}>
      <DatePicker
        label="Birth Date"
        placeholder="Type or select your birth date..."
        name="birthDate"
        value={watch("birthDate") || null}
        onChange={(date) => setValue("birthDate", date || undefined)}
      />
    </ErrorWrapper>
  );
}
