import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ReturnModal from "../../Modal/ReturnModal";

// 스타일은 Acquisition과 동일하게 사용 (중복 코드는 생략하고 컴포넌트 이름만 변경해서 사용 가능)
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
  background-color: ${(props) => (props.$primary ? "#fff" : "#2F5D62")};
  color: ${(props) => (props.$primary ? "#555" : "#fff")};
  border: ${(props) => (props.$primary ? "1px solid #ddd" : "none")};
  &:hover {
    opacity: 0.9;
  }
`;

const Return = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      image: "",
      name: "LG 스탠바이미",
      model: "27ART10AKPL",
      regDate: "2023-01-25",
      monthlyPrice: "4,900원", // 이미지 참고
      remaining: "14개월",
      penaltyCost: "50,000원",
    },
  ];

  const handleApply = () => {
    setSelectedProduct(products[0]);
    setIsModalOpen(true);
  };

  return (
    <Container>
      <Breadcrumb>Home &gt; My Page &gt; 반납 신청</Breadcrumb>
      <TitleHeader>
        <Title>반납 신청</Title>
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
        <ReturnModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default Return;
