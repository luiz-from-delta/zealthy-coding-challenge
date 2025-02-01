"use client";

import { useOnboarding } from "@/app/providers";
import { steps } from "../Steps/Steps";
import cx from "classnames";

export function StepsIndicator() {
  const { config, index: currentIndex } = useOnboarding();

  console.log({ config });

  return (
    <div className="w-full flex items-center gap-1">
      {steps(config).map((step, index) => (
        <div key={step.name} className="flex-1 flex flex-col gap-3">
          <div
            className={cx(
              "w-full h-[3px]",
              index <= currentIndex ? "bg-primary-green" : "bg-[#EEEEEE]"
            )}
          />
          <span
            className={cx(
              "text-sm font-medium",
              index <= currentIndex ? "text-primary-green" : "text-[#B8BEC5]"
            )}
          >
            {step.name}
          </span>
        </div>
      ))}
    </div>
  );
}
