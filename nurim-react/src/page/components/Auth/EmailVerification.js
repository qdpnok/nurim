import React, { useState } from "react";
import styled from "styled-components";
import api from "../../../api/Axios";

// --- 스타일 정의 ---
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

/**
 * 이메일 인증 공통 컴포넌트
 * @param {string} mode - "signup" | "findId" | "resetPwd"
 * @param {function} onSuccess - 인증 성공 콜백
 * @param {function} parentSetEmail - 부모 컴포넌트 이메일 상태 동기화
 * @param {function} parentSetId - 부모 컴포넌트 아이디 상태 동기화 (resetPwd 모드용)
 */
export default function EmailVerification({
  mode = "signup",
  onSuccess,
  parentSetEmail,
  parentSetId, // [추가] 부모에게 ID 전달용
}) {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(""); // [추가] 아이디 상태
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

    if (parentSetEmail) parentSetEmail(input);

    // 수정 시 초기화
    if (showAuthInput || isAuthVerified) {
      setShowAuthInput(false);
      setIsAuthVerified(false);
      setAuthCode("");
    }
  };

  // [추가] 아이디 입력 핸들러
  const handleIdChange = (e) => {
    const input = e.target.value;
    setUserId(input);
    if (parentSetId) parentSetId(input);
  };

  // 2. 인증번호 요청
  const handleRequestAuth = async () => {
    if (!isEmailFormatValid) return;

    if (mode === "resetPwd" && !userId.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }

    let url = "";
    if (mode === "signup") url = `/auth/signup-send-email`;
    else if (mode === "findId") url = `/auth/findId-send-email`;
    else if (mode === "resetPwd") url = `/auth/resetPwd-send-email`;

    const params = { email };
    if (mode === "resetPwd") {
      params.memberId = userId;
    }

    try {
      const response = await api.post(url, null, { params });

      if (response.status === 200) {
        alert("인증번호가 이메일로 발송되었습니다.");
        setShowAuthInput(true);
        setIsAuthVerified(false);
        setAuthCode("");
      }
    } catch (error) {
      console.error(error);

      // [수정된 부분] 백엔드 에러 메시지 우선 표시 로직
      let errorMsg = "인증번호 발송 실패. 다시 시도해주세요.";

      if (error.response && error.response.data) {
        // 1. 백엔드가 String으로 메시지만 보낸 경우 (예: "아이디와 이메일 정보가 일치하지 않습니다.")
        if (typeof error.response.data === "string") {
          errorMsg = error.response.data;
        }
        // 2. 백엔드가 JSON 객체로 보낸 경우 (예: { message: "...", code: "..." })
        // GlobalExceptionHandler 설정에 따라 다를 수 있으니 확인 필요
        else if (error.response.data.message) {
          errorMsg = error.response.data.message;
        }
      }

      alert(errorMsg);
    }
  };

  // 3. 인증번호 확인
  const handleVerifyAuth = async () => {
    if (authCode.length < 6) {
      alert("인증번호 6자리를 입력해주세요.");
      return;
    }

    let url = "";
    if (mode === "signup") url = `/auth/signup-valid-email`;
    else if (mode === "findId") url = `/auth/findId-valid-email`;
    else if (mode === "resetPwd") url = `/auth/resetPwd-valid-email`;

    const params = { email, code: authCode };
    // resetPwd일 때 memberId도 같이 검증하는지 백엔드 로직 확인 필요 (보통은 이메일+코드로 검증)
    // 만약 백엔드가 검증 때도 아이디를 요구한다면 아래 주석 해제
    // if (mode === "resetPwd") params.memberId = userId;

    try {
      const response = await api.post(url, null, { params });

      if (response.status === 200) {
        setIsAuthVerified(true);
        alert("이메일 인증이 완료되었습니다.");
        if (onSuccess) onSuccess(response.data);
      }
    } catch (error) {
      console.error(error);
      setIsAuthVerified(false);
      alert("인증번호가 올바르지 않거나 만료되었습니다.");
    }
  };

  return (
    <>
      {/* [추가] 비밀번호 재설정 모드일 때만 아이디 입력창 표시 */}
      {mode === "resetPwd" && (
        <InputGroup>
          <Label>ID</Label>
          <StyledInput
            type="text"
            placeholder="Please enter your ID"
            value={userId}
            onChange={handleIdChange}
            readOnly={isAuthVerified} // 인증 완료 후 수정 불가
          />
        </InputGroup>
      )}

      <InputGroup>
        <Label>Email Address</Label>
        <StyledInput
          type="email"
          placeholder="Please enter your email address"
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
