"use client";

import { useMemo } from "react";
import { OnboardingCustomizationProps } from "./OnboardingCustomization.types";
import { pages } from "@/app/config/pages";
import { PageCard } from "./components";

export function OnboardingCustomization({
  config,
  rearrangeFields,
}: OnboardingCustomizationProps) {
  const actualPages = useMemo(
    () =>
      pages.map((page, pageIndex) => {
        if (pageIndex === 0) {
          return page;
        }

        const key = pageIndex === 1 ? "second-page" : "third-page";
        const components = config[key];

        return {
          ...page,
          components: [
            {
              name: components["first-component"],
            },
            ...(components["second-component"]
              ? [{ name: components["second-component"] }]
              : []),
          ],
        };
      }),
    [config]
  );

  return (
    <div className="w-full flex flex-col gap-16 items-end">
      <div className="w-full flex items-start gap-16">
        {actualPages.map((page, pageIndex) => (
          <div
            key={page.title}
            className="w-full h-[360px] bg-white drop-shadow-default rounded-lg px-8 py-6 flex flex-col gap-6"
          >
            <span className="text-paragraph font-extrabold text-[0.8125rem]">
              {page.title}
            </span>
            <ul className="w-full flex flex-col gap-3">
              {page.components.map((component, componentIndex, components) => (
                <PageCard
                  key={component.name}
                  component={component}
                  componentIndex={componentIndex}
                  components={components}
                  pageIndex={pageIndex}
                  rearrangeFields={rearrangeFields}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
