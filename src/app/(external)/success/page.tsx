import { FeedbackLayout } from "@/app/components";

export default function OnboardingSuccessPage() {
  return (
    <FeedbackLayout
      context="success"
      description="Your account is ready to go! Now you can explore everything we have to offer. Let’s get started!"
      nextURL="/"
      title="You're all set!"
    />
  );
}
