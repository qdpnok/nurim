import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

// [추가] URL 파싱 및 데이터 조회를 위한 import
import { useLocation } from "react-router-dom";
// 경로가 정확한지 확인해주세요 (예: ../../../data/productCardSpecs)
import { productCardData } from "../../../data/productCardSpecs";

// --- Styled Components (기존과 동일) ---
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContainer = styled.div`
  width: 1200px;
  max-height: 95vh;
  background-color: white;
  border-radius: 20px;
  padding: 40px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

const InnerWrapper = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  border-bottom: 2px solid #ddd;
  padding-bottom: 20px;
  margin: 0;
`;

const SubTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 15px 0;
  color: #333;
`;

/* 제품 정보 박스 */
const ProductBox = styled.div`
  width: 505px;
  height: 165px;
  border: 1px solid #eee;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
`;

const ProductImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const ProductInfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  h4 {
    font-size: 18px;
    margin: 0;
    font-weight: bold;
  }
  span {
    font-size: 14px;
    color: #888;
  }
`;

/* 상담 메뉴 박스 */
const MenuBox = styled.div`
  width: 372px;
  height: 96px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const MenuButton = styled.button`
  width: 166px;
  height: 48px;
  border-radius: 24px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? "#2F6162" : "#888")};
  color: white;
  &:hover {
    opacity: 0.9;
  }
`;

/* --- Calendar Styling Wrapper --- */
const CalendarWrapper = styled.div`
  width: 470px;
  height: 470px;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .react-calendar {
    width: 100%;
    background: none;
    border: none;
    font-family: inherit;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    button {
      font-size: 18px;
      font-weight: bold;
      background: none;
      color: #333;
      &:enabled:hover,
      &:enabled:focus {
        background-color: transparent;
        color: #2f6162;
      }
    }
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 12px;
    color: #888;
    margin-bottom: 10px;
    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__tile {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-radius: 50%;
    background: transparent;
    color: #333;

    &:enabled:hover,
    &:enabled:focus {
      background-color: #e0e0e0;
      color: #333;
    }
  }

  .react-calendar__tile--now {
    background: #eee;
    color: #333;
  }

  .react-calendar__tile--active {
    background: #2f6162 !important;
    color: white !important;
  }
`;

const DateTimeWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
`;

const TimeSelectionBox = styled.div`
  width: 470px;
  height: 470px;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
`;

/* 지난 날짜 오버레이 */
const DisabledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(80, 80, 80, 0.85);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  color: white;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-top: 10px;
`;

const TimeSlot = styled.div`
  padding: 10px 0;
  background-color: ${(props) => (props.$disabled ? "#eee" : "white")};
  border: 1px solid
    ${(props) =>
      props.$disabled ? "#ddd" : props.$selected ? "#2F6162" : "#ddd"};
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  color: ${(props) =>
    props.$disabled ? "#aaa" : props.$selected ? "#2F6162" : "#333"};
  font-weight: ${(props) => (props.$selected ? "bold" : "normal")};
  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};

  &:hover {
    border-color: ${(props) => (props.$disabled ? "#ddd" : "#2f6162")};
  }
`;

const ApplicantBox = styled.div`
  width: 505px;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const InputField = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #2f6162;
  }
`;

const TextAreaBox = styled.div`
  width: 1000px;
  height: 335px;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  resize: none;
  font-size: 15px;
  font-family: inherit;
  outline: none;
`;

const Footer = styled.div`
  width: 1000px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
`;

const ActionButton = styled.button`
  width: 160px;
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background-color: ${(props) => (props.$submit ? "#2F6162" : "#888")};
  color: white;
  &:hover {
    opacity: 0.9;
  }
`;

// --- Mock Data ---
const TIME_SLOTS_AM = ["10:00", "10:30", "11:00", "11:30"];
const TIME_SLOTS_PM = [
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
];

const ConsultationModal = ({ onClose }) => {
  // [추가] 1. URL에서 ID 추출
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  // URL 마지막 부분이 ID라고 가정 (예: /purchase/productAcSpecs/82 -> 82)
  const productId = pathSegments[pathSegments.length - 1];

  // [추가] 2. 데이터 매핑 (ID로 데이터 찾기)
  // productCardSpecs.js에서 해당 ID의 데이터 가져오기
  const productInfo = productCardData[productId];
  const productName = productInfo?.name?.[0] || "상품명 없음";

  // 3. 이미지 URL 생성 (가상 이미지 서비스 사용 예시)
  // 실제 이미지가 있다면 productInfo.img 등을 사용
  const productImage = `https://placehold.co/100x100?text=${productName.substring(
    0,
    2
  )}`;

  // [상태] 시리얼 넘버 (DB에서 가져올 값)
  const [serialNum, setSerialNum] = useState("");

  // [API 호출] 백엔드에서 시리얼 넘버 등 상세 정보 가져오기
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8222/api/product/detail/${productId}`
        );
        // 응답 데이터 구조에 맞춰 serialNum 추출 (ProductDetailResDto 참고)
        if (response.data && response.data.serialNum) {
          setSerialNum(response.data.serialNum);
        }
      } catch (error) {
        console.error("제품 정보를 가져오는데 실패했습니다:", error);
        setSerialNum("조회 불가");
      }
    };

    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  const [consultType, setConsultType] = useState("subscription");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    phone: "",
    content: "",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (isPastDate) {
      alert("올바른 날짜를 선택해주세요.");
      return;
    }
    if (!selectedTime) {
      alert("시간을 선택해주세요.");
      return;
    }

    const formattedDate = selectedDate.toISOString().split("T")[0];
    alert(
      `상담 예약 완료!\n상품: ${productName}\n시리얼: ${serialNum}\n날짜: ${formattedDate}\n시간: ${selectedTime}`
    );
    onClose();
  };

  // 날짜 비교 로직
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPastDate = selectedDate < today;
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  const checkIsPastTime = (timeStr) => {
    if (!isToday) return false;
    const now = new Date();
    const [hour, minute] = timeStr.split(":").map(Number);
    const targetTime = new Date(selectedDate);
    targetTime.setHours(hour, minute, 0, 0);
    return targetTime < now;
  };

  return (
    <Overlay>
      <ModalContainer>
        <InnerWrapper>
          <SectionTitle>상담 예약</SectionTitle>

          {/* [변경] 제품 정보 표시 영역 */}
          <div>
            <SubTitle>제품 정보</SubTitle>
            <ProductBox>
              <ProductImg src={productImage} alt={productName} />
              <ProductInfoText>
                {/* 로컬 데이터에서 가져온 이름 */}
                <h4>{productName}</h4>
                {/* DB에서 가져온 시리얼 넘버 */}
                <span>{serialNum || "Loading..."}</span>
              </ProductInfoText>
            </ProductBox>
          </div>

          {/* 상담 메뉴 */}
          <div>
            <SubTitle>상담 메뉴</SubTitle>
            <MenuBox>
              <MenuButton
                $active={consultType === "subscription"}
                onClick={() => setConsultType("subscription")}
              >
                구독
              </MenuButton>
              <MenuButton
                $active={consultType === "purchase"}
                onClick={() => setConsultType("purchase")}
              >
                구매
              </MenuButton>
            </MenuBox>
          </div>

          {/* 상담 희망 일시 */}
          <div>
            <SubTitle>상담 희망 일시</SubTitle>
            <DateTimeWrapper>
              <CalendarWrapper>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  formatDay={(locale, date) => date.getDate()}
                  calendarType="gregory"
                  showNeighboringMonth={false}
                  next2Label={null}
                  prev2Label={null}
                />
              </CalendarWrapper>

              <TimeSelectionBox>
                {isPastDate && (
                  <DisabledOverlay>
                    선택한 날짜는
                    <br />
                    지난 날짜 입니다.
                  </DisabledOverlay>
                )}

                <div
                  style={{
                    marginBottom: "10px",
                    fontWeight: "bold",
                    color: "#555",
                  }}
                >
                  오전
                </div>
                <TimeGrid>
                  {TIME_SLOTS_AM.map((time) => {
                    const isDisabled = checkIsPastTime(time);
                    return (
                      <TimeSlot
                        key={time}
                        $selected={selectedTime === time}
                        $disabled={isDisabled}
                        onClick={() =>
                          !isPastDate && !isDisabled && setSelectedTime(time)
                        }
                      >
                        {time}
                      </TimeSlot>
                    );
                  })}
                </TimeGrid>

                <div
                  style={{
                    marginTop: "20px",
                    marginBottom: "10px",
                    fontWeight: "bold",
                    color: "#555",
                  }}
                >
                  오후
                </div>
                <TimeGrid>
                  {TIME_SLOTS_PM.map((time) => {
                    const isDisabled = checkIsPastTime(time);
                    return (
                      <TimeSlot
                        key={time}
                        $selected={selectedTime === time}
                        $disabled={isDisabled}
                        onClick={() =>
                          !isPastDate && !isDisabled && setSelectedTime(time)
                        }
                      >
                        {time}
                      </TimeSlot>
                    );
                  })}
                </TimeGrid>
              </TimeSelectionBox>
            </DateTimeWrapper>
          </div>

          {/* 신청자 정보 */}
          <div>
            <SubTitle>신청자 정보</SubTitle>
            <ApplicantBox>
              <InputGroup>
                <Label>이름</Label>
                <InputField
                  name="name"
                  placeholder="이름을 입력하세요"
                  onChange={handleInputChange}
                />
              </InputGroup>
              <InputGroup>
                <Label>아이디</Label>
                <InputField
                  name="id"
                  placeholder="아이디를 입력하세요"
                  onChange={handleInputChange}
                />
              </InputGroup>
              <InputGroup>
                <Label>휴대폰</Label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <select
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <option>+ 82</option>
                  </select>
                  <InputField
                    name="phone"
                    placeholder="번호를 입력하세요"
                    style={{ flex: 1 }}
                    onChange={handleInputChange}
                  />
                </div>
              </InputGroup>
            </ApplicantBox>
          </div>

          {/* 상담 내용 */}
          <div>
            <TextAreaBox>
              <SubTitle>(필수) 상담 내용을 입력해 주세요.</SubTitle>
              <StyledTextArea
                name="content"
                placeholder="내용을 입력해 주세요."
                onChange={handleInputChange}
              />
            </TextAreaBox>
          </div>

          <Footer>
            <ActionButton onClick={onClose}>닫기</ActionButton>
            <ActionButton $submit onClick={handleSubmit}>
              상담 신청 하기
            </ActionButton>
          </Footer>
        </InnerWrapper>
      </ModalContainer>
    </Overlay>
  );
};

export default ConsultationModal;
