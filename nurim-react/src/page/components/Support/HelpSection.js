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
  font-weight: normal;
  margin-bottom: 14.5px;
  color: #101828;
`;

const SubText = styled.p`
  font-size: 16px;
  color: #4a5565;
  margin-bottom: 45px;
`;

const GridBox = styled.div`
  width: 1240px;
  height: 715px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 */
  grid-template-rows: repeat(2, 1fr); /* 2행 */
  gap: 30px;
`;

const Card = styled.div`
  background-color: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 23px 21px;
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
  font-weight: normal;
  margin-bottom: 20px;
  color: #000;
`;

const CardSubText = styled.p`
  width: 270px;
  font-size: 14px;
  font-weight: normal;
  white-space: pre-line;
  color: #4a5565;
  margin-bottom: 35px;
`;

const CardLabel = styled.p`
  font-size: 12px;
  color: #364153;
  margin-bottom: 13px;
`;

const CardContent = styled.ul`
  font-size: 12px;
  color: #2f6364;
  line-height: 2.6;
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
      title: "계정 및 인증 (Account & Auth)",
      sub: "회원가입, 로그인 문제 해결 및 개인 프로필 설정을 관리할 수 있습니다.",
      items: [
        "회원가입은 어떻게 하나요?",
        "비밀번호를 잊어버렸어요.",
        "프로필 정보는 어떻게 수정하나요?",
      ],
    },
    {
      title: "구독 및 구매 서비스 (Service Guide)",
      sub: "누림의 핵심인 구독 모델과 일반 구매 서비스 이용 방법을 안내합니다.",
      items: [
        "결제 구독과 구매의 차이는 무엇인가요?",
        "구독 중인 제품을 인수한 후 소유할 수 있나요?",
        "월 구독료 결제 방식이 궁금해요.",
      ],
    },
    {
      title: "배송 및 설치 (Logistics)",
      sub: "주문하신 제품의 배송 일정 확인 및 기사님 방문설치 프로세스를 확인하세요.",
      items: [
        "배송지 변경은 어떻게 하나요?",
        "전문 기사님 설치는 반드시 필요한가요?",
        "실시간 배송 상태는 어디서 조회하나요?",
      ],
    },
    {
      title: "사후 관리 및 AS (Care & AS)",
      sub: "제품 고장 시 수리 접수 방법 및 이전 설치 등 사후 관리 서비스를 지원합니다.",
      items: [
        "사용 중 고장이 났을 때 AS 신청 방법은?",
        "이전 설치 시 발생하는 비용이 궁금해요.",
        "무상 AS 보증 범위는 어디까지인가요?",
      ],
    },
    {
      title: "게시물 및 커뮤니티 (Reviews & QnA)",
      sub: "리뷰 작성 가이드 및 1:1 문의를 통한 맞춤 상담 이용 방법을 확인하실 수 있습니다.",
      items: [
        "리뷰 작성 시 유의사항이나 제한 사항이 있나요?",
        "비공개 문의글은 어떻게 작성하나요?",
        "작성한 리뷰가 보이지 않는 이유는 무엇인가요?",
      ],
    },
    {
      title: "결제 및 환불 (Billing & Refund)",
      sub: "결제 수단 관리, 구독 중도 해지에 따른 위약금 및 환불 규정을 안내합니다.",
      items: [
        "등록된 결제 카드는 어떻게 변경하나요?",
        "중도 해지 시 발생하는 위약금 산정 기준은?",
        "결제 영수증이나 전표 발행이 가능한가요?",
      ],
    },
  ];

  return (
    <Container>
      <Title>누림 도움말</Title>
      <SubText>카테고리별로 정리 된 답변을 찾아보세요.</SubText>
      <GridBox>
        {helpData.map((data, idx) => (
          <Card key={idx}>
            <CardTitle>{data.title}</CardTitle>
            <CardSubText>{data.sub}</CardSubText>
            <CardLabel>Top Questions:</CardLabel>
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
