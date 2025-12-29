import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/Axios";

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
  margin-top: 0; /* [중요] 추가됨: 높이 강제 고정 */
  margin-bottom: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #666;
  font-size: 15px;
  gap: 20px;
`;

const ActionButton = styled.button`
  background-color: #356469;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #2a5054;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const ItemCard = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
`;
const InfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    background: #eee;
  }
`;

const OrderManage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const memberNum = 1;

  useEffect(() => {
    // 구매 내역 API 호출
    api
      .get(`/mypage/orders/${memberNum}`)
      .then((res) => setList(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <Breadcrumb>Home &gt; My Page</Breadcrumb>
      <TitleHeader>
        <Title>구매한 제품</Title>
        <Divider />
      </TitleHeader>
      {list.length === 0 ? (
        <EmptyState>
          <p>구매한 제품이 없습니다.</p>
          <ActionButton onClick={() => navigate("/purchase")}>
            제품 구매하기
          </ActionButton>
        </EmptyState>
      ) : (
        <ListContainer>
          {list.map((item, idx) => (
            <ItemCard key={idx}>
              {/* 렌더링 로직 위와 동일 (period 제외 등) */}
              <InfoSection>
                <img src={item.image} alt={item.name} />
                <div>
                  <div style={{ fontWeight: "bold" }}>{item.name}</div>
                  <div style={{ fontSize: "12px", color: "#888" }}>
                    {item.model}
                  </div>
                </div>
              </InfoSection>
              <div style={{ fontWeight: "bold" }}>{item.price}</div>
            </ItemCard>
          ))}
        </ListContainer>
      )}
    </Container>
  );
};

export default OrderManage;
