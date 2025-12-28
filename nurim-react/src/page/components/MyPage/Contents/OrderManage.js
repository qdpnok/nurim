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

const OrderList = styled.div`
  /* 구매 목록 스타일 */
`;

const OrderManage = () => {
  return (
    <Container>
      <Title>구매 관리</Title>
      <OrderList>
        <p>구매한 내역이 없습니다.</p>
        {/* 추후 구매 내역 리스트 컴포넌트 추가 */}
      </OrderList>
    </Container>
  );
};

export default OrderManage;
