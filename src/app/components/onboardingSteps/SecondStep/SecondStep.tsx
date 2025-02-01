"use client";

import { useOnboarding } from "@/app/providers";
import { componentsMap, StepLayout } from "../StepLayout";

export function SecondStep() {
  const { config } = useOnboarding();

  return (
    <StepLayout>
      {Object.values(config["second-page"]).map((componentName) => {
        const Component =
          componentsMap[componentName as keyof typeof componentsMap];

        return <Component key={componentName} />;
      })}
    </StepLayout>
  );
}
