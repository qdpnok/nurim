import React from "react";
import styled from "styled-components";

// --- 스타일 컴포넌트 정의 ---

// 1. 페이지네이션 전체 컨테이너 (w1200 h69)
const PaginationContainer = styled.div`
  width: 1200px;
  height: 69px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 양 끝에 버튼 배치 */
  margin: 40px auto; /* 위아래 여백 */
`;

// 2. Previous / Next 버튼 (w130 h40)
const NavButton = styled.button`
  width: 130px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* 텍스트와 화살표 사이 간격 */

  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px; /* 둥근 모서리 */

  font-size: 14px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
    border-color: #333;
  }
`;

// 3. 페이지 번호들을 감싸는 그룹 (가운데 정렬용)
const PageNumberGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 숫자 박스 사이 간격 */
`;

// 4. 개별 페이지 번호 박스 (w40 h40)
const PageNumber = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;
  font-size: 14px;
  color: ${(props) =>
    props.$active ? "#333" : "#888"}; /* 활성 상태면 진한 색 */
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  background-color: ${(props) =>
    props.$active ? "#eeeeee" : "transparent"}; /* 활성 상태면 회색 배경 */

  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$active ? "#eeeeee" : "#f5f5f5")};
  }
`;

// --- 화살표 아이콘 (SVG) ---
const ArrowLeft = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// --- 컴포넌트 ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // 페이지 번호 목록 생성
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  console.log(pageNumbers);

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  // 이전 페이지로 이동
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationContainer>
      {/* Previous 버튼 */}
      <NavButton onClick={handlePrevious} disabled={currentPage === 1}>
        <ArrowLeft>&lt;</ArrowLeft>
        Previous
      </NavButton>

      <PageNumberGroup>
        {pageNumbers.map((page) => (
          <PageNumber
            key={page}
            $active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PageNumber>
        ))}
      </PageNumberGroup>

      {/* Next 버튼 */}
      <NavButton onClick={handleNext} disabled={currentPage === totalPages}>
        Next
        <ArrowRight>&gt;</ArrowRight>
      </NavButton>
    </PaginationContainer>
  );
};

export default Pagination;
