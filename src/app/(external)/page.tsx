"use client";

import { Steps } from "../components";
import { OnboardingProvider } from "../providers";

export default function Home() {
  return (
    <OnboardingProvider>
      <Steps />
    </OnboardingProvider>
  );
}
