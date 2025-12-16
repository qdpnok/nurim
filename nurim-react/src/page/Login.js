import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";

// --- Styled Components ---
const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 180px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    46deg,
    rgba(33, 33, 33, 0.95) 0%,
    rgba(66, 66, 66, 0.8) 100%
  );
  padding: 40px 0;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  padding: 0 40px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 50px;
  }
`;

const BrandAside = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: white;
  @media (max-width: 1024px) {
    text-align: center;
    align-items: center;
  }
`;

const BrandTitle = styled.h2`
  font-family: "Zen Kaku Gothic Antique", sans-serif;
  font-weight: 700;
  font-size: 40px;
  margin: 0;
`;

const BrandDescription = styled.p`
  font-family: "Zen Kaku Gothic Antique", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.9;
`;

const LoginCard = styled.div`
  width: 460px;
  background-color: #fafafa;
  border-radius: 12px;
  padding: 60px 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const WelcomeText = styled.span`
  font-size: 13px;
  color: #666;
  font-weight: 500;
`;

const TitleText = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  color: #666;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
  background-color: white;
  box-sizing: border-box;
  &:focus {
    border-color: #2f6364;
    outline: none;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ToggleBtn = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
  color: #999;
`;

const OptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`;

const RememberMeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #333;
`;

const ForgotPasswordLink = styled.a`
  color: #666;
  text-decoration: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 54px;
  background-color: #2f6364;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #244f50;
  }
`;

const FooterText = styled.div`
  text-align: center;
  font-size: 14px;
  color: #333;
`;

const SignUpLink = styled.span`
  color: #2f6364;
  font-weight: 700;
  text-decoration: underline;
  margin-left: 5px;
  cursor: pointer;
`;

// --- Component ---
const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
        rememberMe,
      });

      if (response.status === 200) {
        alert("로그인 되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("로그인 실패. 정보를 확인해주세요.");
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <BrandAside>
          <BrandTitle>소유를 넘어선 경험</BrandTitle>
          <BrandDescription>
            누림은 단순히 제품을 빌려주는 '대여 서비스'가 아니라,
            <br />
            제품을 통해 얻는 가치와 경험을 고객이 온전히
            <br />
            '누리게' 하는 라이프스타일 파트너입니다.
          </BrandDescription>
        </BrandAside>

        <LoginCard>
          <Header>
            <WelcomeText>WELCOME BACK</WelcomeText>
            <TitleText>Log In to your Account</TitleText>
          </Header>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <InputLabel>Email (ID)</InputLabel>
              <StyledInput
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>Password</InputLabel>
              <PasswordWrapper>
                <StyledInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <ToggleBtn
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </ToggleBtn>
              </PasswordWrapper>
            </InputGroup>

            <OptionsRow>
              <RememberMeLabel>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </RememberMeLabel>
              <ForgotPasswordLink href="#forgot">
                Forgot ID/Password?
              </ForgotPasswordLink>
            </OptionsRow>

            <SubmitButton type="submit">LOGIN</SubmitButton>
          </Form>

          <FooterText>
            New User?{" "}
            <SignUpLink onClick={() => navigate("/signup")}>
              SIGN UP HERE
            </SignUpLink>
          </FooterText>
        </LoginCard>
      </ContentWrapper>
    </Container>
  );
};

export default LogIn;
