import { useOnboarding } from "@/app/providers";
import { ErrorWrapper } from "../../ErrorWrapper";
import { Textarea } from "../../Textarea";

export function AboutMe() {
  const { form } = useOnboarding();
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <ErrorWrapper error={errors.aboutMe?.message}>
      <Textarea
        label="About Me"
        placeholder="Tell us about yourself..."
        {...register("aboutMe")}
      />
    </ErrorWrapper>
  );
}
