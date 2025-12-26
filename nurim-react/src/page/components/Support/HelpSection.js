// components/Support/HelpSection.js
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1440px;
  height: 880px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #333;
`;

const GridBox = styled.div`
  width: 1240px;
  height: 715px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 */
  grid-template-rows: repeat(2, 1fr); /* 2행 */
  gap: 20px;
`;

const Card = styled.div`
  background-color: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #000;
`;

const CardContent = styled.ul`
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  list-style: none;
  padding: 0;

  li {
    cursor: pointer;
    &:hover {
      color: #2f6364;
      text-decoration: underline;
    }
  }
`;

const HelpSection = () => {
  // 예시 데이터
  const helpData = [
    {
      title: "회원정보 관리 (Account)",
      items: [
        "회원가입/로그인",
        "아이디/비밀번호 찾기",
        "회원정보 수정",
        "회원탈퇴",
      ],
    },
    {
      title: "결제 및 환불 (Billing)",
      items: ["결제 수단 변경", "영수증 발급", "환불 규정", "미납 요금 결제"],
    },
    {
      title: "배송 및 설치 (Logistics)",
      items: [
        "배송 조회",
        "설치 일정 변경",
        "배송 지연 문의",
        "설치 환경 확인",
      ],
    },
    {
      title: "제품 이용 가이드 (Guide)",
      items: [
        "제품 사용 설명서",
        "초기 설정 방법",
        "기능 활용 팁",
        "문제 해결",
      ],
    },
    {
      title: "계정 및 멤버십 (Membership)",
      items: [
        "멤버십 등급 안내",
        "포인트 적립/사용",
        "쿠폰함",
        "친구 초대 이벤트",
      ],
    },
    {
      title: "정책 및 보안 (Security)",
      items: ["이용약관", "개인정보 처리방침", "보안 센터", "신고하기"],
    },
  ];

  return (
    <Container>
      <Title>누림 도움말</Title>
      <GridBox>
        {helpData.map((data, idx) => (
          <Card key={idx}>
            <CardTitle>{data.title}</CardTitle>
            <CardContent>
              {data.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </CardContent>
          </Card>
        ))}
      </GridBox>
    </Container>
  );
};

export default HelpSection;
