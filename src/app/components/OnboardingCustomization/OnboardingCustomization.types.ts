export type ComponentConfig = Record<
  "second-page" | "third-page",
  { "first-component": string; "second-component"?: string }
>;

export type UpdateFields = (components: ComponentConfig) => void;

export type OnboardingCustomizationProps = {
  initialConfig: ComponentConfig;
  updateFields: UpdateFields;
};
