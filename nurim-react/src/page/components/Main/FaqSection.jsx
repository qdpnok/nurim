import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { ChevronDown } from "lucide-react"; // Arrow 대신 더 일반적인 Chevron 사용

// 애니메이션 정의
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 100px 20px;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1280px; /* Align max-width with other sections */
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  color: #111;
  font-size: 35px; /* 제목 크기 키움 */
  line-height: 1.2;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e5e5e5; /* 상단 라인 추가 */
`;

const FaqItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e5e5e5;
  transition: background-color 0.2s ease;

  /* 아이템 전체에 호버 효과 */
  &:hover {
    background-color: #f9f9f9;
  }
`;

const FaqHeader = styled.div`
  display: flex;
  align-items: flex-start; /* 상단 정렬 유지 */
  justify-content: space-between;
  padding: 40px 0; /* 넉넉한 터치 영역 */
  cursor: pointer; /* 클릭 가능 표시 */
  gap: 20px;
`;

const Number = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  color: #111;
  font-size: 18px;
  width: 40px;
  flex-shrink: 0; /* 번호 영역 줄어들지 않게 */
  margin-top: 4px; /* 시각적 보정 */
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Question = styled.h3`
  margin: 0;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  color: #111;
  font-size: 20px;
  line-height: 1.4;
`;

const Answer = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  color: #666; /* 회색조로 본문 구분 */
  font-size: 16px;
  line-height: 1.6;
  margin-top: 10px;
  max-width: 90%; /* 너무 길어지지 않게 */

  /* 등장 애니메이션 */
  animation: ${fadeIn} 0.3s ease-out forwards;
`;

const ToggleButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f3f3f3; /* 연한 회색 배경 */
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  /* 버튼 호버 효과 */
  ${FaqItemWrapper}:hover & {
    background-color: #111;
    color: white;
  }
`;

// 아이콘 회전 스타일
const StyledChevron = styled(ChevronDown)`
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;

  /* 열렸을 때 180도 회전 */
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;
export const FaqSection = () => {
  // 수정 1: 배열([]) 대신 숫자(0) 하나만 저장. (처음에 0번이 열려있음)
  // 다 닫힌 상태로 시작하려면 useState(null) 로 설정하세요.
  const [openId, setOpenId] = useState(0);

  const faqData = [
    {
      id: 0,
      number: "01",
      question: "What types of furniture do you offer?",
      answer:
        "We offer a wide range of contemporary furniture including sofas, chairs, tables, beds, storage solutions, and outdoor furniture. Our collection is designed to suit modern aesthetics and functional needs.",
    },
    {
      id: 1,
      number: "02",
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary depending on the destination. Please check our shipping policy page for detailed information.",
    },
    {
      id: 2,
      number: "03",
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all unused items in their original packaging. Once we receive the returned item, we will process your refund within 5-7 business days.",
    },
    {
      id: 3,
      number: "04",
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and financing options through Affirm. All transactions are secure and encrypted.",
    },
  ];

  // 수정 2: 토글 로직 변경
  const toggleItem = (id) => {
    // 이미 열려있는 걸 누르면 닫기(null), 아니면 해당 번호 열기(id)
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Section>
      <ContentWrapper>
        <Header>
          <Title>We have got the answers to your questions</Title>
        </Header>

        <FaqList>
          {faqData.map((item) => {
            // 수정 3: 배열 includes 대신 단순 비교 (===)
            const isOpen = openId === item.id;

            return (
              <FaqItemWrapper key={item.id} onClick={() => toggleItem(item.id)}>
                <FaqHeader>
                  <Number>{item.number}</Number>

                  <TextContainer>
                    <Question>{item.question}</Question>
                    {isOpen && item.answer && <Answer>{item.answer}</Answer>}
                  </TextContainer>

                  <ToggleButton aria-label="Toggle answer">
                    <StyledChevron $isOpen={isOpen} />
                  </ToggleButton>
                </FaqHeader>
              </FaqItemWrapper>
            );
          })}
        </FaqList>
      </ContentWrapper>
    </Section>
  );
};
