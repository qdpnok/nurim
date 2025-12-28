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

const ReviewManage = () => {
  return (
    <Container>
      <Title>제품/리뷰 관리</Title>
      <div>내가 작성한 리뷰 및 작성 가능한 리뷰 목록</div>
    </Container>
  );
};

export default ReviewManage;
