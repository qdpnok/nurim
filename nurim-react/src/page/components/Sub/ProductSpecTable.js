import React from "react";
import styled from "styled-components";

// --- Styled Components (기존과 동일) ---
const TableContainer = styled.div`
  width: 100%;
  border-top: 2px solid #333;
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
  flex-wrap: wrap;
  border-left: 1px solid #e0e0e0;
`;

const ItemWrapper = styled.div`
  display: flex;
  width: ${(props) => (props.$fullWidth ? "100%" : "50%")};
  border-bottom: 1px solid #e0e0e0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Label = styled.div`
  width: 120px;
  min-width: 120px;
  padding: 12px;
  background-color: #f9f9f9;
  font-weight: bold;
  display: flex;
  align-items: center;
  border-right: 1px solid #e0e0e0;
`;

const Value = styled.div`
  flex: 1;
  padding: 12px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  word-break: break-all;
`;

const ProductSpecTable = ({ data }) => {
  // 1. 디버깅을 위해 콘솔에 현재 들어오는 데이터를 찍어봅니다. (F12 눌러서 확인)
  console.log("ProductSpecTable로 들어온 데이터:", data);

  // 2. [수정됨] data가 진짜 '배열'인지 확인합니다. 배열이 아니면 빈 배열([])을 넣습니다.
  const safeData = Array.isArray(data) ? data : [];

  // 3. 만약 data가 배열이 아니라서 safeData가 빈 배열이 되었다면,
  //    화면에 아무것도 안 나올 수 있습니다. 이 경우 콘솔 로그를 확인해서
  //    data.items 나 data.result 처럼 올바른 경로를 찾아야 합니다.

  return (
    <TableContainer>
      {safeData.map((section, idx) => (
        <React.Fragment key={idx}>
          {section.category && <SectionTitle>{section.category}</SectionTitle>}

          <GridContainer>
            {/* items도 배열인지 확인하고 map 실행 */}
            {(Array.isArray(section.items) ? section.items : []).map(
              (item, i) => (
                <ItemWrapper key={i} $fullWidth={item.fullWidth}>
                  <Label>{item.label}</Label>
                  <Value>{item.value}</Value>
                </ItemWrapper>
              )
            )}
          </GridContainer>
        </React.Fragment>
      ))}
    </TableContainer>
  );
};

export default ProductSpecTable;
