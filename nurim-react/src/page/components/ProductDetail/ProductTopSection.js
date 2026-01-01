import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import carticon from "../../../img/carticon.png";
import CartModal from "../Modal/CartModal";
import ConsultationModal from "../Modal/ConsultationModal";
import { useLocation, useNavigate } from "react-router-dom";
import { productCardData } from "../../../data/productCardSpecs";
import { CartContext } from "../../../context/CartContext";

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
  justify-content: center;
  align-items: center;
`;
const MainImageItem = styled.div`
  width: 100%;
  height: 100%;
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
  margin-left: 30px;
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

const ProductTopSection = ({
  product,
  selectedPeriod,
  setSelectedPeriod,
  selectedCategory,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const currentType = location.pathname.toLowerCase().includes("purchase")
    ? "purchase"
    : "subscription";
  const isSubscription = currentType === "subscription";
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const sNum = product.sNum || product.snum || product.num;
  const mappingKey = sNum;
  const customData = productCardData[mappingKey];

  const displayName = customData?.name?.[0] || product.name;
  const displaySpecs =
    customData?.specs?.join(" | ") || product.spec || "상세 정보가 없습니다.";

  let displayMonthlyPrice = 0;
  let displayTotalPrice = 0;

  if (isSubscription) {
    if (customData?.prices?.rent) {
      displayMonthlyPrice = customData.prices.rent[selectedPeriod] || 0;
      displayTotalPrice = displayMonthlyPrice * selectedPeriod;
    } else {
      displayTotalPrice = product.price || 0;
      displayMonthlyPrice = selectedPeriod
        ? Math.floor(displayTotalPrice / selectedPeriod)
        : 0;
    }
  } else {
    const unitPrice = customData?.prices?.buy || product.price || 0;
    displayTotalPrice = unitPrice * quantity;
  }

  // --- 이미지 경로 처리 함수 ---
  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `/images/${img}`;
  };
  const finalImage =
    getImageUrl(product.img) || `https://placehold.co/443x592?text=NoImage`;

  const openCartModal = () => setIsCartOpen(true);
  const closeCartModal = () => setIsCartOpen(false);
  const openConsultModal = () => setIsConsultOpen(true);
  const closeConsultModal = () => setIsConsultOpen(false);

  const handleCartClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능한 서비스 입니다");
      return;
    }

    const newItem = {
      productId: product.id || product.num,
      name: displayName,
      model: product.serialNum || "MODEL-000",
      img: finalImage,
      type: isSubscription ? "subscription" : "purchase",
      price: isSubscription
        ? displayMonthlyPrice
        : customData?.prices?.buy || product.price || 0,
      period: isSubscription ? `${selectedPeriod}개월` : null,
      qty: isSubscription ? 1 : quantity,
      option: "기본 옵션",
      install: "전문 기사 설치",
      color: "Color Info",
    };

    addToCart(newItem);
    openCartModal();
  };

  const handleConsultClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능한 서비스 입니다");
      return;
    }
    openConsultModal();
  };

  const handleMainActionClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능한 서비스 입니다");
      return;
    }

    const itemData = {
      productId: product.id || product.num,
      name: displayName,
      model: product.serialNum || "MODEL-000",
      img: finalImage,
      type: isSubscription ? "subscription" : "purchase",
      price: isSubscription
        ? displayMonthlyPrice
        : customData?.prices?.buy || product.price || 0,
      period: isSubscription ? `${selectedPeriod}개월` : null,
      qty: isSubscription ? 1 : quantity,
    };

    navigate("/checkout", {
      state: {
        mode: isSubscription ? "subscription" : "purchase",
        items: [itemData],
      },
    });
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  // [수정] 모달에 전달할 데이터: 이미지 경로 포함
  const consultationData = {
    productId: product.id || product.num, // ID 추가
    product: displayName,
    img: finalImage, // 처리된 이미지 경로 전달
    type: isSubscription ? "구독 상담" : "구매 상담",
  };

  return (
    <Container>
      <ContentHeader>
        <Breadcrumb>
          <span>Home</span> <span>&gt;</span>
          <span>{isSubscription ? "Subscriptions" : "Purchase"}</span>
          <span>&gt;</span>
          <span>{selectedCategory || "Category"}</span>
          <span>&gt;</span>
          <span className="active">{displayName}</span>
        </Breadcrumb>
      </ContentHeader>

      <Section>
        <GallerySection>
          <MainImageItem>
            <img
              src={finalImage}
              alt={displayName}
              onError={(e) => {
                e.target.src = "https://placehold.co/443x592?text=Main";
              }}
            />
          </MainImageItem>
        </GallerySection>

        <InfoBox $isPurchase={!isSubscription}>
          <div className="header">
            <div className="title-row">
              <h2>{displayName}</h2>
            </div>
            <div className="sub-info">
              <span>{product.serialNum || "27ART10AKPL"}</span>
              <span>|</span>
              <span className="rating">
                <AiFillStar color="#FFD700" /> 4.5 / 5
              </span>
            </div>
            <div className="specs">{displaySpecs}</div>
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
                <span>{(displayTotalPrice / quantity).toLocaleString()}원</span>
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
                  {displayMonthlyPrice.toLocaleString()}원
                </span>
              </div>
            ) : null}
            <div className="row total">
              <span>{isSubscription ? "가전 구독 총 요금" : "총 금액"}</span>
              <span className="price-total">
                {displayTotalPrice.toLocaleString()}원
              </span>
            </div>
          </div>

          <div className="btn-group">
            <button className="cart" onClick={handleCartClick}>
              <img src={carticon} alt="장바구니" />
            </button>
            <button className="consult" onClick={handleConsultClick}>
              {isSubscription ? "구독 상담 예약" : "상담 예약"}
            </button>
            <button className="main-action" onClick={handleMainActionClick}>
              {isSubscription ? "구독 하기" : "구매 하기"}
            </button>
          </div>
        </InfoBox>
      </Section>

      {isCartOpen && <CartModal onClose={closeCartModal} />}
      {isConsultOpen && (
        <ConsultationModal
          onClose={closeConsultModal}
          data={consultationData}
        />
      )}
    </Container>
  );
};

export default ProductTopSection;
