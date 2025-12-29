import React from "react";
import styled from "styled-components";
import {
  FormSection,
  InputGroup,
  Label,
  StyledInput,
  ErrorText,
  HelperText,
  NextButton,
} from "../../../styles/AuthStyles";

// EmailVerification의 SmallBtn 스타일을 가져와서 적용
const CheckBtn = styled.button`
  position: absolute;
  right: 10px; /* 입력창 오른쪽 여백 */
  top: 38px; /* 라벨 높이를 고려하여 입력창 중앙에 오도록 위치 조정 */
  padding: 6px 12px;
  background: #2f6364;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #244f50;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export default function SignUpInfo({
  userId,
  handleUserIdChange,
  checkId, // 부모 컴포넌트에서 전달받은 중복확인 함수 (API 호출)
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
      {/* 버튼 위치를 잡기 위해 position: relative 스타일 추가 */}
      <InputGroup style={{ position: "relative" }}>
        <Label>ID</Label>
        <StyledInput
          type="text"
          placeholder="Enter your ID"
          value={userId}
          onChange={handleUserIdChange}
          // onBlur={checkId} // 버튼으로 체크하므로 onBlur는 제거하거나 선택적으로 유지
        />

        {/* 중복 확인 버튼 추가 */}
        <CheckBtn
          onClick={checkId}
          disabled={!userId || userId.length < 4} // ID가 없거나 너무 짧으면 비활성화
          type="button" // form submit 방지
        >
          Check
        </CheckBtn>

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
