export type OnboardingCustomizationProps = {
  config: Record<
    "second-page" | "third-page",
    { "first-component": string; "second-component": string }
  >;
  rearrange: (
    documentId: string,
    fieldId: string,
    fieldValue: string,
    otherField: string
  ) => void;
};
