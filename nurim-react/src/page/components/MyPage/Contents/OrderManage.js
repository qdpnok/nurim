import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 30px; /* [통일] 홈 화면과 동일한 여백 */
`;

const TitleHeader = styled.div`
  text-align: center;
  /* 상단 마진 제거하여 Breadcrumb 바로 아래 위치하게 함 (홈 화면과 높이 일치) */
  margin-top: 0;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #666;
  font-size: 15px;
  gap: 20px;
`;

const ActionButton = styled.button`
  background-color: #356469;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #2a5054;
  }
`;

const OrderManage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Breadcrumb>Home &gt; My Page</Breadcrumb>

      <TitleHeader>
        <Title>구매한 제품</Title>
        <Divider />
      </TitleHeader>

      <EmptyState>
        <p>구매한 제품이 없습니다.</p>
        <ActionButton onClick={() => navigate("/purchase")}>
          제품 구매하기
        </ActionButton>
      </EmptyState>
    </Container>
  );
};

export default OrderManage;
