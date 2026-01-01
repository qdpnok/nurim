import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/Axios";
import bgimg from "../img/LoginBGImg.jpg";
import nrw from "../img/NRWLOGO.png";
import nurimw from "../img/Logo.w.PNG";

import ceye from "../img/Ceye.png";
import oeye from "../img/Oeye.png";

// --- 스타일 정의 (기존 유지) ---
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${bgimg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;

  @media (min-width: 1025px) {
    justify-content: space-between;
    padding: 0 100px;
    max-width: 1440px;
  }
`;

const LeftSection = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  color: white;
  max-width: 500px;

  @media (min-width: 1025px) {
    display: flex;
    margin-left: 60px;
  }
`;

const LogoArea = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 80px;
  font-family: sans-serif;
  letter-spacing: 2px;
`;
const MainSlogan = styled.h2`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 24px;
  font-family: "Zen Kaku Gothic Antique", sans-serif;
`;
const Description = styled.p`
  font-size: 16px;
  line-height: 1.8;
  opacity: 0.9;
  font-family: "Zen Kaku Gothic Antique", sans-serif;
  margin-bottom: 60px;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 460px;
  background-color: white;
  border-radius: 20px;
  padding: 60px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1025px) {
    border-radius: 20px 20px 0px 0px;
    height: 768px;
    margin-top: 100px;
    margin-right: 60px;
  }

  @media (max-width: 480px) {
    padding: 40px 20px;
  }
`;

const CardHeader = styled.div`
  margin-bottom: 40px;
`;
const WelcomeText = styled.p`
  font-size: 14px;
  color: #888;
  font-weight: 600;
  margin-bottom: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;
const TitleText = styled.h2`
  font-size: 28px;
  color: #333;
  font-weight: 700;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 24px;
  }
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
const Label = styled.label`
  font-size: 13px;
  color: #666;
  font-weight: 500;
`;
const InputWrapper = styled.div`
  position: relative;
`;
const StyledInput = styled.input`
  width: 100%;
  height: 52px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 15px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #2f6364;
  }
`;
const EyeIcon = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
  font-size: 18px;
  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`;

const OptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  margin-top: -10px;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;
const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #555;
`;
const ForgotLink = styled(Link)`
  color: #555;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: #2f6364;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #244f50;
  }
`;
const SignupText = styled.div`
  text-align: center;
  margin-top: 30px;
  font-size: 13px;
  color: #666;
  span {
    color: #333;
    font-weight: 700;
    margin-left: 5px;
    cursor: pointer;
    text-decoration: underline;
  }
`;

// 로고 스타일
const LogoNurim = styled.img`
  width: 145px;
  height: 32px;
  margin-bottom: 5px;
`;
const LogoNR = styled.img`
  width: 75px;
  height: 46px;
  margin-right: 20px;
`;

const LogIn = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // JWT Decoding Function
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { id, pwd, rememberMe });

      if (response.status === 200) {
        // [수정 완료] 구조 분해 할당 문법 오류 수정 ({ } 추가)
        let { accessToken, memberNum, status } = response.data;

        if (!accessToken) {
          console.error("토큰을 응답받지 못했습니다.", response.data);
          alert("로그인 처리 중 오류가 발생했습니다.");
          return;
        }

        // [수정 완료] memberNum이 없을 때 재할당 로직
        if (!memberNum) {
          console.log("memberNum이 null이라 토큰에서 추출합니다.");
          const decodedToken = parseJwt(accessToken);
          memberNum = decodedToken ? decodedToken.memberNum : null;
        }

        // 최종적으로 값을 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("memberNum", memberNum);

        // status 기본값 처리
        const memberStatus = status || "MEMBER";
        localStorage.setItem("memberStatus", memberStatus);

        console.log("저장된 회원번호:", memberNum); // 1이 나오면 성공!
        console.log("저장된 상태:", memberStatus);

        alert("로그인 되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <LeftSection>
          <LogoArea>
            <LogoNR src={nrw} alt="흰로고" />
            <LogoNurim src={nurimw} alt="흰로고" />
          </LogoArea>
          <MainSlogan>소유를 넘어선 경험</MainSlogan>
          <Description>
            누림은 단순히 제품을 빌려주는 '대여 서비스'가 아니라,
            <br />
            제품을 통해 얻는 가치와 경험을 고객이 온전히
            <br />
            '누리게' 하는 라이프스타일 파트너입니다.
          </Description>
        </LeftSection>
        <LoginCard>
          <CardHeader>
            <WelcomeText>WELCOME BACK</WelcomeText>
            <TitleText>Log In to your Account</TitleText>
          </CardHeader>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>ID</Label>
              <StyledInput
                type="text"
                placeholder="Enter your ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                autoComplete="username"
              />
            </InputGroup>
            <InputGroup>
              <Label>Password</Label>
              <InputWrapper>
                <StyledInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                  <img src={showPassword ? oeye : ceye} alt="toggle" />
                </EyeIcon>
              </InputWrapper>
            </InputGroup>
            <OptionsRow>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </CheckboxLabel>
              <ForgotLink to="/findip">Forgot ID/Password?</ForgotLink>
            </OptionsRow>
            <SubmitButton type="submit">LOGIN</SubmitButton>
          </Form>
          <SignupText>
            New User?{" "}
            <span onClick={() => navigate("/signup")}>SIGN UP HERE</span>
          </SignupText>
        </LoginCard>
      </ContentWrapper>
    </Container>
  );
};
export default LogIn;
