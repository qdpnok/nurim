import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/Axios"; // Axios 인스턴스 import

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
`;

const Card = styled.div`
  width: 100%;
  max-width: 1440px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
`;

const Content = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-top: 60px;
`;

const Header = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const SubText = styled.div`
  font-size: 16px;
  color: #888;
`;

const LinkSpan = styled(Link)`
  color: #2f6364;
  font-weight: 600;
  text-decoration: none;
  margin-left: 6px;
`;

// --- Stepper UI ---
const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StepperItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
`;

const Circle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#2f6364" : "#e0e0e0")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s;
`;

const StepText = styled.span`
  font-size: 14px;
  color: ${(props) => (props.$active ? "#333" : "#aaa")};
  font-weight: ${(props) => (props.$active ? 600 : 400)};
`;

const Line = styled.div`
  flex: 1;
  height: 2px;
  background-color: ${(props) => (props.$active ? "#2f6364" : "#e0e0e0")};
  margin: 0 10px;
  transform: translateY(-14px);
  transition: background-color 0.3s;
`;

// --- Form UI ---
const FormSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

const Label = styled.label`
  font-size: 15px;
  color: #555;
  font-weight: 500;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 52px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 15px;
  box-sizing: border-box;
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

const ErrorText = styled.p`
  font-size: 13px;
  color: #e74c3c;
  margin: 0;
`;

const AuthButton = styled.div`
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

  &:hover {
    background-color: #f0fcfc;
  }

  ${(props) =>
    props.disabled &&
    css`
      border-color: #ddd;
      color: #aaa;
      cursor: not-allowed;
      &:hover {
        background-color: white;
      }
    `}
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

const NextButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: #2f6364;
  border-radius: 8px;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #244f50;
  }
`;

// --- Modal UI ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 535px;
  height: 428px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #2f6364;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;

  &::after {
    content: "";
    display: block;
    width: 20px;
    height: 36px;
    border: solid #2f6364;
    border-width: 0 5px 5px 0;
    transform: rotate(45deg);
    margin-top: -8px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
  text-align: center;
`;

const ModalDesc = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 40px 0;
  text-align: center;
  line-height: 1.5;
`;

const ModalButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: #2f6364;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #244f50;
  }
`;

// --- Component ---
const SignUp = () => {
  const navigate = useNavigate();

  // --- 상태 관리 ---
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Step 1: Email
  const [email, setEmail] = useState("");
  const [isEmailFormatValid, setIsEmailFormatValid] = useState(false); // 형식 유효성
  const [showAuthInput, setShowAuthInput] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [isAuthVerified, setIsAuthVerified] = useState(false);

  // Step 2: Info
  const [userId, setUserId] = useState("");
  const [isIdUnique, setIsIdUnique] = useState(false);
  const [idCheckMsg, setIdCheckMsg] = useState(""); // 아이디 중복 확인 메시지
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  // Step 3: Password
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [isPwValid, setIsPwValid] = useState(false);
  const [isPwMatch, setIsPwMatch] = useState(false);

  // --- Logic ---

  // 1-1. 이메일 형식 체크
  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);
    const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    setIsEmailFormatValid(isValidFormat);
  };

  // 1-2. 인증번호 요청 (API)
  const handleRequestAuth = async () => {
    if (!isEmailFormatValid) return;

    try {
      // 서버: 이메일 중복 체크 후 인증번호 발송
      // 응답 예시: { status: 200, message: "Sent" }
      await api.post(`/auth/signup-send-email?email=${email}`);
      alert("인증번호가 이메일로 발송되었습니다.");
      setShowAuthInput(true);
    } catch (error) {
      console.error(error);
      // 서버 에러 메시지에 따라 분기 가능 (예: 이미 가입된 이메일)
      if (error.response && error.response.status === 409) {
        alert("이미 가입된 이메일입니다.");
      } else {
        alert("인증번호 발송 실패. 다시 시도해주세요.");
      }
    }
  };

  // 1-3. 인증번호 확인 (API)
  const handleVerifyAuth = async () => {
    if (authCode.length < 6) {
      alert("인증번호 6자리를 입력해주세요.");
      return;
    }

    try {
      // 서버: { email, authCode } 확인
      const response = await api.post(
        `/auth/signup-valid-email?code=${authCode}`
      );

      if (response.status === 200) {
        setIsAuthVerified(true);
        alert("이메일 인증이 완료되었습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("인증번호가 올바르지 않거나 만료되었습니다.");
      setIsAuthVerified(false);
    }
  };

  // 2-1. 아이디 중복 체크 (API + Debounce 추천하지만 여기선 onBlur 또는 버튼으로 처리)
  // 여기서는 useEffect를 사용하여 입력 멈춤 감지 혹은 간단하게 onBlur 시 체크하도록 구현
  const checkId = async () => {
    if (userId.length < 4) {
      setIdCheckMsg("아이디는 4글자 이상이어야 합니다.");
      setIsIdUnique(false);
      return;
    }

    try {
      const response = await api.get(`/auth/check-id?memberId=${userId}`);
      if (response.status === 200) {
        setIsIdUnique(true);
        setIdCheckMsg(""); // 사용 가능하면 메시지 지움
      }
    } catch (error) {
      setIsIdUnique(false);
      if (error.response && error.response.status === 409) {
        setIdCheckMsg("이미 사용중인 아이디입니다.");
      } else {
        setIdCheckMsg("중복 확인 중 오류가 발생했습니다.");
      }
    }
  };

  // 아이디 입력 핸들러
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    setIsIdUnique(false); // 변경 시 다시 체크 필요
  };

  // 3. 폰번호 포맷
  const handlePhone = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, "");
    if (val.length > 11) val = val.slice(0, 11);

    let formatted = val;
    if (val.length > 3 && val.length <= 7) {
      formatted = `${val.slice(0, 3)}-${val.slice(3)}`;
    } else if (val.length > 7) {
      formatted = `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7)}`;
    }
    setPhone(formatted);
    setIsPhoneValid(val.length >= 10);
  };

  // 4. 비밀번호 로직
  const handlePassword = (input) => {
    setPassword(input);
    const pwRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    setIsPwValid(pwRegex.test(input));
    setIsPwMatch(input === confirmPw && input.length > 0);
  };

  const handleConfirmPw = (input) => {
    setConfirmPw(input);
    setIsPwMatch(input === password && input.length > 0);
  };

  // 5. 최종 회원가입 요청
  const handleFinalSubmit = async () => {
    if (!isPwValid || !isPwMatch) return;

    const signupData = {
      email,
      id: userId,
      name: userName,
      phoneNum: phone,
      pwd: password,
    };

    try {
      const response = await api.post("/auth/join", signupData);
      if (response.status === 200 || response.status === 201) {
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
      alert("회원가입 처리에 실패했습니다. 정보를 확인해주세요.");
    }
  };

  return (
    <Container>
      <Card>
        <Content>
          <Header>
            <Title>Create an account</Title>
            <SubText>
              Already have an account? <LinkSpan to="/login">Log in</LinkSpan>
            </SubText>
          </Header>

          {/* Stepper */}
          <StepperContainer>
            <StepperItem>
              <Circle $active={step >= 1}>1</Circle>
              <StepText $active={step >= 1}>Email</StepText>
            </StepperItem>
            <Line $active={step >= 2} />
            <StepperItem>
              <Circle $active={step >= 2}>2</Circle>
              <StepText $active={step >= 2}>Info</StepText>
            </StepperItem>
            <Line $active={step >= 3} />
            <StepperItem>
              <Circle $active={step >= 3}>3</Circle>
              <StepText $active={step >= 3}>Password</StepText>
            </StepperItem>
          </StepperContainer>

          {/* --- STEP 1 --- */}
          {step === 1 && (
            <FormSection>
              <InputGroup>
                <Label>What’s your email?</Label>
                <StyledInput
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  readOnly={showAuthInput} // 인증번호 발송 후엔 수정 불가 (선택사항)
                />
                {!isEmailFormatValid && email.length > 0 && (
                  <ErrorText>Invalid email format.</ErrorText>
                )}
              </InputGroup>

              {!showAuthInput && (
                <AuthButton
                  disabled={!isEmailFormatValid}
                  onClick={handleRequestAuth}
                >
                  Request Authentication
                </AuthButton>
              )}

              {showAuthInput && (
                <InputGroup>
                  <Label>Authentication Code</Label>
                  <StyledInput
                    type="text"
                    placeholder="6-digit code"
                    maxLength={6}
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    readOnly={isAuthVerified} // 인증 완료 후 수정 불가
                  />
                  {authCode.length === 6 && !isAuthVerified && (
                    <SmallBtn onClick={handleVerifyAuth}>Verify</SmallBtn>
                  )}
                </InputGroup>
              )}

              <NextButton disabled={!isAuthVerified} onClick={() => setStep(2)}>
                Next
              </NextButton>
            </FormSection>
          )}

          {/* --- STEP 2 --- */}
          {step === 2 && (
            <FormSection>
              <InputGroup>
                <Label>ID</Label>
                <StyledInput
                  type="text"
                  placeholder="Enter your ID"
                  value={userId}
                  onChange={handleUserIdChange}
                  onBlur={checkId} // 포커스 잃을 때 중복 체크
                />
                {/* 중복 체크 메시지 출력 */}
                {userId.length > 0 && !isIdUnique && (
                  <ErrorText>{idCheckMsg || "Please check your ID."}</ErrorText>
                )}
                {isIdUnique && (
                  <HelperText $valid={true}>Available ID</HelperText>
                )}
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
                onClick={() => setStep(3)}
              >
                Next
              </NextButton>
            </FormSection>
          )}

          {/* --- STEP 3 --- */}
          {step === 3 && (
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

              <NextButton
                disabled={!isPwValid || !isPwMatch}
                onClick={handleFinalSubmit}
              >
                Create Account
              </NextButton>
            </FormSection>
          )}
        </Content>
      </Card>

      {/* --- Success Modal --- */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <SuccessIcon />
            <ModalTitle>Membership registration completed</ModalTitle>
            <ModalDesc>
              Your membership registration has been completed.
            </ModalDesc>
            <ModalButton onClick={() => navigate("/login")}>
              Go to Login
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default SignUp;
