import React from "react";
import styled from "styled-components";
import Logo from "../../../img/Logo.w.PNG"; // 흰색 로고 (경로 확인 필요)

// 전체 컨테이너
const FooterContainer = styled.footer`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

// 1. 상단 (흰색 배경) 영역
const TopSection = styled.div`
  width: 100%;
  max-width: 1240px; /* 본문 너비와 맞춤 */
  padding: 60px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  gap: 40px;

  /* 모바일: 세로 배치 */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 60px;
    padding: 40px 20px;
  }
`;

// 왼쪽 설명 및 구독 그룹
const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ShortBriefText = styled.h3`
  color: #1e1e1e;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const DescriptionText = styled.p`
  color: #525252;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`;

const SubscribeGroup = styled.div`
  display: flex;
  margin-top: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const EmailInput = styled.input`
  height: 48px;
  padding: 0 15px;
  border: 1px solid #dfdfdf;
  border-right: none;
  background-color: white;
  color: #525252;
  font-size: 14px;
  width: 220px;
  outline: none;

  @media (max-width: 480px) {
    width: 100%;
    border-right: 1px solid #dfdfdf;
    box-sizing: border-box;
  }
`;

const SubscribeButton = styled.button`
  height: 50px;
  padding: 0 24px;
  background-color: #2f6364;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #244f50;
  }
`;

// 오른쪽 링크 그룹 (Grid 사용 추천)
const RightContent = styled.div`
  display: flex;
  gap: 80px;

  /* 모바일: 링크들이 너무 길어지지 않게 Grid로 배치 */
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr; /* 2열 배치 */
    gap: 40px 20px;
  }
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SectionTitle = styled.h4`
  color: #1e1e1e;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 0;
`;

const LinkItem = styled.a`
  color: #525252;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #2f6364;
    font-weight: 600;
  }
`;

// 2. 하단 (초록색 배경) 영역 - 물리적으로 분리
const BottomSection = styled.div`
  width: 100%;
  background-color: #2f6364;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

const BottomInner = styled.div`
  width: 100%;
  max-width: 1240px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LogoImage = styled.img`
  width: 110px;
  height: auto;
  object-fit: contain;
`;

const LineSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
`;

const CopyrightText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  text-align: center;
  margin: 0;
`;

// --- Component ---

export const Footer = () => {
  return (
    <FooterContainer>
      {/* 상단: 링크 및 구독 */}
      <TopSection>
        <LeftContent>
          <ShortBriefText>Short Brief About Us</ShortBriefText>
          <DescriptionText>
            Rather than simply providing a 'rental service' that provides
            products, we partner with lifestyle partners who 'enjoy' the value
            and environment that benefits from the products.
          </DescriptionText>
          <SubscribeGroup>
            <EmailInput placeholder="Enter your email" />
            <SubscribeButton>Subscribe Now</SubscribeButton>
          </SubscribeGroup>
        </LeftContent>

        <RightContent>
          <LinkGroup>
            <SectionTitle>Website Links</SectionTitle>
            <LinkItem>Home</LinkItem>
            <LinkItem>Product</LinkItem>
            <LinkItem>Subscribe</LinkItem>
            <LinkItem>FAQs</LinkItem>
          </LinkGroup>
          <LinkGroup>
            <SectionTitle>Services</SectionTitle>
            <LinkItem>Mobile</LinkItem>
            <LinkItem>QnA</LinkItem>
            <LinkItem>Terms of Use</LinkItem>
          </LinkGroup>
          <LinkGroup>
            <SectionTitle>Developers</SectionTitle>
            <LinkItem>Features</LinkItem>
            <LinkItem>Testimonials</LinkItem>
            <LinkItem>Referrals</LinkItem>
          </LinkGroup>
        </RightContent>
      </TopSection>

      {/* 하단: 초록색 배경 영역 */}
      <BottomSection>
        <BottomInner>
          <LogoImage alt="Logo" src={Logo} />
          <LineSeparator />
          <CopyrightText>© 2025. NURIM. All rights reserved.</CopyrightText>
        </BottomInner>
      </BottomSection>
    </FooterContainer>
  );
};

export default Footer;
