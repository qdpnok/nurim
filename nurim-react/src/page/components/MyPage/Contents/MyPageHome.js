import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 1074px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Greeting = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  span {
    font-weight: bold;
  }
`;

// --- 공통 카드 스타일 ---
const SectionCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  background-color: #fff;
`;

// 1. 회원 정보 섹션
const MemberInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

const StatsGrid = styled.div`
  display: flex;
  gap: 20px;
`;

const StatBox = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #555;

  span.count {
    font-weight: bold;
    color: #000;
    font-size: 16px;
  }
`;

// 2. 배너 섹션 (누림)
const BannerTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BannerText = styled.p`
  font-size: 13px;
  color: #666;
  line-height: 1.5;
`;

// 3. 소식 받기 섹션
const NewsletterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 15px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const EmailInput = styled.input`
  width: 300px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f5f5;
  outline: none;
`;

const ActionButton = styled.button`
  background-color: #356469; /* 포인트 컬러 */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #2a5054;
  }
`;

// 4. 고객 지원 섹션
const SupportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-size: 18px;
    font-weight: bold;
  }
`;

const SupportContent = styled.div`
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SupportLeft = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const SupportButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const WhiteButton = styled.button`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 12px 40px;
  border-radius: 8px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    border-color: #356469;
    color: #356469;
  }
`;

const MyPageHome = () => {
  return (
    <MainContainer>
      <PageTitle>마이페이지</PageTitle>
      <Greeting>
        <span>정동균님 안녕하세요.</span> 누림과 함께 스마트한 가전 생활을
        즐겨보세요!
      </Greeting>

      {/* 1. 회원 정보 */}
      <SectionCard>
        <MemberInfoHeader>회원 정보 &gt;</MemberInfoHeader>
        <StatsGrid>
          <StatBox>
            구독 관리 <span className="count">0 개</span>
          </StatBox>
          <StatBox>
            구매 제품 <span className="count">0 개</span>
          </StatBox>
          <StatBox>
            리뷰 관리 <span className="count">0 개</span>
          </StatBox>
        </StatsGrid>
      </SectionCard>

      {/* 2. 누림 배너 */}
      <SectionCard>
        <BannerTitle>가전의 새로운 기준, 누림(NURIM)</BannerTitle>
        <BannerText>
          누림은 복잡한 가전 선택의 고민을 해결하고, 구독과 구매 사이의 가장
          합리적인 대안을 제시합니다.
          <br />
          구독 비교하기와 전문적인 사후 관리를 통해 당신의 일상을 더 풍요롭게
          누려보세요.
        </BannerText>
      </SectionCard>

      {/* 3. 소식 받기 */}
      <SectionCard>
        <NewsletterWrapper>
          <BannerTitle>새로운 혜택 소식 받기</BannerTitle>
          <BannerText>
            누림의 신규 가전 라인업과 구독 할인 이벤트 소식을 가장 먼저
            확인하세요.
          </BannerText>
          <InputGroup>
            <EmailInput placeholder="이메일 주소를 입력해 주세요" />
            <ActionButton>구독하기</ActionButton>
          </InputGroup>
        </NewsletterWrapper>
      </SectionCard>

      {/* 4. 고객 지원 */}
      <SupportHeader>
        <h3>고객 지원</h3>
        <ActionButton>고객 지원 센터 바로가기</ActionButton>
      </SupportHeader>

      <SupportContent>
        <SupportLeft>제품에 대한 지원이 필요하신가요?</SupportLeft>
        <SupportButtons>
          <WhiteButton>문제 해결 Q&A</WhiteButton>
          <WhiteButton>고객 지원 상담</WhiteButton>
        </SupportButtons>
      </SupportContent>
    </MainContainer>
  );
};

export default MyPageHome;
