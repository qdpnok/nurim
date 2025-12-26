// components/Support/InquirySection.js
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1240px;
  height: 473px;
  background-color: #f9f9f9; /* 회색 박스 배경 */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const SubText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 40px;
`;

const IconPlaceholder = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ddd;
  border-radius: 50%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`;

const InfoBox = styled.div`
  background-color: white;
  padding: 30px 60px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const ContactTime = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: bold;
`;

const ContactDesc = styled.div`
  font-size: 14px;
  color: #888;
  line-height: 1.5;
`;

const InquiryButton = styled.button`
  width: 200px;
  height: 48px;
  background-color: #2f6364;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #244b4c;
  }
`;

const InquirySection = () => {
  return (
    <Container>
      <Title>도움이 필요하신가요?</Title>
      <SubText>해결되지 않은 궁금증이 있다면 언제든 문의해주세요.</SubText>

      <InfoBox>
        <IconPlaceholder>🎧</IconPlaceholder>
        <ContactTime>고객센터 1544-0000</ContactTime>
        <ContactDesc>
          운영시간: 평일 09:00 ~ 18:00 (주말/공휴일 휴무)
          <br />
          점심시간: 12:00 ~ 13:00
        </ContactDesc>
        <InquiryButton>1:1 문의하기</InquiryButton>
      </InfoBox>
    </Container>
  );
};

export default InquirySection;
