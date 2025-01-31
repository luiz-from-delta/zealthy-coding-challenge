"use client";

import { useOnboarding } from "@/app/providers";
import { Textarea } from "../../Textarea";
import { StepLayout } from "../StepLayout";
import { ErrorWrapper } from "../../ErrorWrapper";

export function SecondStep() {
  const { form } = useOnboarding();
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <StepLayout>
      <ErrorWrapper error={errors.aboutMe?.message}>
        <Textarea
          label="About Me"
          placeholder="Tell us about yourself..."
          {...register("aboutMe")}
        />
      </ErrorWrapper>
    </StepLayout>
  );
}
