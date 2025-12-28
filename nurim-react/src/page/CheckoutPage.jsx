import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import DaumPostcodeEmbed from "react-daum-postcode";
import axios from "axios";
import {
  FaArrowLeft,
  FaCreditCard,
  FaRegCreditCard,
  FaPaypal,
  FaTimes,
} from "react-icons/fa";

// --- Styled Components (기존과 동일, 생략) ---
const Container = styled.div`
  width: 1440px;
  min-height: 800px;
  margin: 0 auto;
  display: flex;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  font-family: "Noto Sans KR", sans-serif;
`;
const LeftPanel = styled.div`
  width: 40%;
  padding: 60px 40px;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
`;
const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 40px;
  align-self: flex-start;
  color: #333;
`;
const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #555;
`;
const ProductList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;
  }
`;
const ProductCard = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    background-color: #f0f0f0;
    border-radius: 8px;
  }
`;
const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h3 {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
  .price-info {
    text-align: right;
    font-size: 14px;
    color: #666;
  }
  .quantity-control {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    font-size: 14px;
    color: #555;
  }
`;
const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 14px;
  color: #666;
  &.total {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    font-size: 20px;
    font-weight: 700;
    color: #333;
  }
  .discount {
    color: #ff4d4f;
  }
`;
const RightPanel = styled.div`
  width: 60%;
  padding: 60px 80px;
  display: flex;
  flex-direction: column;
`;
const StepsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  gap: 15px;
`;
const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  color: ${(props) => (props.$active ? "#2F5D62" : "#bbb")};
  .icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => (props.$active ? "#2F5D62" : "#eee")};
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
  }
`;
const StepDivider = styled.div`
  width: 40px;
  height: 1px;
  background-color: #eee;
`;
const FormTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 600;
`;
const FormGroup = styled.div`
  margin-bottom: 24px;
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 500;
    color: #555;
  }
  input,
  select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    &:focus {
      outline: none;
      border-color: #2f5d62;
    }
  }
  .row {
    display: flex;
    gap: 10px;
  }
`;
const ButtonGroup = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
`;
const ActionButton = styled.button`
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &.back {
    background: #fff;
    border: 1px solid #ddd;
    color: #666;
  }
  &.next {
    background: #2f5d62;
    border: 1px solid #2f5d62;
    color: #fff;
  }
`;
const PaymentOption = styled.div`
  border: 1px solid ${(props) => (props.selected ? "#2F5D62" : "#eee")};
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${(props) => (props.selected ? "20px" : "0")};
  }
  .icons {
    display: flex;
    gap: 5px;
    color: #1a1f71;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const CloseModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;

// --- Main Component ---

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // items: 이전 페이지(상세페이지 or 장바구니)에서 넘겨준 상품 정보들
  const { items = [], mode = "purchase" } = location.state || {};

  const [step, setStep] = useState(1);
  const [isOpenPost, setIsOpenPost] = useState(false);

  // --- 사용자 정보 State ---
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    zipCode: "",
    address: "",
    detailAddress: "",
  });

  // --- 배송 및 결제 State ---
  const [deliveryRequest, setDeliveryRequest] = useState("");
  const [deliveryDates, setDeliveryDates] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({
    cardNum: "",
    expiry: "",
    cvv: "",
  });

  // [API 호출] 백엔드 SubscriptionOrderController와 통신
  useEffect(() => {
    const fetchOrderPageData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        // [주의] memberId는 로그인 시 저장해둔 값을 가져와야 합니다. 없으면 1(테스트용)로 가정
        const memberId = localStorage.getItem("memberId") || 1;

        // 1. 요청 타입 및 파라미터 결정 logic
        let type = "cart"; // 기본값
        let queryParams = "";

        if (items.length === 1 && items[0].productId) {
          // items가 1개이고 productId가 있으면 '상세페이지 직접 구매(product)'로 간주
          type = "product";
          const productId = items[0].productId;
          // period 문자열(예: "36개월")에서 숫자만 추출하거나, 넘어온 값 사용. 없으면 0
          const month = items[0].period ? parseInt(items[0].period) : 0;
          queryParams = `?productId=${productId}&month=${month}`;
        } else {
          // 그 외에는 '장바구니 구매(cart)'로 간주
          type = "cart";
          // items 배열에서 cartItemId들을 추출해서 쿼리스트링으로 만듦
          // (주의: items 객체 안에 cartItemId가 있어야 함. 없으면 productId라도 사용)
          const ids = items
            .map((item) => item.cartItemId || item.productId)
            .join(",");
          queryParams = `?cartItemIds=${ids}`;
        }

        // 2. 백엔드 API 호출
        // URL 패턴: /api/subscription-order/{memberId}/{type}?파라미터들
        const url = `http://localhost:8080/api/subscription-order/${memberId}/${type}${queryParams}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`, // 필요 시 토큰 전송
          },
        });

        // 3. 받아온 데이터(SubOrderPageRes) 매핑
        const data = response.data; // { memberName, email, phoneNum, ... }

        setUserInfo((prev) => ({
          ...prev,
          name: data.memberName || "", // DTO 필드: memberName
          email: data.email || "", // DTO 필드: email
          phone: data.phoneNum || "", // DTO 필드: phoneNum
          // 만약 백엔드가 주소 정보도 준다면 아래처럼 추가 매핑 가능
          // zipCode: data.zipCode || "",
          // address: data.address || "",
        }));
      } catch (error) {
        console.error("주문 페이지 정보를 불러오는데 실패했습니다.", error);
      }
    };

    fetchOrderPageData();
  }, [items]); // items가 변경될 때마다 실행 (실제로는 마운트 시 1회)

  // --- 계산 로직 (프론트엔드 계산 유지) ---
  const calculateTotal = () => {
    return items.reduce((acc, item) => {
      const itemPrice = item.price * (item.qty || 1);
      return acc + itemPrice;
    }, 0);
  };
  const totalPrice = calculateTotal();
  const discount = 0;
  const finalPrice = totalPrice - discount;

  // --- 핸들러 ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (index, value) => {
    setDeliveryDates((prev) => ({ ...prev, [index]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompletePost = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "")
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setUserInfo((prev) => ({
      ...prev,
      zipCode: data.zonecode,
      address: fullAddress,
    }));
    setIsOpenPost(false);
  };

  // --- 유효성 검사 ---
  const validateStep = () => {
    if (step === 1) {
      if (
        !userInfo.name ||
        !userInfo.email ||
        !userInfo.phone ||
        !userInfo.zipCode ||
        !userInfo.address ||
        !userInfo.detailAddress
      ) {
        alert("모든 주문자(계약자) 정보 및 주소를 입력해주세요.");
        return false;
      }
    } else if (step === 2) {
      if (!deliveryRequest) {
        alert("배송 요청사항을 선택해주세요.");
        return false;
      }
      const allDatesSelected = items.every(
        (_, idx) => deliveryDates[idx] && deliveryDates[idx] !== ""
      );
      if (!allDatesSelected) {
        alert("모든 제품의 배송 희망일을 선택해주세요.");
        return false;
      }
    } else if (step === 3) {
      if (!paymentInfo.cardNum || !paymentInfo.expiry || !paymentInfo.cvv) {
        alert("결제 정보를 모두 입력해주세요.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert("결제가 완료되었습니다!");
      navigate("/");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate(-1);
  };

  return (
    <div>
      <Container>
        <LeftPanel>
          <BackButton onClick={handleBack}>
            <FaArrowLeft />
          </BackButton>
          <SectionTitle>주문 제품 ({items.length}건)</SectionTitle>
          <ProductList>
            {items.map((item, index) => (
              <ProductCard key={index}>
                <img src={item.img} alt={item.name} />
                <ProductInfo>
                  <h3>{item.name}</h3>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      marginTop: "5px",
                    }}
                  >
                    {item.model} {item.period && ` | ${item.period}`}
                  </div>
                  <div className="quantity-control">
                    <span>수량: {item.qty || 1}개</span>
                  </div>
                  <div className="price-info">
                    {mode === "subscription" ? (
                      <>월 {item.price.toLocaleString()}원</>
                    ) : (
                      <>{(item.price * (item.qty || 1)).toLocaleString()}원</>
                    )}
                  </div>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductList>
          {mode === "subscription" ? (
            <>
              <PriceRow>
                <span>이용 요금 합계</span>
                <span>월 {totalPrice.toLocaleString()}원</span>
              </PriceRow>
              <PriceRow>
                <span className="discount">할인 가격</span>
                <span className="discount">월 {discount}원</span>
              </PriceRow>
              <PriceRow>
                <span>배송비</span>
                <span>0원</span>
              </PriceRow>
              <PriceRow className="total">
                <span>총 구독료</span>
                <span>월 {finalPrice.toLocaleString()}원</span>
              </PriceRow>
            </>
          ) : (
            <>
              <PriceRow>
                <span>총 제품 수</span>
                <span>
                  {items.reduce((acc, cur) => acc + (cur.qty || 1), 0)}개
                </span>
              </PriceRow>
              <PriceRow>
                <span>주문 금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </PriceRow>
              <PriceRow>
                <span>할인 가격</span>
                <span className="discount">0원</span>
              </PriceRow>
              <PriceRow>
                <span>배송비</span>
                <span>0원</span>
              </PriceRow>
              <PriceRow className="total">
                <span>최종 결제 예정 금액</span>
                <span>{finalPrice.toLocaleString()}원</span>
              </PriceRow>
            </>
          )}
        </LeftPanel>

        <RightPanel>
          <StepsContainer>
            <StepItem $active={step >= 1}>
              <div className="icon">✓</div>{" "}
              {mode === "subscription" ? "계약 정보" : "결제 정보"}
            </StepItem>
            <StepDivider />
            <StepItem $active={step >= 2}>
              <div className="icon">{step > 2 ? "✓" : "2"}</div> 배송일
            </StepItem>
            <StepDivider />
            <StepItem $active={step >= 3}>
              <div className="icon">3</div> 결제 수단
            </StepItem>
          </StepsContainer>

          {step === 1 && (
            <>
              <FormTitle>
                {mode === "subscription" ? "계약자 정보" : "주문자 정보"}
              </FormTitle>
              <FormGroup>
                <label>이름</label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  placeholder="이름을 입력하세요"
                />
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  placeholder="이메일을 입력하세요"
                />
              </FormGroup>
              <FormGroup>
                <label>휴대폰</label>
                <div className="row">
                  <select style={{ width: "80px" }}>
                    <option>+82</option>
                  </select>
                  <input
                    type="text"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </FormGroup>

              <FormTitle>배송 정보</FormTitle>
              <FormGroup>
                <label>배송지 명</label>
                <input type="text" placeholder="우리집" defaultValue="우리집" />
              </FormGroup>
              <FormGroup>
                <label>받는 분</label>
                <input type="text" defaultValue={userInfo.name} readOnly />
              </FormGroup>

              <FormGroup>
                <label>배송지 주소</label>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <input
                    type="text"
                    placeholder="우편번호"
                    value={userInfo.zipCode}
                    readOnly
                  />
                  <button
                    onClick={() => setIsOpenPost(true)}
                    style={{
                      padding: "0 15px",
                      background: "#fff",
                      border: "1px solid #ddd",
                      cursor: "pointer",
                      width: "120px",
                    }}
                  >
                    주소 찾기
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="주소 찾기 선택해 주세요."
                  style={{ marginBottom: "10px" }}
                  value={userInfo.address}
                  readOnly
                />
                <input
                  type="text"
                  name="detailAddress"
                  placeholder="상세주소를 입력해주세요."
                  value={userInfo.detailAddress}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </>
          )}

          {step === 2 && (
            <>
              <FormTitle>배송 요청사항</FormTitle>
              <FormGroup>
                <select
                  value={deliveryRequest}
                  onChange={(e) => setDeliveryRequest(e.target.value)}
                >
                  <option value="" disabled>
                    요청사항을 선택해주세요
                  </option>
                  <option value="call">배송 전 미리 연락 바랍니다.</option>
                  <option value="door">부재 시 문 앞에 놓아주세요.</option>
                  <option value="security">경비실에 맡겨주세요.</option>
                </select>
              </FormGroup>

              <FormTitle>배송 희망일</FormTitle>
              {items.map((item, idx) => (
                <div key={idx} style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      marginBottom: "5px",
                      color: "#666",
                      fontWeight: "bold",
                    }}
                  >
                    {item.name} | {item.model}
                  </div>
                  <FormGroup>
                    <select
                      value={deliveryDates[idx] || ""}
                      onChange={(e) => handleDateChange(idx, e.target.value)}
                    >
                      <option value="" disabled>
                        희망일 선택
                      </option>
                      <option value="2025-01-05">2025-01-05 (일)</option>
                      <option value="2025-01-06">2025-01-06 (월)</option>
                    </select>
                  </FormGroup>
                </div>
              ))}
            </>
          )}

          {step === 3 && (
            <>
              <FormTitle>결제 방식 선택</FormTitle>
              <PaymentOption selected={true}>
                <div className="header">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input type="radio" checked readOnly />
                    <strong>Credit/Debit Cards</strong>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        marginLeft: "10px",
                      }}
                    >
                      Pay with your Credit / Debit Card
                    </div>
                  </div>
                  <div className="icons">
                    <FaCreditCard />
                    <FaRegCreditCard />
                  </div>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <FormGroup>
                    <input
                      type="text"
                      name="cardNum"
                      placeholder="카드 번호"
                      value={paymentInfo.cardNum}
                      onChange={handlePaymentChange}
                    />
                  </FormGroup>
                  <div className="row">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM / YY"
                      value={paymentInfo.expiry}
                      onChange={handlePaymentChange}
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentChange}
                    />
                  </div>
                </div>
              </PaymentOption>
            </>
          )}

          <ButtonGroup>
            <ActionButton className="back" onClick={handleBack}>
              Back
            </ActionButton>
            <ActionButton className="next" onClick={handleNext}>
              {step === 3 ? "결제 하기" : "확인"}
            </ActionButton>
          </ButtonGroup>
        </RightPanel>
      </Container>

      {isOpenPost && (
        <ModalOverlay onClick={() => setIsOpenPost(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseModalButton onClick={() => setIsOpenPost(false)}>
              <FaTimes />
            </CloseModalButton>
            <DaumPostcodeEmbed onComplete={handleCompletePost} />
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default CheckoutPage;
