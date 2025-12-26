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
      { q: "[구독] test제목 1", a: "[구독] test내용 1입니다." },
      { q: "[구독] test제목 2", a: "[구독] test내용 2입니다." },
      { q: "[구독] test제목 3", a: "[구독] test내용 3입니다." },
    ],
    "배송 및 설치": [
      { q: "[배송] test제목 1", a: "[배송] test내용 1입니다." },
      { q: "[배송] test제목 2", a: "[배송] test내용 2입니다." },
    ],
    "AS 및 관리": [
      { q: "[AS] test제목 1", a: "[AS] test내용 1입니다." },
      { q: "[AS] test제목 2", a: "[AS] test내용 2입니다." },
      { q: "[AS] test제목 3", a: "[AS] test내용 3입니다." },
    ],
    "취소 및 반납": [
      { q: "[반납] test제목 1", a: "[반납] test내용 1입니다." },
      { q: "[반납] test제목 2", a: "[반납] test내용 2입니다." },
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
