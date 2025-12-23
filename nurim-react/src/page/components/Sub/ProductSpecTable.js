import React from "react";
import styled from "styled-components";

// --- Styled Components ---

const TableContainer = styled.div`
  width: 100%;
  border-top: 2px solid #333; // 맨 위 진한 선
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  color: #333;
`;

const SectionTitle = styled.div`
  padding: 15px 10px;
  font-weight: 800;
  font-size: 16px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  margin-top: 10px;
  color: #000;
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap; // 줄바꿈 허용
  border-left: 1px solid #e0e0e0; // 좌측 마감 선
`;

const ItemWrapper = styled.div`
  display: flex;
  // fullWidth가 true면 100%, 아니면 50% (2열 배치)
  width: ${(props) => (props.$fullWidth ? "100%" : "50%")};
  border-bottom: 1px solid #e0e0e0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%; // 모바일에서는 무조건 한 줄에 하나
  }
`;

const Label = styled.div`
  width: 120px; // 라벨 너비 고정
  min-width: 120px;
  padding: 12px;
  background-color: #f9f9f9; // 라벨 배경색 (회색조)
  font-weight: bold;
  display: flex;
  align-items: center;
  border-right: 1px solid #e0e0e0;
`;

const Value = styled.div`
  flex: 1; // 남은 공간 모두 차지
  padding: 12px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-right: 1px solid #e0e0e0; // 우측 마감 선
  word-break: break-all;
`;

const ProductSpecTable = ({ data }) => {
  return (
    <TableContainer>
      {data.map((section, idx) => (
        <React.Fragment key={idx}>
          {section.category && <SectionTitle>{section.category}</SectionTitle>}

          <GridContainer>
            {section.items.map((item, i) => (
              <ItemWrapper key={i} $fullWidth={item.fullWidth}>
                <Label>{item.label}</Label>
                <Value>{item.value}</Value>
              </ItemWrapper>
            ))}
          </GridContainer>
        </React.Fragment>
      ))}
    </TableContainer>
  );
};

export default ProductSpecTable;
