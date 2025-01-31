"use client";

import { useOnboarding } from "@/app/providers";
import { Button } from "../Button";

import { ArrowLeft, ArrowRight } from "phosphor-react";
import { OnboardingStep } from "../index";
import { StepList } from "./Steps.types";
import { useCallback } from "react";

export const steps: StepList = [
  {
    getContent: () => OnboardingStep.FirstStep,
    nextButton: {
      action: () => {},
      label: "Next",
      RightIcon: ArrowRight,
    },
  },
  {
    getContent: () => OnboardingStep.SecondStep,
    nextButton: {
      action: () => {},
      label: "Next",
      RightIcon: ArrowRight,
    },
    prevButton: {
      action: () => {},
      label: "Back",
      RightIcon: ArrowLeft,
    },
  },
  {
    getContent: () => OnboardingStep.ThirdStep,
    nextButton: {
      action: () => {},
      label: "Next",
      RightIcon: ArrowRight,
    },
    prevButton: {
      action: () => {},
      label: "Back",
      RightIcon: ArrowLeft,
    },
  },
];

export function Steps() {
  const { form, next, prev, step } = useOnboarding();
  const { getContent, nextButton, prevButton } = step;

  const Content = getContent();

  const onSubmit = useCallback(async () => {
    if (!nextButton) {
      return;
    }

    await nextButton.action();
    next();
  }, [next, nextButton]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Content />

      <div className="w-full flex gap-4">
        {prevButton ? (
          <Button
            onClick={async () => {
              await prevButton.action();
              prev();
            }}
            variant="outline"
            type="button"
          >
            {prevButton.label || "Back"}
          </Button>
        ) : (
          <div className="w-full" />
        )}
        {nextButton ? (
          <Button type="submit">{nextButton.label || "Next"}</Button>
        ) : (
          <div className="w-full" />
        )}
      </div>
    </form>
  );
}
