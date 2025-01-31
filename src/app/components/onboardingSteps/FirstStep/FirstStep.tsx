"use client";

import { useOnboarding } from "@/app/providers";
import { InputText } from "../../InputText";
import { StepLayout } from "../StepLayout";
import { ErrorWrapper } from "../../ErrorWrapper";

export function FirstStep() {
  const { form } = useOnboarding();
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <StepLayout>
      <ErrorWrapper error={errors.email?.message}>
        <InputText
          label="Email"
          placeholder="Type your email..."
          {...register("email")}
        />
      </ErrorWrapper>
      <ErrorWrapper error={errors.password?.message}>
        <InputText
          label="Password"
          placeholder="Type your password..."
          type="password"
          {...register("password")}
        />
      </ErrorWrapper>
    </StepLayout>
  );
}
