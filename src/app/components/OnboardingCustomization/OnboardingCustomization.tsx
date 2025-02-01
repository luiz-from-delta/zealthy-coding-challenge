"use client";

import cx from "classnames";
import { ArrowLeft, ArrowRight, PushPin } from "phosphor-react";
import { Fragment, useMemo } from "react";
import { OnboardingCustomizationProps } from "./OnboardingCustomization.types";

const pages: {
  title: string;
  components: { name: string; isFixed?: boolean }[];
}[] = [
  {
    components: [
      {
        isFixed: true,
        name: "Email",
      },
      {
        isFixed: true,
        name: "Password",
      },
    ],
    title: "First Page",
  },
  {
    components: [],
    title: "Second Page",
  },
  {
    components: [],
    title: "Third Page",
  },
];

export function OnboardingCustomization({
  config,
  rearrange,
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
              {page.components.map((component, componentIndex, components) => {
                const icon = (() => {
                  if (component.isFixed) {
                    return <PushPin />;
                  }

                  if (pageIndex === 1) {
                    return <ArrowRight />;
                  }

                  return <ArrowLeft />;
                })();

                const canBeMoved = components.length > 1;

                return (
                  <Fragment key={component.name}>
                    <li
                      className={cx(
                        "w-full h-[3.875rem] flex items-center justify-between bg-[#F4F4F4] text-sm font-extrabold px-6 rounded border border-transparent transition-colors",
                        {
                          "text-paragraph opacity-70": component.isFixed,
                          "text-primary-green hover:bg-opacity-10 hover:bg-primary-green hover:border-primary-green":
                            !component.isFixed && canBeMoved,
                          "text-warning bg-opacity-10 bg-warning border-warning":
                            !component.isFixed && !canBeMoved,
                        }
                      )}
                    >
                      <span>{component.name}</span>
                      {canBeMoved && (
                        <button
                          className={cx(
                            "size-[1.875rem] rounded-full bg-opacity-10 flex items-center justify-center",
                            component.isFixed
                              ? "bg-paragraph text-paragraph"
                              : "bg-primary-green text-primary-green hover:bg-opacity-20"
                          )}
                          disabled={component.isFixed}
                          onClick={() => {
                            rearrange(
                              pageIndex === 1 ? "second-page" : "third-page",
                              componentIndex
                                ? "first-component"
                                : "second-component",
                              component.name,
                              components.find(
                                ({ name }) => component.name !== name
                              )?.name as string
                            );
                          }}
                        >
                          {icon}
                        </button>
                      )}
                    </li>
                    {!canBeMoved && (
                      <span className="text-sm text-warning font-semibold">
                        Each page must have at least one component. To move this
                        one, assign another component to this page first.
                      </span>
                    )}
                  </Fragment>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* <Button className="!w-[120px]">Update</Button> */}
    </div>
  );
}
