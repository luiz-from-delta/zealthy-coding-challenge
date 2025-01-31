"use client";

import { createContext, useContext, useMemo, useReducer } from "react";
import { Step, steps } from "@/app/components";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userSchema } from "../api/user/validations";

type UserSchema = z.infer<typeof userSchema>;

type OnboardingContextType = {
  form: UseFormReturn<UserSchema>;
  index: number;
  step: Step;
  prev: () => void;
  next: () => void;
};

function reducer(state: number, action: { type: "prev" | "next" }): number {
  switch (action.type) {
    case "next":
      if (state < steps.length - 1) {
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

export function OnboardingProvider({ children }: React.PropsWithChildren) {
  const [index, dispatch] = useReducer(reducer, 0);

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    mode: "all",
  });

  const value = useMemo(
    () => ({
      index,
      step: steps[index],
      prev: () => dispatch({ type: "prev" }),
      next: () => dispatch({ type: "next" }),
    }),
    [index]
  );

  return (
    <OnboardingContext.Provider value={{ form, ...value }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  return context;
}
