import { collection, getDocs, query } from "firebase/firestore";
import {
  OnboardingCustomizationProps,
  Steps,
  StepsIndicator,
  StepsInstructions,
} from "../components";
import { OnboardingProvider } from "../providers";
import { firestore } from "../lib/firebase";

export default async function Home() {
  const config: OnboardingCustomizationProps["config"] =
    {} as OnboardingCustomizationProps["config"];
  const querySnapshot = await getDocs(
    query(collection(firestore, "onboarding"))
  );
  querySnapshot.forEach((snapshot) => {
    config[snapshot.id as "second-page" | "third-page"] =
      snapshot.data() as OnboardingCustomizationProps["config"][
        | "second-page"
        | "third-page"];
  });

  return (
    <OnboardingProvider config={config}>
      <div className="w-full flex flex-col gap-[40px]">
        <div className="w-full flex items-center gap-[200px]">
          <StepsInstructions />
          <Steps />
        </div>

        <StepsIndicator />
      </div>
    </OnboardingProvider>
  );
}
