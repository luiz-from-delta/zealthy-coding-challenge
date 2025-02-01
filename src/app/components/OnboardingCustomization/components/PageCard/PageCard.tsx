import { ArrowLeft, ArrowRight, PushPin } from "phosphor-react";

import cx from "classnames";
import { PageCardProps } from "./PageCard.types";

export function PageCard({
  component,
  componentIndex,
  components,
  pageIndex,
  rearrangeFields,
}: PageCardProps) {
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
    <>
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
              rearrangeFields(
                pageIndex === 1 ? "second-page" : "third-page",
                {
                  id: componentIndex ? "first-component" : "second-component",
                  value: component.name,
                },
                {
                  value: components.find(({ name }) => component.name !== name)
                    ?.name as string,
                }
              );
            }}
          >
            {icon}
          </button>
        )}
      </li>
      {!canBeMoved && (
        <span className="text-sm text-warning font-semibold">
          Each page must have at least one component. To move this one, assign
          another component to this page first.
        </span>
      )}
    </>
  );
}
