import React from "react";
import styled from "styled-components";
import { PageTitle, PageSubTitle } from "../../styles/AdminStyles";
import { FaLock, FaCheckCircle, FaEdit } from "react-icons/fa";

const qnaData = [
  {
    id: 1,
    title:
      "LG 스탠바이미 구독 중인데 이사 갈 때 이전 설치 신청은 어떻게 하나요?",
    user: "nurim_user",
    date: "2025. 1. 26",
    content:
      "다음 달에 이사를 가야 하는데, 현재 거실에서 사용 중인 스탠바이미 제품을...",
    status: "answered", // 답변 완료
    answer:
      "안녕하세요, 고객님! 누림 고객센터입니다. 이전 설치는 마이페이지 내...",
    isSecret: false,
  },
  {
    id: 2,
    title: "결제 카드를 변경하고 싶어요.",
    user: "user789",
    date: "2025. 1. 26",
    content: "비밀글 입니다.",
    status: "waiting", // 답변 대기
    answer: null,
    isSecret: true,
  },
];

const AdminQna = () => {
  return (
    <>
      <PageTitle>QnA 관리</PageTitle>
      <PageSubTitle>고객의 1:1 문의에 답변을 등록하세요.</PageSubTitle>

      <QnaList>
        {qnaData.map((item) => (
          <QnaCard key={item.id}>
            <div className="header">
              <div className="title-area">
                {item.isSecret && <FaLock className="lock-icon" />}
                <h3>{item.title}</h3>
              </div>
              <button className="edit-btn">
                수정 <FaEdit />
              </button>
            </div>
            <div className="meta">
              <span>{item.user}</span>
              <span>{item.date}</span>
            </div>
            <div className="content">{item.content}</div>

            {/* 답변 영역 */}
            {item.status === "answered" ? (
              <AnswerBox className="completed">
                <div className="ans-header">
                  <FaCheckCircle /> Answer from Support Team:
                </div>
                <p>{item.answer}</p>
              </AnswerBox>
            ) : (
              <AnswerBox className="waiting">
                <textarea placeholder="답변 내용을 입력해 주세요..." />
                <button>답변 등록</button>
              </AnswerBox>
            )}
          </QnaCard>
        ))}
      </QnaList>
    </>
  );
};

export default AdminQna;

const QnaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const QnaCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;

    .title-area {
      display: flex;
      align-items: center;
      gap: 8px;
      h3 {
        font-size: 18px;
        margin: 0;
        color: #333;
      }
      .lock-icon {
        color: #888;
        font-size: 14px;
      }
    }
    .edit-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #888;
    }
  }

  .meta {
    font-size: 13px;
    color: #999;
    margin-bottom: 20px;
    span {
      margin-right: 15px;
    }
  }
  .content {
    font-size: 15px;
    color: #555;
    margin-bottom: 20px;
    line-height: 1.5;
  }
`;

const AnswerBox = styled.div`
  border-radius: 8px;
  padding: 20px;

  &.completed {
    background: #e8f5e9;
    border: 1px solid #c8e6c9;
    .ans-header {
      color: #2e7d32;
      font-weight: bold;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    p {
      margin: 0;
      color: #333;
      font-size: 14px;
    }
  }

  &.waiting {
    background: #f9f9f9;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    gap: 10px;

    textarea {
      width: 100%;
      height: 80px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: none;
    }
    button {
      align-self: flex-end;
      padding: 8px 20px;
      background: #4a7c75;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
`;
