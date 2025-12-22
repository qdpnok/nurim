import React, { useState } from "react";
import styled from "styled-components";
import api from "../../api/Axios";

// --- 스타일 정의 (기존과 동일) ---
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
  border: 1px solid ${(props) => (props.readOnly ? "#f0f0f0" : "#ddd")};
  background-color: ${(props) => (props.readOnly ? "#fafafa" : "white")};
  border-radius: 8px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  color: #333;
  transition: border-color 0.2s;
  &::placeholder {
    color: #c0c0c0;
  }
  &:focus {
    outline: none;
    border-color: #2f6364;
  }
`;
const ErrorText = styled.span`
  color: #e74c3c;
  font-size: 12px;
`;
const AuthButton = styled.button`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #2f6364;
  border-radius: 8px;
  color: #2f6364;
  font-weight: 600;
  cursor: pointer;
  background-color: white;
  transition: all 0.2s;
  margin-bottom: 10px;
  &:hover {
    background-color: #f0fcfc;
  }
  &:disabled {
    border-color: #ddd;
    color: #aaa;
    cursor: not-allowed;
    background-color: white;
  }
`;
const SmallBtn = styled.button`
  position: absolute;
  right: 8px;
  top: 38px;
  padding: 6px 12px;
  background: #2f6364;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  &:hover {
    background: #244f50;
  }
`;
const ResendLink = styled.span`
  font-size: 12px;
  color: #666;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #2f6364;
  }
`;

export default function EmailVerification({
  mode = "signup",
  onSuccess,
  parentSetEmail,
}) {
  const [email, setEmail] = useState("");
  const [isEmailFormatValid, setIsEmailFormatValid] = useState(false);

  const [showAuthInput, setShowAuthInput] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [isAuthVerified, setIsAuthVerified] = useState(false);

  // 1. 이메일 입력 핸들러
  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);
    const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    setIsEmailFormatValid(isValidFormat);

    if (parentSetEmail) {
      parentSetEmail(input);
    }

    if (showAuthInput || isAuthVerified) {
      setShowAuthInput(false);
      setIsAuthVerified(false);
      setAuthCode("");
    }
  };

  // 2. 인증번호 요청
  const handleRequestAuth = async () => {
    if (!isEmailFormatValid) return;

    // [수정] URL에서 '/api' 제거 (Axios baseURL과 중복 방지)
    // 결과적으로 Axios가 baseURL(/api) + url(/auth/...) = /api/auth/... 로 조합함
    const url =
      mode === "signup" ? `/auth/signup-send-email` : `/auth/findId-send-email`;

    try {
      const response = await api.post(url, null, {
        params: { email: email },
      });

      if (response.status === 200) {
        alert("인증번호가 이메일로 발송되었습니다.");
        setShowAuthInput(true);
        setIsAuthVerified(false);
        setAuthCode("");
      }
    } catch (error) {
      console.error(error);
      const errorMsg =
        mode === "signup"
          ? "이미 가입된 이메일입니다."
          : "등록되지 않은 이메일입니다.";

      if (
        error.response &&
        (error.response.status === 400 ||
          error.response.status === 404 ||
          error.response.status === 409)
      ) {
        alert(errorMsg);
      } else {
        alert("인증번호 발송 실패. 다시 시도해주세요.");
      }
    }
  };

  // 3. 인증번호 확인
  const handleVerifyAuth = async () => {
    if (authCode.length < 6) {
      alert("인증번호 6자리를 입력해주세요.");
      return;
    }

    // [수정] URL에서 '/api' 제거
    const url =
      mode === "signup"
        ? `/auth/signup-valid-email`
        : `/auth/findId-valid-email`;

    try {
      const response = await api.post(url, null, {
        params: {
          email: email,
          code: authCode,
        },
      });

      if (response.status === 200) {
        setIsAuthVerified(true);
        alert("이메일 인증이 완료되었습니다.");

        if (onSuccess) {
          onSuccess(response.data);
        }
      }
    } catch (error) {
      console.error(error);
      setIsAuthVerified(false);
      alert("인증번호가 올바르지 않거나 만료되었습니다.");
    }
  };

  return (
    <>
      <InputGroup>
        <Label>Email Address</Label>
        <StyledInput
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          readOnly={isAuthVerified}
        />
        {!isEmailFormatValid && email.length > 0 && (
          <ErrorText>Invalid email format.</ErrorText>
        )}
      </InputGroup>

      {!showAuthInput && !isAuthVerified && (
        <AuthButton onClick={handleRequestAuth} disabled={!isEmailFormatValid}>
          Authentication
        </AuthButton>
      )}

      {showAuthInput && (
        <InputGroup style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <Label style={{ marginBottom: 0 }}>Authentication Code</Label>
            {!isAuthVerified && (
              <ResendLink onClick={handleRequestAuth}>Resend code</ResendLink>
            )}
          </div>
          <StyledInput
            type="text"
            placeholder="6-digit code"
            maxLength={6}
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            readOnly={isAuthVerified}
          />
          {authCode.length === 6 && !isAuthVerified && (
            <SmallBtn onClick={handleVerifyAuth}>Verify</SmallBtn>
          )}
          {isAuthVerified && (
            <span
              style={{ color: "#2f6364", fontSize: "12px", marginTop: "5px" }}
            >
              ✓ Verified successfully
            </span>
          )}
        </InputGroup>
      )}
    </>
  );
}
