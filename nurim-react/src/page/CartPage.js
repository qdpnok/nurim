import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// --- 스타일 컴포넌트 ---

const Container = styled.div`
  width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  font-family: "Noto Sans KR", sans-serif;
`;

const InnerWrapper = styled.div`
  width: 1240px;
`;

const PageHeader = styled.div`
  width: 100%;
  margin-top: 60px;
  margin-bottom: 40px;
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
  span {
    margin-right: 5px;
    &.active {
      font-weight: bold;
      color: #333;
    }
  }
`;

const PageTitle = styled.h2`
  font-size: 40px;
  font-weight: bold;
  color: #000;
  margin: 0;
`;

const TabMenu = styled.div`
  display: flex;
  gap: 30px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
`;

const TabItem = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 15px 0;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#000" : "#aaa")};
  border-bottom: ${(props) =>
    props.$active ? "2px solid #000" : "2px solid transparent"};
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LeftSection = styled.div`
  width: 715px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SelectAllBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
  user-select: none;
`;

/* [수정] 체크박스 스타일: props에 따라 배경색 변경 */
const CheckBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.$checked ? "#000" : "#fff")};
  border: 1px solid ${(props) => (props.$checked ? "#000" : "#ddd")};
  color: ${(props) => (props.$checked ? "#fff" : "transparent")};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.2s;

  /* SelectAllBox 내부의 checkbox 스타일 */
  &.header-checkbox {
    margin-right: 0;
  }
`;

const CartItemCard = styled.div`
  width: 100%;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start; /* 상단 정렬 */
  position: relative;
  background-color: #fff;
`;

const ItemImg = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-right: 20px;
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  .brand {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .model {
    font-size: 12px;
    color: #888;
    margin-bottom: 10px;
  }
  .options {
    font-size: 13px;
    color: #555;
    margin-bottom: 5px;
    line-height: 1.4;
  }
  .price-row {
    margin-top: 15px;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 10px;

    .badge {
      font-size: 11px;
      background-color: #f5f5f5;
      padding: 4px 8px;
      border-radius: 12px;
      color: #666;
      font-weight: normal;
    }
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 20px;
  color: #ff4d4f;
  cursor: pointer;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  background-color: #f3f3f3;
  border-radius: 20px;
  padding: 5px 10px;
  margin-top: 10px;
  width: fit-content;

  button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 0 8px;
  }
  span {
    font-size: 14px;
    font-weight: bold;
    margin: 0 8px;
  }
`;

const RightSection = styled.div`
  width: 505px;
  height: 424px;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: sticky;
  top: 100px;
`;

const SummaryTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 15px;
  color: #555;

  &.total {
    margin-top: auto;
    border-top: 1px solid #eee;
    padding-top: 20px;
    color: #000;
    font-weight: bold;
    font-size: 20px;
    align-items: center;
  }

  .red {
    color: #ff4d4f;
  }
`;

const OrderButton = styled.button`
  width: 100%;
  height: 60px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #333;
  }

  /* 선택된 상품이 없으면 비활성화 스타일 */
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #888;

  p {
    margin-top: 10px;
    font-size: 16px;
  }
  .sub {
    font-size: 14px;
    color: #aaa;
  }
`;

// --- Main Component ---
const CartPage = () => {
  const [activeTab, setActiveTab] = useState("purchase");
  const navigate = useNavigate();

  // Context에서 데이터와 함수 가져오기
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    toggleCheck,
    toggleAllCheck,
  } = useContext(CartContext);

  // 현재 탭에 맞는 아이템 필터링
  const currentItems = cartItems.filter((item) => item.type === activeTab);

  // 전체 선택 여부 확인
  const isAllChecked =
    currentItems.length > 0 && currentItems.every((item) => item.checked);

  // 핸들러 연결
  const handleSelectAll = () => {
    toggleAllCheck(activeTab, isAllChecked);
  };

  // 총 금액 계산 (체크된 항목만)
  const totalAmount = currentItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.qty, 0);

  // 선택된 상품 수
  const selectedCount = currentItems.filter((item) => item.checked).length;

  const handleOrder = () => {
    // 1. 체크된 아이템 필터링
    const selectedItems = currentItems.filter((item) => item.checked);

    if (selectedItems.length === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }

    // 2. Checkout 페이지로 이동
    navigate("/checkout", {
      state: {
        mode: activeTab, // 'purchase' or 'subscription'
        items: selectedItems, // 선택된 아이템 배열 전체 전달
      },
    });
  };

  return (
    <Container>
      <InnerWrapper>
        <PageHeader>
          <Breadcrumb>
            <span>Home</span> &gt; <span className="active">Cart</span>
          </Breadcrumb>
          <PageTitle>장바구니</PageTitle>
        </PageHeader>

        <TabMenu>
          <TabItem
            $active={activeTab === "purchase"}
            onClick={() => setActiveTab("purchase")}
          >
            제품 구매
          </TabItem>
          <TabItem
            $active={activeTab === "subscription"}
            onClick={() => setActiveTab("subscription")}
          >
            제품 구독
          </TabItem>
        </TabMenu>

        {currentItems.length === 0 ? (
          <EmptyState>
            <p style={{ fontSize: "18px", color: "#555", marginBottom: "5px" }}>
              장바구니가 비어있어요.
            </p>
            <span className="sub">장바구니를 새로운 상품으로 채워보세요.</span>
          </EmptyState>
        ) : (
          <ContentArea>
            {/* 좌측 리스트 */}
            <LeftSection>
              <SelectAllBox onClick={handleSelectAll}>
                <CheckBox className="header-checkbox" $checked={isAllChecked}>
                  <AiOutlineCheck />
                </CheckBox>
                전체 선택
              </SelectAllBox>

              {currentItems.map((item) => (
                <CartItemCard key={item.id}>
                  <div style={{ marginTop: "10px" }}>
                    <CheckBox
                      $checked={item.checked}
                      onClick={() => toggleCheck(item.id)}
                    >
                      <AiOutlineCheck />
                    </CheckBox>
                  </div>

                  <ItemImg src={item.img} alt={item.name} />

                  <ItemInfo>
                    <div className="brand">{item.name}</div>
                    <div className="model">{item.model}</div>

                    <div className="options">
                      {/* Color 등 추가 정보가 있다면 표시 */}
                      {activeTab === "subscription" &&
                        `계약기간 ${item.period}`}
                      <br />
                      {/* 옵션 정보가 있다면 표시 */}
                      {item.option}
                    </div>
                    <div className="options">{item.install}</div>

                    {activeTab === "purchase" ? (
                      <>
                        <div
                          style={{
                            marginTop: "10px",
                            fontWeight: "bold",
                            fontSize: "18px",
                          }}
                        >
                          {item.price.toLocaleString()}원
                        </div>
                        <QuantityControl>
                          <button onClick={() => updateQuantity(item.id, -1)}>
                            -
                          </button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}>
                            +
                          </button>
                        </QuantityControl>
                      </>
                    ) : (
                      <div className="price-row">
                        <span className="badge">1년차 요금 기준</span>월{" "}
                        {item.price.toLocaleString()}원
                      </div>
                    )}
                  </ItemInfo>

                  <DeleteBtn onClick={() => removeFromCart(item.id)}>
                    <AiOutlineClose />
                  </DeleteBtn>
                </CartItemCard>
              ))}
            </LeftSection>

            {/* 우측 결제 박스 */}
            <RightSection>
              <SummaryTitle>결제 예정 금액</SummaryTitle>

              <SummaryRow>
                <span>
                  {activeTab === "purchase" ? "선택 제품 수" : "선택 건수"}
                </span>
                <span>{selectedCount} 건</span>
              </SummaryRow>

              {activeTab === "purchase" ? (
                <>
                  <SummaryRow>
                    <span>주문 금액</span>
                    <span>{totalAmount.toLocaleString()}원</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>할인 가격</span>
                    <span className="red">0원</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>배송비</span>
                    <span>0원</span>
                  </SummaryRow>
                </>
              ) : (
                <>
                  <SummaryRow>
                    <span>이용 요금</span>
                    <span>월 {totalAmount.toLocaleString()}원</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>할인 가격</span>
                    <span className="red">월 0원</span>
                  </SummaryRow>
                </>
              )}

              <SummaryRow className="total">
                <span>
                  {activeTab === "purchase"
                    ? "최종 결제 예정 금액"
                    : "월 납부 예정 금액"}
                </span>
                <span>
                  {activeTab === "purchase" ? "" : "월 "}
                  {totalAmount.toLocaleString()}원
                </span>
              </SummaryRow>

              <OrderButton
                disabled={selectedCount === 0}
                onClick={handleOrder} // 핸들러 연결
              >
                {activeTab === "purchase" ? "구매 하기" : "구독 하기"} →
              </OrderButton>
            </RightSection>
          </ContentArea>
        )}
      </InnerWrapper>
    </Container>
  );
};

export default CartPage;
