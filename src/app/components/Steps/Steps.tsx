"use client";

import { useOnboarding, UserSchema, UserWithId } from "@/app/providers";
import { Button } from "../Button";

import { ArrowLeft, ArrowRight } from "phosphor-react";
import { StepActionResponse, StepList } from "./Steps.types";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { FirstStep, SecondStep, ThirdStep } from "../onboardingSteps";
import { ComponentConfig } from "../OnboardingCustomization";

const lastStep = 2;

const fieldsMap: Record<string, keyof UserSchema> = {
  "About Me": "aboutMe",
  Address: "address",
  "Birth Date": "birthDate",
};

async function execute(
  method: "POST",
  fields: UserSchema
): Promise<StepActionResponse>;
async function execute(
  method: "PATCH",
  fields: Partial<UserSchema>,
  userId: number
): Promise<StepActionResponse>;
async function execute(
  method: "PATCH" | "POST",
  fields: Partial<UserSchema>,
  userId?: number
): Promise<StepActionResponse> {
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user${userId ? `/${userId}` : ""}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    }
  );

  return await user.json();
}

function mapFields(
  config: ComponentConfig,
  values: UserSchema | undefined,
  pageName: keyof ComponentConfig
) {
  const components = config[pageName] || {};
  const fields = Object.values(components);
  return Object.fromEntries(
    fields.map((field) => {
      const key = fieldsMap[field];
      const value = (values || {})[key];
      return [key, value];
    })
  );
}

export const steps: (config: ComponentConfig) => StepList = (config) => [
  {
    name: "Email and Password",
    getContent: () => FirstStep,
    nextButton: {
      action: async (values?: UserSchema) => {
        const { email, password } = values || {};

        return execute("POST", {
          email: String(email),
          password: String(password),
        });
      },
      RightIcon: ArrowRight,
    },
  },
  {
    name: Object.values(config["second-page"] || {}).join(" and "),
    getContent: () => SecondStep,
    nextButton: {
      action: async (values?: UserSchema, user?: UserWithId) => {
        const fields = mapFields(config, values, "second-page");

        return execute("PATCH", fields, Number(user?.id));
      },
      RightIcon: ArrowRight,
    },
    prevButton: {
      action: () => {},
      RightIcon: ArrowLeft,
    },
  },
  {
    name: Object.values(config["third-page"] || {}).join(" and "),
    getContent: () => ThirdStep,
    nextButton: {
      action: async (values?: UserSchema, user?: UserWithId) => {
        const fields = mapFields(config, values, "third-page");

        return execute("PATCH", fields, Number(user?.id));
      },
      RightIcon: ArrowRight,
    },
    prevButton: {
      action: () => {},
      RightIcon: ArrowLeft,
    },
  },
];

export function Steps() {
  const { form, index, next, prev, setUser, step, user } = useOnboarding();
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

        if (index === lastStep) {
          push("/success");
        }
      } catch (error) {
        console.error(error);

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
            LeftIcon={prevButton.LeftIcon}
            RightIcon={prevButton.RightIcon}
          >
            {prevButton.label || "Back"}
          </Button>
        ) : (
          <div className="w-full" />
        )}
        {nextButton ? (
          <Button
            type="submit"
            isLoading={isLoading}
            LeftIcon={nextButton.LeftIcon}
            RightIcon={nextButton.RightIcon}
          >
            {isLoading ? "Loading..." : nextButton.label || "Next"}
          </Button>
        ) : (
          <div className="w-full" />
        )}
      </div>
    </form>
  );
}
