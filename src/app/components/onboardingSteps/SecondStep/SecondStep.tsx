import { Textarea } from "../../Textarea";
import { StepLayout } from "../StepLayout";

export function SecondStep() {
  return (
    <StepLayout>
      <Textarea
        label="About Me"
        name="aboutMe"
        placeholder="Tell us about yourself..."
      />
    </StepLayout>
  );
}
