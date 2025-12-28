import React, { useState } from "react"; // [수정] useState 추가
import styled from "styled-components";
import TermsModal from "../../Modal/TermsModal"; // [추가] 모달 임포트
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 30px;
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
  margin-top: 0;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
`;

const ContentCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 30px;
  background-color: #fff;
`;

const CardHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const GridContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ItemBox = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  span.count {
    font-weight: bold;
    color: #000;
    font-size: 16px;
  }

  span.arrow {
    font-size: 16px;
    color: #888;
  }
`;

const ReviewManage = () => {
  // [추가] 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Breadcrumb>Home &gt; My Page</Breadcrumb>
        <TitleHeader>
          <Title>제품 관리</Title>
          <Divider />
        </TitleHeader>
        <ContentCard>
          <CardHeader>제품 관리 &gt;</CardHeader>
          <GridContainer>
            {/* 인수 신청 클릭 -> /mypage/acquisition 이동 */}
            <ItemBox onClick={() => navigate("/mypage/acquisition")}>
              인수 신청 <span className="count">0 개</span>
            </ItemBox>

            {/* 반납 신청 클릭 -> /mypage/return 이동 */}
            <ItemBox onClick={() => navigate("/mypage/return")}>
              반납 신청 <span className="count">0 개</span>
            </ItemBox>

            {/* 약관 확인 클릭 -> 모달 */}
            <ItemBox onClick={() => setIsModalOpen(true)}>
              약관 확인 <span className="arrow">&gt;</span>
            </ItemBox>
          </GridContainer>
        </ContentCard>
      </Container>

      {/* [추가] 모달 렌더링 */}
      {isModalOpen && <TermsModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ReviewManage;
