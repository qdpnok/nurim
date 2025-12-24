import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/Axios";
import EmailVerification from "./components/Auth/EmailVerification";

// --- 스타일 정의 ---
const Container = styled.div`
  width: 100%;
  min-height: 100vh; /* 화면 전체 높이 사용 */
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  padding: 20px; /* 모바일에서 테두리 여백 확보 */
  box-sizing: border-box;
`;

const Card = styled.div`
  width: 100%;
  max-width: 600px; /* 카드의 최대 너비 제한 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
`;

const Content = styled.div`
  width: 100%; /* 부모(Card) 너비에 맞춤 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-top: 40px;
`;

const Header = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 32px; /* 모바일 고려하여 폰트 사이즈 약간 축소 */
  font-weight: 600;
  color: #333;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const SubText = styled.div`
  font-size: 16px;
  color: #888;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const LinkSpan = styled(Link)`
  color: #2f6364;
  font-weight: 600;
  text-decoration: none;
  margin-left: 6px;
`;

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 10px; /* 좌우 여백 */
  box-sizing: border-box;
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

  @media (max-width: 480px) {
    font-size: 12px; /* 모바일에서 텍스트 크기 줄임 */
  }
`;

const Line = styled.div`
  flex: 1;
  height: 2px;
  background-color: ${(props) => (props.$active ? "#2f6364" : "#e0e0e0")};
  margin: 0 10px;
  transform: translateY(-14px); /* 텍스트 높이 고려 위치 조정 */
  transition: background-color 0.3s;
`;

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

// --- 모달 반응형 수정 ---
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
  padding: 20px;
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 535px; /* 최대 너비 설정 */
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
  word-break: keep-all; /* 모바일 줄바꿈 방지 */
`;

const ModalDesc = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 40px 0;
  text-align: center;
  line-height: 1.5;
`;

const ModalButton = styled.button`
  width: 100%;
  max-width: 200px;
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

const SignUp = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Step 1: Email
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Step 2: Info
  const [userId, setUserId] = useState("");
  const [isIdUnique, setIsIdUnique] = useState(false);
  const [idCheckMsg, setIdCheckMsg] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  // Step 3: Password
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [isPwValid, setIsPwValid] = useState(false);
  const [isPwMatch, setIsPwMatch] = useState(false);

  // Logic
  const handleEmailSuccess = (data) => {
    setIsEmailVerified(true);
  };

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
        setIdCheckMsg("");
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

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    setIsIdUnique(false);
  };

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
      alert("회원가입 실패. 정보를 확인해주세요.");
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

          {step === 1 && (
            <FormSection>
              <EmailVerification
                mode="signup"
                onSuccess={handleEmailSuccess}
                parentSetEmail={setEmail}
              />
              <NextButton
                disabled={!isEmailVerified}
                onClick={() => setStep(2)}
              >
                Next
              </NextButton>
            </FormSection>
          )}

          {step === 2 && (
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
