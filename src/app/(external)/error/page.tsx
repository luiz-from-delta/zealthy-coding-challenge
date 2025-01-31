import { FeedbackLayout } from "@/app/components";

export default function OnboardingErrorPage() {
  return (
    <FeedbackLayout
      context="error"
      description="We could not complete your registration. Please check your information and try again. If the issue persists, contact our support team."
      nextURL="/"
      title="Oops! Something went wrong."
    />
  );
}
