import React, { useState } from "react";
import styled from "styled-components";
import { PageTitle, PageSubTitle } from "../../styles/AdminStyles";
import { FaChevronDown, FaChevronUp, FaPen, FaTrash } from "react-icons/fa";

// 더미 데이터
const faqData = [
  {
    id: 1,
    category: "service",
    q: "구독 중도 해지가 가능한가요?",
    a: "네, 언제든 가능합니다. 다만 의무 사용 기간 내 해지 시 위약금이 발생합니다.",
  },
  {
    id: 2,
    category: "delivery",
    q: "배송비와 설치비는 따로 발생하나요?",
    a: "기본 설치비는 무료입니다. 사다리차 이용 등 특수 환경은 별도 비용이 발생합니다.",
  },
  {
    id: 3,
    category: "as",
    q: "사용 중 고장이 나면 어떻게 처리하나요?",
    a: "고객센터로 접수하시면 전문 기사가 방문하여 처리해 드립니다.",
  },
  {
    id: 4,
    category: "cancel",
    q: "반납 신청은 어떻게 하나요?",
    a: "마이페이지 > 내 구독 메뉴에서 신청 가능합니다.",
  },
];

const AdminFaq = () => {
  const [activeTab, setActiveTab] = useState("service");
  const [openId, setOpenId] = useState(null);

  const tabs = [
    { id: "service", label: "서비스 및 구독/구매" },
    { id: "delivery", label: "배송 및 설치" },
    { id: "as", label: "AS 및 관리" },
    { id: "cancel", label: "취소 및 반납" },
  ];

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredData = faqData.filter((item) => item.category === activeTab);

  return (
    <>
      <PageTitle>자주 묻는 질문 (FAQ) 관리</PageTitle>
      <PageSubTitle>카테고리별 질문을 등록하고 관리하세요.</PageSubTitle>

      {/* 탭 메뉴 */}
      <TabContainer>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabContainer>

      {/* FAQ 리스트 */}
      <FaqList>
        {filteredData.map((item) => (
          <FaqItem key={item.id} isOpen={openId === item.id}>
            <div className="question-row" onClick={() => toggleFaq(item.id)}>
              <span className="q-prefix">Q.</span>
              <span className="question-text">{item.q}</span>
              <div className="actions">
                <button className="edit-btn">
                  <FaPen /> 수정
                </button>
                <button className="del-btn">
                  <FaTrash /> 삭제
                </button>
                {openId === item.id ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
            {openId === item.id && (
              <div className="answer-row">
                <p>{item.a}</p>
              </div>
            )}
          </FaqItem>
        ))}
      </FaqList>
    </>
  );
};

export default AdminFaq;

// 스타일 컴포넌트 (해당 파일 내 혹은 AdminStyles.js로 이동 가능)
const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  background: #f0f0f0;
  padding: 5px;
  border-radius: 50px;
  width: fit-content;
`;

const TabButton = styled.button`
  padding: 10px 25px;
  border-radius: 40px;
  border: none;
  background: ${(props) => (props.active ? "#fff" : "transparent")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  box-shadow: ${(props) =>
    props.active ? "0 2px 5px rgba(0,0,0,0.1)" : "none"};
  cursor: pointer;
  transition: all 0.2s;
`;

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FaqItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  .question-row {
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;

    .q-prefix {
      font-weight: bold;
      color: #4a7c75;
      margin-right: 10px;
      font-size: 18px;
    }
    .question-text {
      flex: 1;
      font-weight: 500;
      font-size: 16px;
    }

    .actions {
      display: flex;
      gap: 10px;
      align-items: center;
      color: #888;

      button {
        background: none;
        border: 1px solid #ddd;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 4px;
        &:hover {
          background: #f5f5f5;
        }
      }
      .del-btn {
        color: #e74c3c;
        border-color: #fadbd8;
      }
    }
  }

  .answer-row {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
    color: #555;
    line-height: 1.5;
    background-color: #fafafa;
    padding: 20px;
    border-radius: 8px;
  }
`;
