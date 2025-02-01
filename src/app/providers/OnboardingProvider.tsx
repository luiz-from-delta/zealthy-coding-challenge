"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { OnboardingCustomizationProps, Step, steps } from "@/app/components";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userSchema } from "../api/user/validations";

export type UserSchema = z.infer<typeof userSchema>;

export type UserWithId = UserSchema & { id: number };

type OnboardingContextType = {
  form: UseFormReturn<UserSchema>;
  index: number;
  step: Step;
  prev: () => void;
  next: () => void;
  user: UserWithId;
  setUser: React.Dispatch<React.SetStateAction<UserWithId>>;
  config: OnboardingCustomizationProps["config"];
};

function reducer(state: number, action: { type: "prev" | "next" }): number {
  switch (action.type) {
    case "next":
      if (state < 2) {
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
  config,
  children,
}: React.PropsWithChildren<{
  config: OnboardingCustomizationProps["config"];
}>) {
  const [index, dispatch] = useReducer(reducer, 0);

  const [user, setUser] = useState<UserWithId>({} as UserWithId);

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
      step: steps(config)[index],
      prev: () => dispatch({ type: "prev" }),
      next: () => dispatch({ type: "next" }),
      user,
      setUser,
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
