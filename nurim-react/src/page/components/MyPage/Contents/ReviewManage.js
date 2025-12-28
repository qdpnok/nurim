import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 30px; /* [통일] 다른 페이지와 동일한 여백 */
`;

const TitleHeader = styled.div`
  text-align: center;
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

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #666;
  font-size: 15px;
  border: 1px dashed #ddd; /* 내용 들어갈 영역 표시용 (선택사항) */
  border-radius: 8px;
`;

const ReviewManage = () => {
  return (
    <Container>
      {/* 1. 상단 경로 추가 */}
      <Breadcrumb>Home &gt; My Page</Breadcrumb>

      {/* 2. 타이틀 및 구분선 (중앙 정렬) */}
      <TitleHeader>
        <Title>제품 관리</Title>
        <Divider />
      </TitleHeader>

      {/* 3. 컨텐츠 영역 */}
      <ContentArea>내가 작성한 리뷰 및 작성 가능한 리뷰 목록</ContentArea>
    </Container>
  );
};

export default ReviewManage;
