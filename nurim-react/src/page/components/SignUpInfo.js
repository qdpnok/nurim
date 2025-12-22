import React from "react";
import {
  FormSection,
  InputGroup,
  Label,
  StyledInput,
  ErrorText,
  HelperText,
  NextButton,
} from "../../styles/AuthStyles";

export default function SignUpInfo({
  userId,
  handleUserIdChange,
  checkId,
  idCheckMsg,
  isIdUnique,
  userName,
  setUserName,
  phone,
  handlePhone,
  isPhoneValid,
  onNext,
}) {
  return (
    <FormSection>
      <InputGroup>
        <Label>ID</Label>
        <StyledInput
          type="text"
          placeholder="Enter your ID"
          value={userId}
          onChange={handleUserIdChange}
          onBlur={checkId}
        />
        {userId.length > 0 && !isIdUnique && (
          <ErrorText>{idCheckMsg || "Please check your ID."}</ErrorText>
        )}
        {isIdUnique && <HelperText $valid={true}>Available ID</HelperText>}
      </InputGroup>

      <InputGroup>
        <Label>Name</Label>
        <StyledInput
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <Label>Phone Number</Label>
        <StyledInput
          type="text"
          placeholder="010-0000-0000"
          value={phone}
          onChange={handlePhone}
          maxLength={13}
        />
      </InputGroup>

      <NextButton
        disabled={!isIdUnique || !userName || !isPhoneValid}
        onClick={onNext}
      >
        Next
      </NextButton>
    </FormSection>
  );
}
