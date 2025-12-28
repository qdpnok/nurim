import React, { useState } from "react";
import styled from "styled-components";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import carticon from "../../../img/carticon.png";
import CartModal from "../Modal/CartModal";
import ConsultationModal from "../Modal/ConsultationModal";

// [추가] URL 확인을 위해 useLocation 추가
import { useLocation } from "react-router-dom";

// --- 스타일 컴포넌트 (기존과 동일) ---
const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const ContentHeader = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  color: #888;
  display: flex;
  align-items: center;

  span {
    margin-right: 8px;
    &.active {
      font-weight: bold;
      color: #333;
    }
  }
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 80px;
`;

const GallerySection = styled.div`
  width: 610px;
  height: 592px;
  display: flex;
  justify-content: space-between;
`;

const ThumbColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ThumbItem = styled.div`
  width: 152px;
  height: 187px;
  background-color: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MainImageItem = styled.div`
  width: 443px;
  height: 592px;
  background-color: #f9f9f9;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoBox = styled.div`
  width: 590px;
  height: auto;
  min-height: 598px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;

  .header {
    margin-bottom: 10px;
    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;

      h2 {
        font-size: 32px;
        font-weight: 700;
        margin: 0;
      }
      .heart-icon {
        font-size: 28px;
        cursor: pointer;
        color: #333;
      }
    }

    .sub-info {
      display: flex;
      gap: 15px;
      color: #888;
      align-items: center;
      margin-bottom: 10px;
      .rating {
        color: #333;
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }

    .specs {
      font-size: 13px;
      color: #666;
      line-height: 1.5;
    }
  }

  .option-group {
    padding: 10px 0;
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 10px;
      color: #555;
      font-size: 14px;
    }
    .period-buttons {
      display: flex;
      gap: 10px;
    }
  }

  .purchase-info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    font-size: 16px;
    font-weight: bold;
    color: #333;

    .label {
      color: #888;
      font-weight: normal;
    }
  }

  .quantity-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;

    label {
      font-weight: bold;
      color: #555;
      font-size: 14px;
    }

    .counter-box {
      display: flex;
      align-items: center;
      background-color: #f3f3f3;
      border-radius: 30px;
      padding: 5px 15px;

      button {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        padding: 0 10px;
        color: #333;
      }
      span {
        font-size: 16px;
        font-weight: bold;
        margin: 0 10px;
      }
    }
  }

  .price-area {
    margin-top: auto;
    margin-bottom: 20px;
    background-color: #fff;

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 16px;
      padding: 10px 0;

      &.total {
        margin-top: 10px;
        border-top: none;
        padding-top: 10px;
        font-weight: bold;
        font-size: 24px;
        color: #000;
        .price-total {
          color: ${(props) => (props.$isPurchase ? "#000" : "#d32f2f")};
        }
      }
    }
  }

  .btn-group {
    display: flex;
    gap: 10px;
    height: 60px;

    button {
      flex: 1;
      border-radius: 50px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      border: none;
    }
    .cart {
      flex: 0.3;
      background-color: #fff;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 24px;
        height: auto;
      }
    }
    .consult {
      background-color: #eee;
      color: #333;
    }
    .main-action {
      background-color: #356469;
      color: #fff;
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px 0;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  background-color: #f3f3f3;
  font-size: 16px;
  color: #333;
  appearance: none;
  outline: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 15px top 50%;
  background-size: 12px auto;
`;

const PeriodBtn = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.$active ? "#356469" : "#ddd")};
  background-color: ${(props) => (props.$active ? "#fff" : "#fff")};
  color: ${(props) => (props.$active ? "#356469" : "#888")};
  font-weight: bold;
  cursor: pointer;
`;

// --- 컴포넌트 시작 ---

const ProductTopSection = ({
  product,
  selectedPeriod,
  setSelectedPeriod,
  // props로 오는 type을 사용하지 않고 내부에서 다시 계산합니다.
  selectedCategory,
}) => {
  const location = useLocation(); // [수정] 현재 URL 정보 가져오기

  // [수정] URL에 'purchase'가 있으면 구매 모드, 아니면 구독 모드 (props 무시)
  const currentType = location.pathname.toLowerCase().includes("purchase")
    ? "purchase"
    : "subscription";

  const isSubscription = currentType === "subscription";

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const openCartModal = () => setIsCartOpen(true);
  const closeCartModal = () => setIsCartOpen(false);

  const openConsultModal = () => setIsConsultOpen(true);
  const closeConsultModal = () => setIsConsultOpen(false);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <Container>
      <ContentHeader>
        <Breadcrumb>
          <span>Home</span> <span>&gt;</span>
          <span>
            {/* [수정] 계산된 currentType 사용 */}
            {isSubscription ? "Subscriptions" : "Purchase"}
          </span>{" "}
          <span>&gt;</span>
          <span>{selectedCategory || "Category"}</span>
          <span>&gt;</span>
          <span className="active">{product.name}</span>
        </Breadcrumb>
      </ContentHeader>

      <Section>
        <GallerySection>
          <ThumbColumn>
            {[1, 2, 3].map((num) => (
              <ThumbItem key={num}>
                <img
                  src={`https://placehold.co/152x187?text=View${num}`}
                  alt={`썸네일${num}`}
                />
              </ThumbItem>
            ))}
          </ThumbColumn>
          <MainImageItem>
            <img
              src={product.img || "https://placehold.co/443x592?text=Main"}
              alt={product.name}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </MainImageItem>
        </GallerySection>

        {/* [수정] styled-component에 전달하는 props도 계산된 값 사용 */}
        <InfoBox $isPurchase={!isSubscription}>
          <div className="header">
            <div className="title-row">
              <h2>{product.name}</h2>
            </div>

            <div className="sub-info">
              <span>{product.serialNum || "27ART10AKPL"}</span>
              <span>|</span>
              <span className="rating">
                <AiFillStar color="#FFD700" /> 4.5 / 5
              </span>
            </div>
            <div className="specs">
              해상도: QHD | 인공지능 프로세서 알파8 AI | 주요 기능 : 돌비
              애트모스, 돌비 비전 | 운영체제: webOS 24
            </div>
          </div>

          <Divider />

          <div className="option-group">
            <label>Choose Option</label>
            <StyledSelect defaultValue="default">
              <option value="default" disabled hidden>
                Option
              </option>
              <option value="none">없음</option>
            </StyledSelect>
          </div>

          <Divider />

          {/* 구독 vs 구매 분기 */}
          {isSubscription ? (
            <div className="option-group">
              <label>계약 기간</label>
              <div className="period-buttons">
                {[36, 48, 60].map((period) => (
                  <PeriodBtn
                    key={period}
                    $active={selectedPeriod === period}
                    onClick={() => setSelectedPeriod(period)}
                  >
                    {period} 개월
                  </PeriodBtn>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="purchase-info-row">
                <span className="label">제품 구매가</span>
                <span>
                  {product.price ? product.price.toLocaleString() : 0}원
                </span>
              </div>
              <div className="purchase-info-row">
                <span className="label">할인</span>
                <span>0원</span>
              </div>
              <Divider />
              <div className="quantity-control">
                <label>수량 선택</label>
                <div className="counter-box">
                  <button onClick={() => handleQuantityChange(-1)}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>
              </div>
            </>
          )}

          <div className="price-area">
            {isSubscription ? (
              <div className="row">
                <span>월 별 구독료</span>
                <span className="price">
                  {product.price
                    ? Number(product.price / selectedPeriod).toLocaleString()
                    : 0}
                  원
                </span>
              </div>
            ) : null}

            <div className="row total">
              <span>{isSubscription ? "가전 구독 총 요금" : "총 금액"}</span>
              <span className="price-total">
                {isSubscription
                  ? product.price
                    ? product.price.toLocaleString()
                    : 0
                  : product.price
                  ? (product.price * quantity).toLocaleString()
                  : 0}
                원
              </span>
            </div>
          </div>

          <div className="btn-group">
            <button className="cart" onClick={openCartModal}>
              <img src={carticon} alt="장바구니" />
            </button>
            {isCartOpen && <CartModal onClose={closeCartModal} />}

            <button className="consult" onClick={openConsultModal}>
              {isSubscription ? "구독 상담 예약" : "상담 예약"}
            </button>
            {isConsultOpen && <ConsultationModal onClose={closeConsultModal} />}

            <button className="main-action">
              {isSubscription ? "구독 하기" : "구매 하기"}
            </button>
          </div>
        </InfoBox>
      </Section>
    </Container>
  );
};

export default ProductTopSection;
