"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { ComponentConfig, Step, steps } from "@/app/components";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userSchema } from "../api/user/validations";

export type UserSchema = z.infer<typeof userSchema>;

export type UserWithId = UserSchema & { id: number };

type OnboardingContextType = {
  config: ComponentConfig;
  form: UseFormReturn<UserSchema>;
  index: number;
  next: () => void;
  prev: () => void;
  setUser: React.Dispatch<React.SetStateAction<UserWithId>>;
  step: Step;
  user: UserWithId;
};

const stepsLength = 3;

function reducer(state: number, action: { type: "prev" | "next" }): number {
  switch (action.type) {
    case "next":
      if (state < stepsLength - 1) {
        return state + 1;
      }
      return state;
    case "prev":
      if (state > 0) {
        return state - 1;
      }
      return state;
    default:
      return state;
  }
}

export const OnboardingContext = createContext<OnboardingContextType>(
  {} as OnboardingContextType
);

export function OnboardingProvider({
  children,
  config,
}: React.PropsWithChildren<{
  config: ComponentConfig;
}>) {
  const [index, dispatch] = useReducer(reducer, 0);

  const [user, setUser] = useState({} as UserWithId);

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    mode: "all",
  });

  useEffect(() => {
    if (!user.id) {
      return;
    }

    const fields = Object.fromEntries(
      Object.entries({
        aboutMe: user.aboutMe,
        birthDate: user.birthDate,
        address: user.address,
      })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value)
        .map(([key]) => [key, true])
    );

    const partialSchema = userSchema.pick(
      fields as Partial<Record<keyof UserSchema, true>>
    );

    const userInfo: UserSchema = {
      ...user,
      birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
    };

    if (partialSchema.safeParse(userInfo).success) {
      if ("aboutMe" in fields) {
        form.setValue("aboutMe", userInfo.aboutMe);
      }
      if ("birthDate" in fields) {
        form.setValue("birthDate", userInfo.birthDate);
      }
      if ("address" in fields) {
        form.setValue("address.city", userInfo.address?.city || "");
        form.setValue("address.state", userInfo.address?.state || "");
        form.setValue(
          "address.streetAddress",
          userInfo.address?.streetAddress || ""
        );
        form.setValue("address.zipCode", userInfo.address?.zipCode || "");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const value = useMemo(
    () => ({
      index,
      next: () => dispatch({ type: "next" }),
      prev: () => dispatch({ type: "prev" }),
      setUser,
      step: steps(config)[index],
      user,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index, user]
  );

  return (
    <OnboardingContext.Provider value={{ config, form, ...value }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  return context;
}
