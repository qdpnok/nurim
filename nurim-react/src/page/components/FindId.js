import React, { useState } from "react";
import styled from "styled-components";
import EmailVerification from "../components/EmailVerification";

const FormSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
`;

const Description = styled.p`
  font-size: 16px;
  color: #333;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 30px;
  white-space: pre-wrap;
  b {
    font-weight: 700;
  }
`;

const NextButton = styled.button`
  width: 100%;
  height: 55px;
  background-color: ${(props) => (props.disabled ? "#D3D3D3" : "#2f6364")};
  color: white;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 27.5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: auto;
  transition: background-color 0.3s;
  &:hover:not(:disabled) {
    background-color: #244f50;
  }
`;

const ResultBox = styled.div`
  text-align: center;
  margin-top: 40px;
  h3 {
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
  }
  p {
    font-size: 24px;
    color: #2f6364;
    font-weight: bold;
  }
`;

export default function FindId() {
  const [step, setStep] = useState(1);
  const [foundId, setFoundId] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // 인증 성공 시 실행 (data는 서버에서 보낸 아이디 문자열)
  const handleVerificationSuccess = (data) => {
    // AuthController가 ResponseEntity.ok(String)을 반환하므로 data는 아이디 스트링
    setFoundId(data);
    setIsVerified(true);
  };

  return (
    <FormSection>
      {step === 1 && (
        <>
          <Description>
            Please enter your email address.
            <br />
            We will send you a verification code to <b>Find ID.</b>
          </Description>

          <EmailVerification
            mode="findId"
            onSuccess={handleVerificationSuccess}
          />

          <NextButton disabled={!isVerified} onClick={() => setStep(2)}>
            NEXT
          </NextButton>
        </>
      )}

      {step === 2 && (
        <>
          <Description>
            Your verification is complete.
            <br />
            Here is your User ID.
          </Description>

          <ResultBox>
            <h3>Your ID</h3>
            <p>{foundId || "User ID not found"}</p>
          </ResultBox>

          <NextButton onClick={() => (window.location.href = "/login")}>
            Go to Login
          </NextButton>
        </>
      )}
    </FormSection>
  );
}
