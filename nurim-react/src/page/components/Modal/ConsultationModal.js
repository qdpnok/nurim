import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar"; // 라이브러리 임포트
import "react-calendar/dist/Calendar.css"; // 기본 스타일 임포트

// --- Styled Components ---

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
  object-fit: contain;
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
/* react-calendar의 기본 스타일을 덮어씌워서 디자인에 맞게 변경 */
const CalendarWrapper = styled.div`
  width: 470px;
  height: 470px;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 상단 정렬 */

  .react-calendar {
    width: 100%;
    background: none;
    border: none;
    font-family: inherit;
  }

  /* 네비게이션 (월 이동 버튼 등) */
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

  /* 요일 라벨 */
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

  /* 날짜 타일 */
  .react-calendar__tile {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-radius: 50%; /* 원형 */
    background: transparent;
    color: #333;

    &:enabled:hover,
    &:enabled:focus {
      background-color: #e0e0e0;
      color: #333;
    }
  }

  /* 현재 날짜 */
  .react-calendar__tile--now {
    background: #eee;
    color: #333;
  }

  /* 선택된 날짜 (커스텀 테마 색상 적용) */
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
  overflow-y: auto; /* 시간 슬롯이 많으면 스크롤 */
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-top: 10px;
`;

const TimeSlot = styled.div`
  padding: 10px 0;
  background-color: white;
  border: 1px solid ${(props) => (props.$selected ? "#2F6162" : "#ddd")};
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => (props.$selected ? "#2F6162" : "#333")};
  font-weight: ${(props) => (props.$selected ? "bold" : "normal")};

  &:hover {
    border-color: #2f6162;
  }
`;

/* 신청자 정보 박스 */
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

/* 상담 내용 입력창 */
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

/* Footer */
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

// --- Main Component ---
const ConsultationModal = ({ onClose }) => {
  const [consultType, setConsultType] = useState("subscription");
  const [selectedDate, setSelectedDate] = useState(new Date()); // react-calendar는 Date 객체 사용
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    phone: "",
    content: "",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(""); // 날짜 변경 시 시간 초기화
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // 날짜 포맷팅 (YYYY-MM-DD)
    const formattedDate = selectedDate.toISOString().split("T")[0];

    alert(`상담 예약 완료!\n날짜: ${formattedDate}\n시간: ${selectedTime}`);
    console.log({
      consultType,
      date: formattedDate,
      time: selectedTime,
      ...formData,
    });
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer>
        <InnerWrapper>
          <SectionTitle>상담 예약</SectionTitle>

          {/* 1. 제품 정보 */}
          <div>
            <SubTitle>제품 정보</SubTitle>
            <ProductBox>
              <ProductImg src="https://via.placeholder.com/100" alt="Product" />
              <ProductInfoText>
                <h4>LG전자 스탠바이미</h4>
                <span>27ART10AKPL</span>
              </ProductInfoText>
            </ProductBox>
          </div>

          {/* 2. 상담 메뉴 */}
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

          {/* 3. 상담 희망 일시 (react-calendar 적용) */}
          <div>
            <SubTitle>상담 희망 일시</SubTitle>
            <DateTimeWrapper>
              {/* 왼쪽: 라이브러리 캘린더 */}
              <CalendarWrapper>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  formatDay={(locale, date) => date.getDate()} // 날짜에 '일' 제거하고 숫자만 표시
                  calendarType="gregory" // 일요일부터 시작
                  showNeighboringMonth={false} // 이전/다음 달 날짜 숨기기 (깔끔하게)
                  next2Label={null} // 년도 이동 버튼 숨기기
                  prev2Label={null}
                />
              </CalendarWrapper>

              {/* 오른쪽: 시간 선택 */}
              <TimeSelectionBox>
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
                  {TIME_SLOTS_AM.map((time) => (
                    <TimeSlot
                      key={time}
                      $selected={selectedTime === time}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </TimeSlot>
                  ))}
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
                  {TIME_SLOTS_PM.map((time) => (
                    <TimeSlot
                      key={time}
                      $selected={selectedTime === time}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </TimeSlot>
                  ))}
                </TimeGrid>
              </TimeSelectionBox>
            </DateTimeWrapper>
          </div>

          {/* 4. 신청자 정보 */}
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

          {/* 5. 상담 내용 입력 */}
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
