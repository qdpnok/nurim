import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1074px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  border-bottom: 2px solid #333;
  padding-bottom: 15px;
`;

const ContentBox = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #888;
`;

const SubscriptionManage = () => {
  return (
    <Container>
      <Title>구독 관리</Title>
      <ContentBox>구독 중인 상품 내역이 여기에 표시됩니다.</ContentBox>
    </Container>
  );
};

export default SubscriptionManage;
