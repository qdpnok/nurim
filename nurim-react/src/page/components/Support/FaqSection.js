// components/Support/FaqSection.js
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1440px;
  height: 743px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
  width: 1240px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 15px 0;
  border-radius: 30px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? "#2F6364" : "#F2F2F2")};
  color: ${(props) => (props.$active ? "white" : "#666")};
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

const FaqList = styled.div`
  width: 1240px;
  border-top: 1px solid #333;
`;

const FaqItem = styled.div`
  border-bottom: 1px solid #eee;
`;

const Question = styled.div`
  padding: 25px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: white;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const QNumber = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-right: 20px;
  width: 30px;
`;

const QText = styled.span`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const Arrow = styled.span`
  font-size: 14px;
  color: #888;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s;
`;

const Answer = styled.div`
  padding: 20px 40px;
  background-color: #f8f8f8;
  color: #555;
  font-size: 14px;
  line-height: 1.6;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const FaqSection = () => {
  // 초기값을 탭 배열의 첫 번째 값과 일치시켰습니다.
  const [activeTab, setActiveTab] = useState("서비스 및 구독/구매");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const tabs = [
    "서비스 및 구독/구매",
    "배송 및 설치",
    "AS 및 관리",
    "취소 및 반납",
  ];

  // 탭 별 데이터 정의 (객체 형태)
  const allFaqData = {
    "서비스 및 구독/구매": [
      {
        q: "구독 서비스와 일반 구매의 차이점은 무엇인가요?",
        a: "일반 구매는 제품가를 일시불로 지출하여 소유하는 방식이며, 구독은 초기 비용 부담 없이 월 이용료를 내며 제품을 경험하는 방식입니다. 누림의 '비교 계산기'를 통해 두 방식의 경제적 차이를 실시간으로 비교해 보실 수 있습니다.",
      },
      {
        q: "구독 기간이 끝나면 제품은 어떻게 되나요?",
        a: "구독 기간 만료 시 제품을 반납하거나, 일정 금액을 지불하고 본인 소유로 인수할 수 있는 옵션을 제공합니다. 구체적인 조건은 상품별 계약서에 명시되어 있습니다.",
      },
      {
        q: "구독 서비스와 일반 구매의 차이점은 무엇인가요?",
        a: "네, 가능합니다. 구독 이용 현황 페이지에서 '인수 신청'을 통해 남은 잔여 비용을 정산하고 제품을 완전히 소유하실 수 있습니다.",
      },
    ],
    "배송 및 설치": [
      {
        q: "배송비와 설치비는 따로 발생하나요?",
        a: "누림의 모든 제품은 전문 기사 설치를 기본으로 하며, 기본 설치 비용은 서비스 금액에 포함되어 있습니다. 다만, 특수 환경에 따른 사다리차 이용 등은 추가 비용이 발생할 수 있습니다.",
      },
      {
        q: "신청 후 배송까지 얼마나 걸리나요?",
        a: "주문 및 결제가 완료되면 즉시 물류 시스템과 연동되어 배송 준비가 시작됩니다. 일반적으로 수도권은 3일 이내, 지방은 5~7일 이내에 전문 기사가 방문하여 설치해 드립니다.",
      },
    ],
    "AS 및 관리": [
      {
        q: "사용 중 고장이 나면 어떻게 처리하나요?",
        a: "구독 기간 내 발생하는 제품 자체의 결함에 대해서는 무상 AS를 지원합니다. 고객센터의 1:1 문의를 통해 접수해 주시면 빠르게 처리해 드립니다.",
      },
      {
        q: "이사를 갈 때 이전 설치 서비스도 제공하나요?",
        a: "네, 구독 중인 고객님을 위해 유상 이전 설치 서비스를 지원하고 있습니다. 배송 정보 조회 메뉴에서 이전 설치 신청을 예약하실 수 있습니다.",
      },
    ],
    "취소 및 반납": [
      {
        q: "구독 중도 해지가 가능한가요?",
        a: "네, 언제든 구독 해지 신청이 가능합니다. 다만, 계약된 의무 사용 기간 내 해지 시에는 규정에 따른 위약금이 발생할 수 있으니 유의해 주시기 바랍니다.",
      },
      {
        q: "반납 신청은 어떻게 하나요?",
        a: "마이페이지의 '내 구독' 메뉴에서 반납 신청 버튼을 클릭하시면 전문 물류팀이 약속된 시간에 방문하여 제품을 회수합니다.",
      },
    ],
  };

  // 현재 선택된 탭에 해당하는 데이터 가져오기
  const currentFaqList = allFaqData[activeTab] || [];

  return (
    <Container>
      <Title>누림(NURIM) 서비스 자주 묻는 질문 (FAQ)</Title>

      <TabContainer>
        {tabs.map((tab) => (
          <TabButton
            key={tab}
            $active={activeTab === tab}
            onClick={() => {
              setActiveTab(tab);
              setOpenIndex(null); // 탭 변경 시 열린 아코디언 닫기
            }}
          >
            {tab}
          </TabButton>
        ))}
      </TabContainer>

      <FaqList>
        {currentFaqList.map((item, index) => (
          <FaqItem key={index}>
            <Question onClick={() => toggleFaq(index)}>
              <QNumber>{String(index + 1).padStart(2, "0")}</QNumber>
              <QText>{item.q}</QText>
              <Arrow $isOpen={openIndex === index}>▼</Arrow>
            </Question>
            <Answer $isOpen={openIndex === index}>{item.a}</Answer>
          </FaqItem>
        ))}
      </FaqList>
    </Container>
  );
};

export default FaqSection;
