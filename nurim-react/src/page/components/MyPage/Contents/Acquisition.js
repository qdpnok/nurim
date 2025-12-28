import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AcquisitionModal from "../../Modal/AcquisitionModal";

// --- 스타일 정의 시작 ---

const Container = styled.div`
  width: 100%;
  padding: 0 20px; /* 좌우 여백 추가 */
  box-sizing: border-box;
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
  text-align: left; /* 왼쪽 정렬 */
`;

const TitleHeader = styled.div`
  text-align: left; /* 왼쪽 정렬로 변경 (기존 center 제거) */
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 32px; /* 폰트 사이즈 키움 (디자인 반영) */
  font-weight: bold;
  color: #000;
  margin: 0;
`;

// "구독 제품" 텍스트 스타일
const SubTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #000;
  border-bottom: 2px solid #000; /* 밑줄 추가 */
  padding-bottom: 10px;
  display: inline-block;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate; /* 셀 간격 분리 (디자인 반영) */
  border-spacing: 0 10px; /* 행 간격 추가 */
  margin-bottom: 40px;
`;

// 디자인 시안처럼 둥근 회색 배경의 헤더
const Th = styled.th`
  padding: 15px;
  background-color: #f5f5f5; /* 회색 배경 */
  font-size: 14px;
  color: #555;
  text-align: center;
  border: none;

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const Td = styled.td`
  padding: 20px 15px;
  text-align: center;
  font-size: 14px;
  color: #333;
  vertical-align: middle;
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;

  &:first-child {
    border-left: 1px solid #eee;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:last-child {
    border-right: 1px solid #eee;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    background-color: #eee;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 12px 40px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) => (props.$primary ? "#fff" : "#2F5D62")};
  color: ${(props) => (props.$primary ? "#2F5D62" : "#fff")};
  border: ${(props) => (props.$primary ? "1px solid #2F5D62" : "none")};

  &:hover {
    opacity: 0.9;
  }
`;

// --- 커스텀 체크박스 컴포넌트 시작 ---
const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;

// 실제 input은 숨김
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${(props) =>
    props.checked ? "#000" : "#fff"}; /* 체크되면 검은색 */
  border: 1px solid ${(props) => (props.checked ? "#000" : "#ccc")};
  border-radius: 4px;
  transition: all 150ms;
  display: flex;
  align-items: center;
  justify-content: center;

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

// 체크박스 재사용 컴포넌트
const CustomCheckbox = ({ checked, onChange }) => (
  <CheckboxContainer onClick={onChange}>
    <HiddenCheckbox checked={checked} readOnly />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

const Acquisition = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 체크박스 상태 관리 (단일 선택 예시)
  const [isChecked, setIsChecked] = useState(true);

  // 임시 데이터
  const products = [
    {
      id: 1,
      image: "",
      name: "LG 스탠바이미",
      model: "27ART10AKPL",
      regDate: "2023-12-25",
      monthlyPrice: "30,000원",
      remaining: "3개월",
      remainingCost: "180,000원",
    },
  ];

  const handleApply = () => {
    if (!isChecked) {
      alert("제품을 선택해주세요.");
      return;
    }
    setSelectedProduct(products[0]);
    setIsModalOpen(true);
  };

  const toggleCheckbox = () => setIsChecked(!isChecked);

  return (
    <Container>
      {/* 왼쪽 정렬 및 상단 배치 */}
      <Breadcrumb>Home &gt; My Page &gt; 인수 신청</Breadcrumb>

      <TitleHeader>
        <Title>인수 신청</Title>
        {/* Divider 제거 혹은 필요시 스타일 변경 */}
      </TitleHeader>

      <SubTitle>구독 제품</SubTitle>
      <Table>
        <thead>
          <tr>
            <Th>
              {/* 전체 선택 체크박스 (기능은 상황에 맞춰 구현) */}
              <CustomCheckbox checked={isChecked} onChange={toggleCheckbox} />
            </Th>
            <Th>전체선택</Th>
            <Th>가전 명</Th>
            <Th>가입 일자</Th>
            <Th>월 케어 비용</Th>
            <Th>남은 기간</Th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <Td>
                {/* 개별 선택 체크박스 */}
                <CustomCheckbox checked={isChecked} onChange={toggleCheckbox} />
              </Td>
              <Td>
                <img src={product.image} alt="제품" />
              </Td>
              <Td style={{ textAlign: "left", paddingLeft: "30px" }}>
                <strong>{product.name}</strong>
                <br />
                <span style={{ fontSize: "12px", color: "#888" }}>
                  [{product.model}]
                </span>
              </Td>
              <Td>{product.regDate}</Td>
              <Td>{product.monthlyPrice}</Td>
              <Td>{product.remaining}</Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ButtonGroup>
        <Button $primary onClick={handleApply}>
          신청하기
        </Button>
        <Button onClick={() => navigate(-1)}>닫기</Button>
      </ButtonGroup>

      {isModalOpen && (
        <AcquisitionModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default Acquisition;
