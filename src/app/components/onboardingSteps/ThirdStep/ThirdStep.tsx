"use client";

import { AddressInput } from "../../AddressInput";
import { InputText } from "../../InputText";
import { StepLayout } from "../StepLayout";

import { CaretDown } from "phosphor-react";

export function ThirdStep() {
  return (
    <StepLayout>
      <AddressInput />
      <InputText
        label="Birth Date"
        name="birthDate"
        placeholder="Type or select your birth date..."
        RightIcon={CaretDown}
      />
    </StepLayout>
  );
}
