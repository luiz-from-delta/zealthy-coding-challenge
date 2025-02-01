import { UserSchema, UserWithId } from "@/app/providers";
import { Icon } from "phosphor-react";

export type StepActionResponse =
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

type StepAction = (
  values?: UserSchema,
  user?: UserWithId
) => StepActionResponse | Promise<StepActionResponse> | void;

type StepActionButton = {
  action: StepAction;
  label?: string;
  LeftIcon?: Icon;
  RightIcon?: Icon;
};

export type Step = {
  getContent: () => React.FC;
  name: string;
  nextButton?: StepActionButton;
  prevButton?: StepActionButton;
};

export type StepList = Step[];
