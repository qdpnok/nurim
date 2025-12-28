import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AcquisitionModal from "../../Modal/AcquisitionModal";

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
  margin: 0;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin-bottom: 30px;
`;

const SubTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
`;

// 테이블 스타일
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
`;

const Th = styled.th`
  padding: 15px;
  border-top: 1px solid #333;
  border-bottom: 1px solid #ccc;
  background-color: #f9f9f9;
  font-size: 14px;
  color: #555;
  text-align: center;
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #eee;
  text-align: center;
  font-size: 14px;
  color: #333;
  vertical-align: middle;

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
  padding: 10px 30px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  /* props에 따라 스타일 변경 */
  background-color: ${(props) => (props.$primary ? "#fff" : "#2F5D62")};
  color: ${(props) => (props.$primary ? "#555" : "#fff")};
  border: ${(props) => (props.$primary ? "1px solid #ddd" : "none")};

  &:hover {
    opacity: 0.9;
  }
`;

const Acquisition = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 임시 데이터 (이미지 내용 반영)
  const products = [
    {
      id: 1,
      image: "", // 이미지 URL
      name: "LG 스탠바이미",
      model: "27ART10AKPL",
      regDate: "2023-12-25",
      monthlyPrice: "30,000원",
      remaining: "3개월",
      remainingCost: "180,000원",
    },
  ];

  const handleApply = () => {
    // 체크된 상품이 있다고 가정하고 첫 번째 상품 선택
    setSelectedProduct(products[0]);
    setIsModalOpen(true);
  };

  return (
    <Container>
      <Breadcrumb>Home &gt; My Page &gt; 인수 신청</Breadcrumb>
      <TitleHeader>
        <Title>인수 신청</Title>
        <Divider />
      </TitleHeader>

      <SubTitle>구독 제품</SubTitle>
      <Table>
        <thead>
          <tr>
            <Th>
              <input type="checkbox" />
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
                <input type="checkbox" defaultChecked />
              </Td>
              <Td>
                <img src={product.image} alt="제품" />
              </Td>
              <Td>
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
