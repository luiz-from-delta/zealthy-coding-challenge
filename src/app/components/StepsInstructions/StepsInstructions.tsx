"use client";

import { useOnboarding } from "@/app/providers";
import Image from "next/image";

import userVector from "@/app/assets/user-vector.svg";

const instructions: { title: string; description: string }[] = [
  {
    title: "Getting started is easy!",
    description:
      "First, we need your email and password to set up your access. This will allow you to log in to the platform.",
  },
  {
    title: "Tell us a bit about yourself.",
    description:
      "Now, we would love to know more about you! Share a little about yourself so we can personalize your experience.",
  },
  {
    title: "Final details before you're in...",
    description:
      "Almost there! Just fill in your address and date of birth to complete your registration.",
  },
];

export function StepsInstructions() {
  const { index } = useOnboarding();

  const { description, title } = instructions[index];

  return (
    <div className="w-full max-w-[340px] flex flex-col gap-8">
      <Image src={userVector} alt="User vector" />

      <div className="flex flex-col gap-6">
        <h2 className="font-extrabold text-[44px] text-primary-green leading-[3.2rem]">
          {title}
        </h2>
        <p className="text-paragraph font-medium text-xs leading-[1.125rem]">
          {description}
        </p>
      </div>
    </div>
  );
}
