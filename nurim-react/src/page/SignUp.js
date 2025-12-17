import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";

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
  width: 600px; // 폼 너비 적절하게 조정
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-top: 60px; // 로고와의 간격
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
  transform: translateY(-14px); // 원의 중앙으로 라인 이동
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
  top: 38px; // 라벨 높이 고려
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

// --- Modal UI (요청사항 반영: w535 h428) ---
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

// 체크 아이콘 (CSS로 구현)
const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #2f6364;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;

  // 체크 모양
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

  // --- 상태 관리 (State) ---
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Step 1: 이메일
  const [email, setEmail] = useState("");
  const [isEmailUnique, setIsEmailUnique] = useState(false);
  const [showAuthInput, setShowAuthInput] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [isAuthVerified, setIsAuthVerified] = useState(false);

  // Step 2: 기본 정보
  const [userId, setUserId] = useState("");
  const [isIdUnique, setIsIdUnique] = useState(false);
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  // Step 3: 비밀번호
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [isPwValid, setIsPwValid] = useState(false);
  const [isPwMatch, setIsPwMatch] = useState(false);

  // --- 로직 (Logic) ---

  // 1. 이메일 체크
  const checkEmail = (input) => {
    setEmail(input);
    const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    // 테스트용: 'test'가 포함 안되면 사용 가능
    setIsEmailUnique(isValidFormat && !input.includes("test"));
  };

  const handleRequestAuth = () => {
    if (isEmailUnique) {
      alert("인증번호가 발송되었습니다.");
      setShowAuthInput(true);
    }
  };

  const handleVerifyAuth = () => {
    if (authCode.length === 6) {
      setIsAuthVerified(true);
    } else {
      alert("6자리 인증번호를 입력해주세요.");
    }
  };

  // 2. 아이디 체크
  const checkId = (input) => {
    setUserId(input);
    // 테스트용: 4글자 이상이면 가능
    setIsIdUnique(input.length >= 4);
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

  // 4. 비밀번호
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

  const handleFinalSubmit = () => {
    // API 호출 성공 가정
    setShowModal(true);
  };

  return (
    <Container>
      <Card>
        {/* 상단 로고 (클릭 시 홈으로) */}

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
                  onChange={(e) => checkEmail(e.target.value)}
                />
                {!isEmailUnique && email.length > 0 && (
                  <ErrorText>Invalid email format or already taken.</ErrorText>
                )}
              </InputGroup>

              {!showAuthInput && (
                <AuthButton
                  disabled={!isEmailUnique}
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
                  onChange={(e) => checkId(e.target.value)}
                />
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

      {/* --- 성공 모달 (w535 x h428) --- */}
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
