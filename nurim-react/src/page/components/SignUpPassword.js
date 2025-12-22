import React from "react";
import {
  FormSection,
  InputGroup,
  Label,
  StyledInput,
  HelperText,
  ErrorText,
  NextButton,
} from "../../styles/AuthStyles";

export default function SignUpPassword({
  password,
  handlePassword,
  isPwValid,
  confirmPw,
  handleConfirmPw,
  isPwMatch,
  onSubmit,
}) {
  return (
    <FormSection>
      <InputGroup>
        <Label>Password</Label>
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
        />
        <HelperText $valid={isPwValid}>
          8+ chars, 1 Uppercase, 1 Symbol (!@#$%^&*)
        </HelperText>
      </InputGroup>

      <InputGroup>
        <Label>Confirm Password</Label>
        <StyledInput
          type="password"
          placeholder="Re-enter password"
          value={confirmPw}
          onChange={(e) => handleConfirmPw(e.target.value)}
        />
        {!isPwMatch && confirmPw.length > 0 && (
          <ErrorText>Passwords do not match.</ErrorText>
        )}
      </InputGroup>

      <NextButton disabled={!isPwValid || !isPwMatch} onClick={onSubmit}>
        Create Account
      </NextButton>
    </FormSection>
  );
}
