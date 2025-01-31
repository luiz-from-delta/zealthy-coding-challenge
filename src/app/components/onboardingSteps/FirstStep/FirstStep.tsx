import { InputText } from "../../InputText";
import { StepLayout } from "../StepLayout";

export function FirstStep() {
  return (
    <StepLayout>
      <InputText label="Email" name="email" placeholder="Type your email..." />
      <InputText
        label="Password"
        name="password"
        placeholder="Type your password..."
        type="password"
      />
    </StepLayout>
  );
}
