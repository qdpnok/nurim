import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../../../api/Axios"; // Axios 인스턴스 (baseURL이 /api로 설정되어 있다고 가정)
import EmailVerification from "./EmailVerification";

// --- 스타일 정의 (기존과 동일) ---
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

const InputGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #555;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 16px;
  font-size: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  color: #333;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2f6364;
  }
`;

const HelperText = styled.p`
  font-size: 13px;
  color: ${(props) => (props.$valid ? "#2f6364" : "#888")};
  margin: 0;
  line-height: 1.4;
`;

const ErrorText = styled.span`
  color: #e74c3c;
  font-size: 12px;
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
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;

  h3 {
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: #666;
  }
`;

export default function FindPw() {
  const navigate = useNavigate();

  // Step 1: 인증, 2: 비번 변경, 3: 완료
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(""); // 아이디 상태 추가
  const [isVerified, setIsVerified] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [isPwValid, setIsPwValid] = useState(false);
  const [isPwMatch, setIsPwMatch] = useState(false);

  // 1. 이메일 인증 성공 시 핸들러
  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  // 2. 비밀번호 입력 로직
  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setNewPassword(input);
    const pwRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    setIsPwValid(pwRegex.test(input));
    setIsPwMatch(input === confirmPw && input.length > 0);
  };

  const handleConfirmPwChange = (e) => {
    const input = e.target.value;
    setConfirmPw(input);
    setIsPwMatch(input === newPassword && input.length > 0);
  };

  // 3. 비밀번호 변경 요청 (API)
  const handleResetSubmit = async () => {
    if (!isPwValid || !isPwMatch) return;

    try {
      // [수정] URL에서 '/api' 제거 -> /auth/resetPwd
      await api.post("/auth/resetPwd", {
        // DTO 구조에 맞춰 데이터 전송 (email, pwd 필수)
        email: email,
        pwd: newPassword,
        // 필요하다면 userId도 보낼 수 있음 (백엔드 DTO 확인 필요)
      });

      setStep(3); // 성공 화면으로 이동
    } catch (error) {
      console.error(error);
      alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <FormSection>
      {/* --- Step 1: 이메일 인증 --- */}
      {step === 1 && (
        <>
          <Description>
            Please enter your ID & email address.
            <br />
            We will send you a verification code to issue a{" "}
            <b>change password.</b>
          </Description>

          <EmailVerification
            mode="resetPwd"
            onSuccess={handleVerificationSuccess}
            parentSetEmail={setEmail}
            parentSetId={setUserId}
          />

          <NextButton disabled={!isVerified} onClick={() => setStep(2)}>
            NEXT
          </NextButton>
        </>
      )}

      {/* --- Step 2: 새 비밀번호 입력 --- */}
      {step === 2 && (
        <>
          <Description>
            Please enter your
            <br />
            <b>New Password.</b>
          </Description>

          <InputGroup>
            <Label>New Password</Label>
            <StyledInput
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={handlePasswordChange}
            />
            <HelperText $valid={isPwValid}>
              8+ chars, 1 Uppercase, 1 Symbol (!@#$%^&*)
            </HelperText>
          </InputGroup>

          <InputGroup>
            <Label>Confirm Password</Label>
            <StyledInput
              type="password"
              placeholder="Re-enter new password"
              value={confirmPw}
              onChange={handleConfirmPwChange}
            />
            {!isPwMatch && confirmPw.length > 0 && (
              <ErrorText>Passwords do not match.</ErrorText>
            )}
          </InputGroup>

          <NextButton
            disabled={!isPwValid || !isPwMatch}
            onClick={handleResetSubmit}
          >
            Reset Password
          </NextButton>
        </>
      )}

      {/* --- Step 3: 완료 --- */}
      {step === 3 && (
        <>
          <Description>
            Your password has been changed.
            <br />
            Please login with your new password.
          </Description>

          <ResultBox>
            <h3>Success!</h3>
            <p>Your password has been successfully reset.</p>
          </ResultBox>

          <NextButton onClick={() => navigate("/login")}>
            Go to Login
          </NextButton>
        </>
      )}
    </FormSection>
  );
}
