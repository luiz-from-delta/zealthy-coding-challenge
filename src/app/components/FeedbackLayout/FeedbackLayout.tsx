"use client";

import Image from "next/image";
import { FeedbackLayoutProps } from "./FeedbackLayout.types";
import cx from "classnames";

import userSuccessVector from "@/app/assets/user-success-vector.svg";
import userErrorVector from "@/app/assets/user-error-vector.svg";
import Link from "next/link";

import { ArrowCounterClockwise, ArrowRight } from "phosphor-react";

export function FeedbackLayout({
  context,
  description,
  nextURL,
  title,
}: FeedbackLayoutProps) {
  return (
    <div className="w-full max-w-[400px] flex flex-col gap-16 items-center mx-auto">
      <Image
        src={context === "success" ? userSuccessVector : userErrorVector}
        alt="User feedback vector"
      />
      <div className="flex flex-col gap-8 items-center">
        <h2
          className={cx(
            "text-[2.75rem] leading-[3.2rem] font-extrabold text-center",
            context === "success" ? "text-primary-green" : "text-error"
          )}
        >
          {title}
        </h2>
        <p className="text-sm text-paragraph font-semibold text-center">
          {description}
        </p>
      </div>

      <Link
        href={nextURL}
        className={cx(
          "w-10 h-10 bg-opacity-10 rounded-full flex items-center justify-center",
          context === "success"
            ? "text-primary-green bg-primary-green"
            : "text-error bg-error"
        )}
      >
        {context === "success" ? <ArrowRight /> : <ArrowCounterClockwise />}
      </Link>
    </div>
  );
}
