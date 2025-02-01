"use client";

import { useOnboarding } from "@/app/providers";
import { componentsMap, StepLayout } from "../StepLayout";

export function ThirdStep() {
  const { config } = useOnboarding();

  return (
    <StepLayout>
      {Object.values(config["third-page"]).map((componentName) => {
        const Component =
          componentsMap[componentName as keyof typeof componentsMap];

        return <Component key={componentName} />;
      })}
    </StepLayout>
  );
}
