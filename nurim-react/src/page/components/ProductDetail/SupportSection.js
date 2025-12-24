import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineDownload } from "react-icons/ai";

const Section = styled.div`
  width: 1240px;
  margin-top: 50px;
  text-align: left;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-top: 2px solid #333;
    padding-top: 40px;

    h3 {
      font-size: 24px;
      font-weight: bold;
    }

    .center-btn {
      padding: 10px 20px;
      background-color: #000;
      color: #fff;
      border-radius: 30px;
      font-weight: bold;
      border: none;
      cursor: pointer;
    }
  }

  .support-box {
    background-color: #f7f7f7;
    padding: 30px 40px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .text-group {
      h4 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      p {
        color: #666;
        font-size: 14px;
      }
      .link {
        color: #666;
        font-size: 13px;
        margin-top: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .btn-group {
      display: flex;
      gap: 10px;
      button {
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 15px 30px;
        font-weight: bold;
        font-size: 15px;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background-color: #eee;
        }
      }
    }
  }

  .caution-area {
    margin-top: 80px;
    padding-top: 0;

    .caution-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      h4 {
        font-size: 20px;
        font-weight: bold;
        color: #000;
      }

      .info-tabs {
        display: flex;
        align-items: center;
        gap: 15px;

        button {
          background: none;
          border: none;
          font-size: 14px;
          cursor: pointer;
          color: #999;
          font-weight: 400;

          &.active {
            color: #000;
            font-weight: bold;
            text-decoration: underline;
            text-underline-position: under;
          }
        }
        span {
          color: #ddd;
          font-size: 12px;
        }
      }
    }

    .info-content {
      border-top: 1px solid #eee;
      padding-top: 30px;
      ul {
        list-style: none;
        padding-left: 0;
        li {
          position: relative;
          padding-left: 12px;
          margin-bottom: 12px;
          color: #555;
          font-size: 14px;
          line-height: 1.6;
          &::before {
            content: "•";
            position: absolute;
            left: 0;
            color: #888;
          }
          strong {
            font-weight: 600;
            color: #333;
          }
          ul {
            margin-top: 5px;
            li {
              padding-left: 10px;
              &::before {
                content: "-";
              }
            }
          }
        }
      }
    }
  }
`;

const SupportSection = () => {
  const [activeInfoTab, setActiveInfoTab] = useState("return");

  return (
    <Section>
      <div className="section-header">
        <h3>고객 지원</h3>
        <button className="center-btn">고객 지원 센터 바로가기</button>
      </div>

      <div className="support-box">
        <div className="text-group">
          <h4>제품에 대한 지원이 필요하신가요?</h4>
          <div className="link">자세히 &gt;</div>
        </div>
        <div className="btn-group">
          <button>문제 해결 Q&A</button>
          <button>고객 지원 상담</button>
        </div>
      </div>

      <div className="support-box">
        <div className="text-group">
          <h4>제품 사용 설명서</h4>
          <p>
            제품 설치 및 사용 방법 등에 대한 안내 이며, 제품 구입 시 함께 제공
            됩니다.
          </p>
        </div>
        <div className="btn-group">
          <button>
            <AiOutlineDownload /> 다운로드 하기
          </button>
        </div>
      </div>

      <div className="caution-area">
        <div className="caution-header">
          <h4>구매 시 유의사항</h4>
          <div className="info-tabs">
            <button
              className={activeInfoTab === "delivery" ? "active" : ""}
              onClick={() => setActiveInfoTab("delivery")}
            >
              배송안내
            </button>
            <span>|</span>
            <button
              className={activeInfoTab === "return" ? "active" : ""}
              onClick={() => setActiveInfoTab("return")}
            >
              반품/교환/AS
            </button>
            <span>|</span>
            <button
              className={activeInfoTab === "install" ? "active" : ""}
              onClick={() => setActiveInfoTab("install")}
            >
              설치 안내
            </button>
          </div>
        </div>

        <div className="info-content">
          {activeInfoTab === "delivery" && (
            <ul>
              <li>
                <strong>배송지역:</strong> 전국 (단, 일부 도서산간지역의 경우
                배송이 제한될 수 있습니다.)
              </li>
              <li>
                <strong>배송비:</strong> 무료배송 (단, 도서산간지역의 경우 추가
                운임 및 추가 설치비가 발생할 수 있으며...)
              </li>
              {/* 내용 생략 (기존과 동일) */}
            </ul>
          )}
          {activeInfoTab === "return" && (
            <ul>
              <li>
                고객 인수 완료 후 단순변심/감성불량에 의한 반품은 불가합니다.
              </li>
              {/* 내용 생략 (기존과 동일) */}
            </ul>
          )}
          {activeInfoTab === "install" && (
            <ul>
              <li>
                전문기사 설치 배송의 경우 설치기사가 무료로 직접 설치해
                드립니다.
              </li>
              {/* 내용 생략 (기존과 동일) */}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
};

export default SupportSection;
