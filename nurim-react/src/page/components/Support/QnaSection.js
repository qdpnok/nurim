// components/Support/QnaSection.js
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1440px;
  height: 870px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 1240px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const SubText = styled.span`
  font-size: 14px;
  color: #888;
`;

const WriteButton = styled.button`
  padding: 10px 20px;
  background-color: #2f6364;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

const QnaList = styled.div`
  width: 1240px;
`;

const QnaItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 25px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const QnaStatus = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
`;

const QnaTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const QnaContent = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const QnaSection = () => {
  // 더미 데이터
  const qnaData = [
    {
      title: "배송 예정일보다 늦게 도착할 것 같은데 어떡하나요?",
      content: "주문하신 상품은 현재 배송 준비 중이며...",
      date: "2024.05.20",
      status: "답변완료",
    },
    {
      title: "카드 결제를 변경하고 싶습니다.",
      content: "마이페이지 > 결제 관리에서 변경 가능합니다...",
      date: "2024.05.19",
      status: "답변대기",
    },
    {
      title: "AS 신청은 어떻게 하나요?",
      content: "제품 뒷면 시리얼 넘버를 확인 후...",
      date: "2024.05.18",
      status: "답변완료",
    },
  ];

  return (
    <Container>
      <Header>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Title>QnA</Title>
          <SubText>사용자분들이 자주 묻는 질문들을 확인해 보세요.</SubText>
        </div>
        <WriteButton>질문 등록하기</WriteButton>
      </Header>

      <QnaList>
        {qnaData.map((item, index) => (
          <QnaItem key={index}>
            <QnaTitle>Q. {item.title}</QnaTitle>
            <QnaContent>{item.content}</QnaContent>
            <QnaStatus>
              <span>{item.date} | user***</span>
              <span
                style={{
                  color: item.status === "답변완료" ? "#2F6364" : "#aaa",
                  fontWeight: "bold",
                }}
              >
                {item.status}
              </span>
            </QnaStatus>
          </QnaItem>
        ))}
      </QnaList>
    </Container>
  );
};

export default QnaSection;
