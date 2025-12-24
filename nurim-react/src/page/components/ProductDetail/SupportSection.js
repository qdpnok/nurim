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
          padding-left: 15px;
          margin-bottom: 20px;
          color: #555;
          font-size: 14px;
          line-height: 1.8;
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
        }
      }
    }
  }
`;

const SupportSection = () => {
  const [activeInfoTab, setActiveInfoTab] = useState("delivery");

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
            제품 설치 및 사용 방법 등에 대한 안내이며, 제품 구입 시 함께
            제공됩니다.
          </p>
        </div>
        <div className="btn-group">
          <button>
            <AiOutlineDownload style={{ marginRight: "5px" }} /> 다운로드 하기
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
                <strong>배송지역: 전국</strong> (단, 일부 도서산간지역의 경우
                배송이 제한될 수 있습니다.)
              </li>
              <li>
                <strong>배송비: 무료배송</strong>
                <br />
                <span className="sub-text">
                  * 단, 도서산간지역의 경우 추가 운임 및 추가 설치비가 발생할 수
                  있으며, 추가비용이 발생할 경우 배송전 안내드립니다.
                </span>
              </li>
              <li>
                <strong>
                  배송 시 폐가전 수거(동일 장소에 한함) 및 일반 사다리차는 무상
                  지원됩니다.
                </strong>
                <br />
                <span className="sub-text">
                  * 단, 일반 사다리차 사용 불가할 경우 스카이차 비용은 유상
                  청구됩니다.
                </span>
              </li>
              <li>
                <strong>
                  재고 부족/단종/생산 지연 등의 사유로 배송일이 변경될 수
                  있으며, 지연 발생 시 사전 연락드립니다.
                </strong>
                <ul>
                  <li>
                    도서산간지역(제주도 포함)의 경우 기상상황 등의 사유로
                    배송일이 지연될 수 있습니다.
                  </li>
                  <li>
                    주문 완료 이후, 배송지 변경이 필요한 경우 재주문하여 주시기
                    바랍니다.
                  </li>
                </ul>
              </li>
              <li>
                배송 희망일의 경우 현재 기준 배송 납기 예정일이며, 생산 일정
                변경 등으로 배송 일정은 변경될 수 있습니다.
              </li>
              <li>
                <strong>
                  결제 완료 후 배송지 변경이 어려우니, 주문 시 정확한 주소지
                  입력을 바랍니다.
                </strong>
              </li>
              <li>
                <strong>
                  배송 방식: 제품 특성에 따라 전문기사 설치나 택배로 배송됩니다.
                </strong>
                <ul>
                  <li>
                    전문기사 설치 배송은 당일 오전에 설치기사와 배송 일자를
                    조정할 수 있습니다.
                  </li>
                  <li>
                    <strong>
                      최초 배송 안내일로부터 8일 이상 인수 연기 시 자동 주문
                      취소됩니다.
                    </strong>{" "}
                    (기사와 협의하였더라도 동일 적용)
                  </li>
                </ul>
              </li>
              <li>
                제품 구매 후 설치를 동반하지 않는 단순 배송 희망건(해외 반출,
                타인 양도, 재판매 목적 등)은 진행 지원이 어렵습니다. (관련 문의:{" "}
                <strong>1544-7777</strong>)
              </li>
              <li>
                배송 전 알림톡으로 예정일 확인 및 일자 조정이 가능하며, 최종
                확정일은 알림톡 또는 설치기사가 안내드립니다.
              </li>
              <li>
                <strong>
                  주문일로부터 90일 이상 제품 설치를 연기하실 경우, 제품 노후화
                  등 고객 피해 예방을 위해 문자 안내 후 주문 취소됩니다.
                </strong>
              </li>
              <li>
                인수고객과 통화 불가 및 수령지 주소가 불명확할 경우 배송이
                지연될 수 있습니다.
              </li>
            </ul>
          )}

          {activeInfoTab === "install" && (
            <ul>
              <li>
                <strong>
                  전문기사 설치 배송의 경우 설치기사가 무료로 직접 설치해
                  드립니다.
                </strong>
                <br />
                <span className="sub-text">
                  * 단, 설치환경에 따라 추가 설치비용이 발생할 수 있습니다.
                </span>
              </li>
              <li>
                신규 설치할 위치에 설치된 자사 제품을 다른 위치로 이동하시는
                경우 이전 설치 유상 접수 및 자재 구매가 필요할 수 있습니다.
                <br />
                <span className="sub-text">
                  * 관련하여 자세한 사항은{" "}
                  <strong>LG전자 고객센터 1544-7777</strong>로 문의 바랍니다.
                </span>
              </li>
              <li>
                <strong>
                  설치 상품의 경우 주문 시 설치 환경을 꼭 체크하여 주십시오.
                </strong>
                <ul>
                  <li>
                    <strong>TV :</strong> 벽걸이 설치가 불가한 벽면재질은 아닌지
                    확인해 주세요. 가벽 또는 보강이 불가한 경우 설치가 불가할 수
                    있으며, 방문 후 취소 시 재주문이 필요할 수 있습니다.
                  </li>
                  <li>
                    <strong>냉장고/세탁기/건조기 :</strong> 설치 공간, 출입문
                    너비, 제품 사이즈를 주문 전에 반드시 확인해 주세요.
                  </li>
                  <li>
                    <strong>에어컨 :</strong> 설치 환경이 일반형인지 매립형인지
                    주문 전에 확인해 주세요.
                  </li>
                  <li>
                    <strong>실링팬 :</strong> 구매 전 반드시 설치 관련 상담 및
                    사전답사를 완료해 주세요.
                  </li>
                </ul>
              </li>
              <li>
                에어컨 설치 시 기본 설치비는 포함되어 있으나, 별도로 추가 설치
                비용이 발생할 수 있습니다. (
                <strong>추가 비용은 현장에서 납부 가능합니다.</strong>)
              </li>
              <li>
                '22년 4월 이후 설치되는 스탠드, 벽걸이 에어컨 및 냉난방기 전
                모델의{" "}
                <strong>
                  일반배관 재질은 알루미늄이며, 매립배관은 구리 재질
                </strong>
                입니다.
              </li>
              <li>
                <strong>
                  가정용 용도로만 설치 가능하며, 상업용 설치는 불가합니다.
                </strong>
                <ul>
                  <li>
                    식기세척기의 경우 영업, 산업, 연구/실험 용도(음식점, 카페,
                    연구소 등)로 사용 시 설치가 불가합니다.
                  </li>
                  <li>
                    <strong>무상 보증 기간 50% 단축 적용 대상 :</strong> 일반
                    가정과 유사하나 불특정 다수가 공용으로 사용하는 경우
                    <br />
                    <span className="sub-text">
                      (게스트하우스, 어린이집, 회사 탕비실, 기숙사 공용 공간,
                      노인정, 공방 등)
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          )}

          {activeInfoTab === "return" && (
            <ul>
              <li>
                <strong>
                  고객 인수 완료 후 단순변심/감성불량에 의한 반품은 불가합니다.
                </strong>
                <br />
                <span className="sub-text">
                  * 고객인수완료란 : 제품을 설치/시운전하고 외관이 이상없음을
                  고객과 상호확인하여 고객으로부터 인수완료 서명을 받은 이후의
                  상태를 말함.
                </span>
              </li>
              <li>
                택배 등 고객인수완료 전 제품의 경우에는, 제품을 수령한 날로부터
                7일 이내에는 반품 처리가 가능합니다.
              </li>
              <li>
                <strong>
                  택배로 배송되는 제품에 대해서는 하기 사항을 사전에 꼭
                  확인바랍니다.
                </strong>
                <ul>
                  <li>
                    소모품 (필터 등)의 경우, 전 제품이 무료배송이며 택배
                    반품시에도 무상으로 진행됩니다. 수령하신 소모품에 불량이
                    있는 경우에도, 택배로 반품 접수를 진행하시면 됩니다.
                  </li>
                  <li>
                    소모품을 제외한 일반 제품의 경우, 변심으로 인한 반품시에는
                    택배비는 고객 부담이며, 고객께서 직접 택배사에 반품 접수를
                    진행하셔야 합니다.
                  </li>
                  <li>
                    일반 제품 불량의 경우, 가까운 서비스센터를 방문하시어 불량
                    판정을 받으셔야 하며, LG전자 기사가 내방하여 불량 판정을
                    해드리지는 않으니 고객님의 양해 바랍니다.
                  </li>
                </ul>
              </li>
              <li>
                <strong>다음 경우에는 반품/교환이 불가합니다.</strong>
                <ul>
                  <li>
                    고객에게 책임이 있는 사유로 재화등이 멸실되거나 훼손된 경우.
                    다만, 재화등의 내용을 확인하기 위하여 포장 등을 훼손한
                    경우는 제외합니다.
                  </li>
                  <li>
                    고객의 사용 또는 일부 소비로 재화등의 가치가 현저히 감소한
                    경우
                  </li>
                  <li>
                    시간이 지나 다시 판매하기 곤란할 정도로 재화등의 가치가
                    현저히 감소한 경우
                  </li>
                </ul>
              </li>
              <li>
                반품/교환시 고객의 귀책사유로 수거가 지연될 경우에는 반품이
                제한될 수 있습니다.
              </li>
              <li>
                제조사 사정(신모델 출시 등) 및 부품 가격 변동 등에 의해 가격이
                변동될 수 있으며, 이로 인한 반품 및 가격 보상을 불가합니다.
              </li>
              <li>
                본품을 반품할 경우 사은품도 반품 처리되며, 사은품을 사용한 경우
                해당 비용 고객 부담 후 본품만 반품 처리 가능합니다.
              </li>
              <li>
                반품/교환 관련 자세한 사항은{" "}
                <strong>고객센터(1544-7777)</strong>로 연락바랍니다.
              </li>
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
};

export default SupportSection;
