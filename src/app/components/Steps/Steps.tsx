"use client";

import { useOnboarding, UserSchema, UserWithId } from "@/app/providers";
import { Button } from "../Button";

import { ArrowLeft, ArrowRight } from "phosphor-react";
import { OnboardingCustomizationProps, OnboardingStep } from "../index";
import { StepList } from "./Steps.types";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

const fieldsMap: Record<string, keyof UserSchema> = {
  "About Me": "aboutMe",
  Address: "address",
  "Birth Date": "birthDate",
};

export const steps: (
  config: OnboardingCustomizationProps["config"]
) => StepList = (config) => [
  {
    name: "Email and Password",
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
    name: Object.values(config["second-page"] || {}).join(" and "),
    getContent: () => OnboardingStep.SecondStep,
    nextButton: {
      action: async (values?: UserSchema, user?: UserWithId) => {
        const fields = Object.fromEntries(
          Object.values(config["second-page"] || {}).map((field) => {
            const key = fieldsMap[field];
            const value = (values || {})[key];
            return [key, value];
          })
        );

        const updatedUser = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user?.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fields),
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
    name: Object.values(config["third-page"] || {}).join(" and "),
    getContent: () => OnboardingStep.ThirdStep,
    nextButton: {
      action: async (values?: UserSchema, user?: UserWithId) => {
        const fields = Object.fromEntries(
          Object.values(config["third-page"] || {}).map((field) => {
            const key = fieldsMap[field];
            const value = (values || {})[key];
            return [key, value];
          })
        );

        const updatedUser = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user?.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fields),
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
  const { form, index, next, prev, step, setUser, user } = useOnboarding();
  const { getContent, nextButton, prevButton } = step;

  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();

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

        next();

        if (index === 2) {
          push("/success");
        }
      } catch (error) {
        console.error(error);
        /**
         * @todo Handle errors here, show error toasts, etc.
         */
        alert((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [index, next, nextButton, push, setUser, user]
  );

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-6">
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
