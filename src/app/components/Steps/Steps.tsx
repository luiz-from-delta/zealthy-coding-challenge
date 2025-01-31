"use client";

import { useOnboarding, UserSchema, UserWithId } from "@/app/providers";
import { Button } from "../Button";

import { ArrowLeft, ArrowRight } from "phosphor-react";
import { OnboardingStep } from "../index";
import { StepList } from "./Steps.types";
import { useCallback, useState } from "react";

export const steps: StepList = [
  {
    getContent: () => OnboardingStep.FirstStep,
    nextButton: {
      action: async (values?: UserSchema) => {
        const { email, password } = values || {};

        const user = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        return await user.json();
      },
      label: "Next",
      RightIcon: ArrowRight,
    },
  },
  {
    getContent: () => OnboardingStep.SecondStep,
    nextButton: {
      action: async (values?: UserSchema, user?: UserWithId) => {
        const { aboutMe } = values || {};

        const updatedUser = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user?.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              aboutMe,
            }),
          }
        );

        return await updatedUser.json();
      },
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
      action: async (values?: UserSchema, user?: UserWithId) => {
        const { address, birthDate } = values || {};

        const updatedUser = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user?.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              address,
              birthDate,
            }),
          }
        );

        return await updatedUser.json();
      },
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
  const { form, next, prev, step, setUser, user } = useOnboarding();
  const { getContent, nextButton, prevButton } = step;

  const [isLoading, setIsLoading] = useState(false);

  const Content = getContent();

  const onSubmit = useCallback(
    async (values: UserSchema) => {
      if (!nextButton) {
        return;
      }

      try {
        setIsLoading(true);
        const response = await nextButton.action(values, user);

        if (response && response.success) {
          setUser(response.data);
        } else if (response) {
          throw new Error(response.error);
        }

        setTimeout(() => {
          next();
        }, 0);
      } catch (error) {
        console.error(error);
        /**
         * @todo Handle errors here, show error toasts, etc.
         */
      } finally {
        setIsLoading(false);
      }
    },
    [next, nextButton, setUser, user]
  );

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
          <Button type="submit" isLoading={isLoading}>
            {isLoading ? "Loading..." : nextButton.label || "Next"}
          </Button>
        ) : (
          <div className="w-full" />
        )}
      </div>
    </form>
  );
}
