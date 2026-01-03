import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/Axios"; // Axios 인스턴스 import

// ... (스타일 정의 코드는 그대로 유지) ...
const MainContainer = styled.div`
  width: 100%;
`;
const Breadcrumb = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 30px;
`;
const TitleWrapper = styled.div`
  margin-top: 0;
  margin-bottom: 10px;
`;
const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
  line-height: 1.5;
`;
const Greeting = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 40px;
  span {
    font-weight: bold;
  }
`;
const SectionCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  background-color: #fff;
`;
const MemberInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  color: #333;
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
  background-color: #356469;
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
  const navigate = useNavigate();

  // [수정 1] memberNum 가져오기
  const memberNum = localStorage.getItem("memberNum");

  const [userName, setUserName] = useState("");
  const [stats, setStats] = useState({
    subscriptionCount: 0,
    orderCount: 0,
    reviewCount: 0,
  });

  // [수정 2] API 호출하여 데이터 가져오기
  useEffect(() => {
    const fetchMyPageData = async () => {
      if (!memberNum) {
        // 로그인 정보가 없으면 처리 (예: 로그인 페이지로 이동)
        return;
      }

      try {
        // 백엔드 컨트롤러: @GetMapping("/{memberNum}") -> /api/mypage/{memberNum}
        const response = await api.get(`/mypage/${memberNum}`);

        // 데이터 설정 (백엔드 MyPageResDto 필드명에 따라 다를 수 있음)
        // 예: response.data = { name: "홍길동", subscriptionCount: 2, ... }
        if (response.data) {
          setUserName(response.data.name);
          setStats({
            subscriptionCount: response.data.subscriptionCount || 0,
            orderCount: response.data.orderCount || 0,
            reviewCount: response.data.reviewCount || 0,
          });
        }
      } catch (error) {
        console.error("마이페이지 정보 로드 실패:", error);
      }
    };

    fetchMyPageData();
  }, [memberNum]);

  return (
    <MainContainer>
      <Breadcrumb>Home &gt; My Page</Breadcrumb>

      <TitleWrapper>
        <PageTitle>마이페이지</PageTitle>
      </TitleWrapper>

      {/* [수정 3] userName 상태값 출력 */}
      <Greeting>
        <span>{userName ? `${userName}님` : "회원님"} 안녕하세요.</span> 누림과
        함께 스마트한 가전 생활을 즐겨보세요!
      </Greeting>

      <SectionCard>
        <MemberInfoHeader onClick={() => navigate("info")}>
          회원 정보 &gt;
        </MemberInfoHeader>
        <StatsGrid>
          <StatBox>
            {/* [추가] 받아온 stats 데이터 연결 */}
            구독 관리{" "}
            <span className="count">{stats.subscriptionCount} 개</span>
          </StatBox>
          <StatBox>
            구매 제품 <span className="count">{stats.orderCount} 개</span>
          </StatBox>
          <StatBox>
            리뷰 관리 <span className="count">{stats.reviewCount} 개</span>
          </StatBox>
        </StatsGrid>
      </SectionCard>

      <SectionCard>
        <BannerTitle>가전의 새로운 기준, 누림(NURIM)</BannerTitle>
        <BannerText>
          누림은 복잡한 가전 선택의 고민을 해결하고, 구독과 구매 사이의 가장
          합리적인 대안을 제시합니다.
        </BannerText>
      </SectionCard>

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
