"use client";

import { Steps, StepsIndicator, StepsInstructions } from "../components";
import { OnboardingProvider } from "../providers";

export default function Home() {
  return (
    <OnboardingProvider>
      <div className="w-full flex flex-col gap-[90px]">
        <div className="w-full flex items-center gap-[200px]">
          <StepsInstructions />
          <Steps />
        </div>

        <StepsIndicator />
      </div>
    </OnboardingProvider>
  );
}
