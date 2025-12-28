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

const ShoppingManage = () => {
  return (
    <Container>
      <Title>쇼핑 관리</Title>
      <div>장바구니 / 찜한 상품 목록</div>
    </Container>
  );
};

export default ShoppingManage;
