import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";
import bgimg from "../img/LoginBGImg.jpg";
import nrw from "../img/NRWLOGO.png";
import nr from "../img/NRLOGO.png";
import nurimw from "../img/Logo.w.PNG";

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 900px; // 전체 높이
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  // 배경 이미지
  background-image: url(${bgimg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  // 배경 어둡게 처리 (Overlay)
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); // 이미지에 맞춰 어둡기 조절
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between; // 좌우 배분
  align-items: center;
  padding: 0 100px; // 전체 좌우 여백
  box-sizing: border-box;

  @media (max-width: 1024px) {
    justify-content: center;
    padding: 0 40px;
  }
`;

// --- 좌측 브랜드 영역 ---
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  max-width: 500px;
  height: 768px; // 카드와 높이 균형을 위해 설정 (선택사항)

  @media (max-width: 1024px) {
    display: none; // 화면이 작아지면 숨기거나 디자인 변경 필요
  }
`;

const LogoArea = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 120px; // 로고와 텍스트 사이 간격
  font-family: sans-serif;
  letter-spacing: 2px;

  // 로고 이미지를 쓴다면 img 태그로 대체 가능
  span {
    font-family: "Zen Kaku Gothic Antique", sans-serif;
  }
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

const SliderIndicators = styled.div`
  display: flex;
  gap: 8px;

  div {
    height: 4px;
    background-color: white;
    border-radius: 2px;
  }
  .active {
    width: 40px;
    opacity: 1;
  }
  .inactive {
    width: 20px;
    opacity: 0.5;
  }
`;

// --- 우측 흰색 로그인 카드 ---
const LoginCard = styled.div`
  width: 460px;
  height: 768px;
  background-color: white;
  border-radius: 20px; // 둥근 모서리
  padding: 80px 50px; // 내부 여백
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center; // 내부 요소 수직 중앙 정렬
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px; // 입력창 사이 간격
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
`;

const OptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  margin-top: -10px; // 간격 조절
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #555;
`;

const ForgotLink = styled.span`
  color: #555;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: #2f6364; // 청록색
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

// --- Component ---
const LogIn = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 로그인 로직
    try {
      const response = await api.post("/auth/login", {
        id,
        pwd,
        rememberMe,
      });

      if (response.status === 200) {
        alert("로그인 되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("로그인 실패");
    }
  };

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

  return (
    <Container>
      <ContentWrapper>
        {/* 왼쪽 섹션 */}
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

          {/* 하단 슬라이더 인디케이터 흉내 */}
          <SliderIndicators>
            <div className="active" />
            <div className="inactive" />
            <div className="inactive" />
          </SliderIndicators>
        </LeftSection>

        {/* 오른쪽 섹션 (흰색 카드) */}
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
                placeholder="Enter your email"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Password</Label>
              <InputWrapper>
                <StyledInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  required
                />
                <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                  {/* 아이콘 대신 텍스트 혹은 SVG 사용 가능 */}
                  {showPassword ? "👁️" : "👁️‍🗨️"}
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
              <ForgotLink>Forgot ID/Password?</ForgotLink>
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
