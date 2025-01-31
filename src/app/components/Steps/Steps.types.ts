import { UserSchema, UserWithId } from "@/app/providers";
import { Icon } from "phosphor-react";

type StepActionResponse =
  | {
      data: UserWithId;
      error: null;
      success: true;
    }
  | {
      data: null;
      error: string;
      success: false;
    };

type StepActionButton = {
  label?: string;
  LeftIcon?: Icon;
  RightIcon?: Icon;
  action: (
    values?: UserSchema,
    user?: UserWithId
  ) => StepActionResponse | Promise<StepActionResponse> | void;
};

export type Step = {
  getContent: () => React.FC;
  nextButton?: StepActionButton;
  prevButton?: StepActionButton;
};

export type StepList = Step[];
