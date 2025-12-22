import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";

// 분리한 스타일과 컴포넌트 import
import {
  Container,
  Card,
  Content,
  Header,
  Title,
  SubText,
  LinkSpan,
  StepperContainer,
  StepperItem,
  Circle,
  StepText,
  Line,
  FormSection,
  NextButton,
  ModalOverlay,
  ModalContent,
  SuccessIcon,
  ModalTitle,
  ModalDesc,
  ModalButton,
} from "../styles/AuthStyles";

import EmailVerification from "./components/EmailVerification";
import SignUpInfo from "./components/SignUpInfo";
import SignUpPassword from "./components/SignUpPassword";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // --- Step 1 State ---
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // --- Step 2 State ---
  const [userId, setUserId] = useState("");
  const [isIdUnique, setIsIdUnique] = useState(false);
  const [idCheckMsg, setIdCheckMsg] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  // --- Step 3 State ---
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [isPwValid, setIsPwValid] = useState(false);
  const [isPwMatch, setIsPwMatch] = useState(false);

  // --- Handlers ---
  const handleEmailSuccess = () => {
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

          {/* --- STEP 1: Email --- */}
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

          {/* --- STEP 2: Info --- */}
          {step === 2 && (
            <SignUpInfo
              userId={userId}
              handleUserIdChange={handleUserIdChange}
              checkId={checkId}
              idCheckMsg={idCheckMsg}
              isIdUnique={isIdUnique}
              userName={userName}
              setUserName={setUserName}
              phone={phone}
              handlePhone={handlePhone}
              isPhoneValid={isPhoneValid}
              onNext={() => setStep(3)}
            />
          )}

          {/* --- STEP 3: Password --- */}
          {step === 3 && (
            <SignUpPassword
              password={password}
              handlePassword={handlePassword}
              isPwValid={isPwValid}
              confirmPw={confirmPw}
              handleConfirmPw={handleConfirmPw}
              isPwMatch={isPwMatch}
              onSubmit={handleFinalSubmit}
            />
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
