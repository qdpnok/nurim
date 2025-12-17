import React from "react";
import styled from "styled-components";
import Logo from "../img/Logo.w.PNG"; // 이미지 경로 확인

// --- 레이아웃 컨테이너 ---

const FooterContainer = styled.div`
  background-color: #ffffff;
  min-height: 568px;
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

// 내용물 고정 너비 (1440px) - 모든 요소의 기준점
const FooterInner = styled.div`
  width: 1440px;
  height: 568px;
  position: relative; /* 자식들의 absolute 기준 */
  border-top: 1px solid gray;
`;

// 초록색 배경 (이제 1440px 안에 갇힘)
const GreenRectangle = styled.div`
  background-color: #2f6364;
  height: 196px;
  width: 100%; /* 부모(FooterInner)가 1440px이므로 이것도 1440px이 됨 */
  position: absolute;
  top: 372px;
  left: 0;
  z-index: 0; /* 글자보다 뒤에 */
  border-radius: 0 0 8px 8px; /* (선택사항) 맨 아래 모서리 둥글게 하려면 추가 */
`;

// --- 내부 요소 스타일 ---

// 그룹 공통 스타일 (Flexbox)
const GroupBase = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  top: calc(50% - 207px);
  z-index: 1; /* 배경보다 앞에 */
`;

const SectionTitleBase = styled.div`
  color: #1e1e1e;
  font-family: "Inter-SemiBold", Helvetica, sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const LinkItem = styled.div`
  color: #525252;
  font-family: "Inter-Regular", Helvetica, sans-serif;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: #2f6364;
    font-weight: 600;
  }
`;

// 그룹 위치
const Group1 = styled(GroupBase)`
  width: 155px;
  left: calc(50% + 30px);
`;
const Group2 = styled(GroupBase)`
  width: 153px;
  left: calc(50% + 262px);
`;
const Group3 = styled(GroupBase)`
  width: 153px;
  left: calc(50% + 478px);
`;

const SectionTitle = styled(SectionTitleBase)``;
const SectionTitleCenter = styled(SectionTitleBase)``;
const DevelopersTitle = styled(SectionTitleBase)``;

// 링크들
const LinkHome = styled(LinkItem)``;
const LinkProduct = styled(LinkItem)``;
const LinkSubscribe = styled(LinkItem)``;
const LinkFAQs = styled(LinkItem)``;
const LinkMobile = styled(LinkItem)``;
const LinkQnA = styled(LinkItem)``;
const LinkTerms = styled(LinkItem)``;
const LinkFeatures = styled(LinkItem)``;
const LinkTestimonials = styled(LinkItem)``;
const LinkReferals = styled(LinkItem)``;

// 설명 텍스트
const ShortBriefText = styled.div`
  color: #1e1e1e;
  font-family: "Inter-SemiBold", Helvetica, sans-serif;
  font-size: 20px;
  font-weight: 600;
  position: absolute;
  left: 84px;
  top: calc(50% - 207px);
  width: 203px;
  z-index: 1;
`;

const DescriptionText = styled.p`
  color: #525252;
  font-family: "Inter-Regular", Helvetica, sans-serif;
  font-size: 14px;
  position: absolute;
  left: 84px;
  top: 133px;
  width: 510px;
  margin: 0;
  line-height: 1.5;
  z-index: 1;
`;

// 하단 로고 & 저작권
const BottomGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22.8px;
  position: absolute;
  left: 84px;
  top: 400px;
  width: 1274px;
  z-index: 1;
`;

const LogoImage = styled.img`
  width: 130px;
  height: 24px;
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
  width: 100%;
  text-align: center;
  margin-top: 20px;
  opacity: 0.8;
`;

// 구독 버튼 그룹
const SubscribeGroup = styled.div`
  display: flex;
  gap: 2px;
  height: 49px;
  position: absolute;
  left: 84px;
  top: 251px;
  width: 328px;
  z-index: 1;
`;

const EmailFrame = styled.div`
  align-items: center;
  border: 1px solid #dfdfdf;
  display: inline-flex;
  gap: 10px;
  height: 49px;
  justify-content: center;
  width: 193px;
  background-color: white;
`;

const EmailText = styled.div`
  color: #525252;
  font-size: 14px;
`;

const SubscribeButton = styled.div`
  align-items: center;
  background-color: #2f6364;
  display: inline-flex;
  gap: 10px;
  height: 49px;
  justify-content: center;
  width: 133px;
  cursor: pointer;
`;

const SubscribeBtnText = styled.div`
  color: #ffffff;
  font-size: 14px;
`;

// --- React Component ---

export const Footer = () => {
  return (
    <FooterContainer>
      {/* FooterInner: 1440px 중앙 정렬 컨테이너 */}
      <FooterInner>
        {/* 초록색 배경을 이 안으로 이동 -> 이제 너비가 1440px로 제한됨 */}
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
          Rather than simply providing a 'rental service' that provides
          products, we partner with lifestyle partners who 'enjoy' the value and
          environment that benefits from the products, rather than customers.
        </DescriptionText>

        <SubscribeGroup>
          <EmailFrame>
            <EmailText>Enter your email</EmailText>
          </EmailFrame>

          <SubscribeButton>
            <SubscribeBtnText>Subscribe Now</SubscribeBtnText>
          </SubscribeButton>
        </SubscribeGroup>
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;
