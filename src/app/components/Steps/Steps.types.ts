import { Icon } from "phosphor-react";

type StepActionButton = {
  label?: string;
  LeftIcon?: Icon;
  RightIcon?: Icon;
  action: () => void | Promise<() => void>;
};

export type Step = {
  getContent: () => React.FC;
  nextButton?: StepActionButton;
  prevButton?: StepActionButton;
};

export type StepList = Step[];
