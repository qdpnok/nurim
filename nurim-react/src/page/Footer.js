import React from "react";
import styled from "styled-components";
import Logo from "../img/Logo.w.PNG"; // 경로 확인 필요

// --- Styled Components 정의 ---

const FooterContainer = styled.div`
  background-color: #ffffff;
  min-height: 568px;
  min-width: 1440px;
  position: relative;
  width: 100%;
`;

const GreenRectangle = styled.div`
  background-color: #2f6364;
  height: 196px;
  left: 0;
  position: absolute;
  top: 372px;
  width: 1440px;
`;

// --- 공통 스타일 ---

// 모든 그룹의 공통 기본 스타일 (위치는 잡되, 내부는 Flex로 세로 정렬)
// 1. 모든 컬럼(Group)의 공통 스타일 (Flexbox + 왼쪽 정렬)
const GroupBase = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column; /* 세로로 쌓기 */
  align-items: flex-start; /* ★핵심: 모든 요소를 왼쪽 정렬 */
  gap: 24px; /* 링크들 사이의 간격 */
  top: calc(50% - 207px); /* 상단 위치 통일 */
`;

// 2. 제목 스타일 (아래쪽 여백 추가)
const SectionTitleBase = styled.div`
  color: #1e1e1e;
  font-family: "Inter-SemiBold", Helvetica, sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 10px; /* 제목과 첫번째 링크 사이를 조금 더 띄움 */
`;

// 3. 링크 아이템 공통 스타일 (높이/정렬 제거하고 글자 스타일만 유지)
const LinkItem = styled.div`
  color: #525252;
  font-family: "Inter-Regular", Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;

  &:hover {
    color: #2f6364;
    font-weight: 600;
  }
`;

// --- 그룹 1: Website Links ---
const Group1 = styled(GroupBase)`
  width: 155px;
  left: calc(50% + 30px);
`;

const SectionTitle = styled(SectionTitleBase)``;
const LinkHome = styled(LinkItem)``;
const LinkProduct = styled(LinkItem)``;
const LinkSubscribe = styled(LinkItem)``;
const LinkFAQs = styled(LinkItem)``;

// --- 그룹 2: Services ---
const Group2 = styled(GroupBase)`
  width: 153px;
  left: calc(50% + 262px);
`;

const SectionTitleCenter = styled(SectionTitleBase)``;
const LinkMobile = styled(LinkItem)``;
const LinkQnA = styled(LinkItem)``;
const LinkTerms = styled(LinkItem)``;

// --- 그룹 3: Developers ---
const Group3 = styled(GroupBase)`
  width: 153px;
  left: calc(50% + 478px);
`;

const DevelopersTitle = styled(SectionTitleBase)``;
const LinkFeatures = styled(LinkItem)``;
const LinkTestimonials = styled(LinkItem)``;
const LinkReferals = styled(LinkItem)``;

// --- 기타 요소들 (기존 유지) ---
const ShortBriefText = styled.div`
  color: #1e1e1e;
  font-family: "Inter-SemiBold", Helvetica, sans-serif;
  font-size: 20px;
  font-weight: 600;
  left: calc(50% - 636px);
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: calc(50% - 207px);
  width: 203px;
`;

const DescriptionText = styled.p`
  color: #525252;
  font-family: "Inter-Regular", Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  left: 84px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 133px;
  width: 510px;
  margin: 0;
`;

const BottomGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22.8px;
  height: 40px;
  left: 84px;
  position: absolute;
  top: 400px;
  width: 1274px;
`;

const LogoImage = styled.img`
  width: 130px;
  height: 50px;
  margin-bottom: 10px;
  margin-top: 30px;
`;

const LineSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-top: 20px;
`;

const CopyrightText = styled.p`
  color: #ffffff;
  font-family: "Inter-Regular", Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  margin-left: 0;
  text-align: center;
  margin-top: 20px;
  opacity: 0.8;
`;

const SubscribeGroup = styled.div`
  display: flex;
  gap: 2px;
  height: 49px;
  left: 84px;
  position: absolute;
  top: 251px;
  width: 328px;
`;

const EmailFrame = styled.div`
  align-items: center;
  border: 1px solid #dfdfdf;
  display: inline-flex;
  gap: 10px;
  height: 49px;
  justify-content: center;
  padding: 16px 70px 16px 16px;
  position: relative;
  width: 193px;
  background-color: white;
`;

const EmailText = styled.div`
  align-items: center;
  color: #525252;
  display: flex;
  font-family: "Inter-Regular", Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  justify-content: center;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  width: fit-content;
`;

const SubscribeButton = styled.div`
  align-items: center;
  background-color: #2f6364;
  display: inline-flex;
  gap: 10px;
  height: 49px;
  justify-content: center;
  padding: 16px;
  position: relative;
  width: 133px;
  cursor: pointer;
`;

const SubscribeBtnText = styled.div`
  align-items: center;
  color: #ffffff;
  display: flex;
  font-family: "Inter-Regular", Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  justify-content: center;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  width: fit-content;
`;

// --- React Component ---

export const Footer = () => {
  return (
    <FooterContainer>
      <GreenRectangle />

      <Group1>
        <SectionTitle>Website Links</SectionTitle>
        <LinkHome>Home</LinkHome>
        <LinkProduct>Product</LinkProduct>
        <LinkSubscribe>Subscribe</LinkSubscribe>
        <LinkFAQs>FAQs</LinkFAQs>
      </Group1>

      <ShortBriefText>Short Brief About Us</ShortBriefText>

      <Group2>
        <SectionTitleCenter>Services</SectionTitleCenter>
        <LinkMobile>Mobile</LinkMobile>
        <LinkQnA>QnA</LinkQnA>
        <LinkTerms>Terms of Use</LinkTerms>
      </Group2>

      <Group3>
        <DevelopersTitle>Developers</DevelopersTitle>
        <LinkFeatures>Features</LinkFeatures>
        <LinkTestimonials>Testimonials</LinkTestimonials>
        <LinkReferals>Referrals</LinkReferals>
      </Group3>

      <BottomGroup>
        <LogoImage alt="Logo" src={Logo} />
        <LineSeparator>
          <CopyrightText>2025. NURIM. All rights reserved</CopyrightText>
        </LineSeparator>
      </BottomGroup>

      <DescriptionText>
        Rather than simply providing a 'rental service' that provides products,
        we partner with lifestyle partners who 'enjoy' the value and environment
        that benefits from the products, rather than customers.
      </DescriptionText>

      <SubscribeGroup>
        <EmailFrame>
          <EmailText>Enter your email</EmailText>
        </EmailFrame>

        <SubscribeButton>
          <SubscribeBtnText>Subscribe Now</SubscribeBtnText>
        </SubscribeButton>
      </SubscribeGroup>
    </FooterContainer>
  );
};

export default Footer;
