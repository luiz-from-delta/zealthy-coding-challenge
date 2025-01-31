"use client";

import { useOnboarding } from "@/app/providers";
import { AddressInput } from "../../AddressInput";
import { InputText } from "../../InputText";
import { StepLayout } from "../StepLayout";

import { CaretDown } from "phosphor-react";
import { ErrorWrapper } from "../../ErrorWrapper";

export function ThirdStep() {
  const { form } = useOnboarding();
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <StepLayout>
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

      <ErrorWrapper error={errors.birthDate?.message}>
        <InputText
          label="Birth Date"
          placeholder="Type or select your birth date..."
          RightIcon={CaretDown}
          {...register("birthDate")}
        />
      </ErrorWrapper>
    </StepLayout>
  );
}
