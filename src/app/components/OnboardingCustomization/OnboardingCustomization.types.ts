export type ComponentConfig = Record<
  "second-page" | "third-page",
  { "first-component": string; "second-component": string }
>;

export type OnboardingCustomizationProps = {
  config: ComponentConfig;
  rearrangeFields: (
    documentId: string,
    from: { id: string; value: string },
    to: { value: string }
  ) => void;
};
