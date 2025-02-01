"use client";

import {
  createContext,
  useContext,
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

  const value = useMemo(
    () => ({
      index,
      step: steps(config)[index],
      prev: () => dispatch({ type: "prev" }),
      next: () => dispatch({ type: "next" }),
      user,
      setUser,
    }),
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
