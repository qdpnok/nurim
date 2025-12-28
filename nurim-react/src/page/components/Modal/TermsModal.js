import React, { useState } from "react";
import styled from "styled-components";

// 모달 배경
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 컨텐츠 박스 (동적 크기 조절)
const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  /* view 상태에 따라 크기 변경 */
  width: ${(props) => (props.$view === "main" ? "1268px" : "885px")};
  height: ${(props) => (props.$view === "main" ? "425px" : "642px")};
  box-sizing: border-box;
`;

// --- [메인 화면 스타일] ---
const MainTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 50px;
  width: 100%;
  text-align: left; /* 좌측 상단 정렬 */
  padding-left: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
  margin-bottom: auto; /* 버튼들을 위쪽으로 밀고 닫기 버튼을 아래로 */
`;

const SelectButton = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  color: #555;
  font-weight: 500;
  transition: 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  /* 화살표 */
  &::after {
    content: ">";
    font-size: 18px;
    color: #999;
  }
`;

// --- [상세 약관 화면 스타일] ---
const DetailTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const DetailSubTitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 40px;
  text-align: center;
`;

const TextContent = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto; /* 내용 길면 스크롤 */
  font-size: 13px;
  color: #444;
  line-height: 1.6;
  padding: 0 20px;
  margin-bottom: 30px;

  h4 {
    font-size: 14px;
    font-weight: bold;
    color: #222;
    margin-top: 20px;
    margin-bottom: 8px;
  }

  ul {
    padding-left: 15px;
    margin: 0;
  }

  li {
    margin-bottom: 5px;
    list-style-type: disc;
  }
`;

// 닫기 버튼 (공통)
const CloseButton = styled.button`
  background-color: #2f5d62;
  color: #fff;
  border: none;
  padding: 12px 60px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #244b4f;
  }
`;

const TermsModal = ({ onClose }) => {
  // view: 'main' (선택창) | 'review' (리뷰약관) | 'service' (서비스약관)
  const [view, setView] = useState("main");

  // 메인 화면 렌더링
  if (view === "main") {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent $view="main" onClick={(e) => e.stopPropagation()}>
          <MainTitle>약관 확인</MainTitle>

          <ButtonGroup>
            <SelectButton onClick={() => setView("review")}>
              리뷰 및 게시물 관리 약관
            </SelectButton>
            <SelectButton onClick={() => setView("service")}>
              서비스 이용 및 구독 약관
            </SelectButton>
          </ButtonGroup>

          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalContent>
      </ModalOverlay>
    );
  }

  // 리뷰 약관 화면
  if (view === "review") {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent $view="detail" onClick={(e) => e.stopPropagation()}>
          <DetailTitle>[리뷰 및 게시물 관리 약관]</DetailTitle>
          <DetailSubTitle>
            커뮤니티의 건전한 문명과 사용자의 저작권 보호를 위한 규정입니다.
          </DetailSubTitle>

          <TextContent>
            <h4>게시물 삭제 및 노출 제한 기준</h4>
            <ul>
              <li>
                상품에 기능이나 품질과 직접적인 관련이 없는 광고성 내용, 중복
                문구, 무의미한 텍스트가 포함된 경우 통보 없이 삭제될 수
                있습니다.
              </li>
              <li>
                특정 개인이나 단체를 향한 욕설, 비방, 명예훼손 등 미풍양속에
                어긋나는 부적절한 게시물은 관리자에 의해 즉시 파기됩니다.
              </li>
              <li>
                확인되지 않은 허위 사실을 유포하여 브랜드 이미지나 타 사용자의
                판단에 혼선을 주는 경우 게시가 제한됩니다.
              </li>
            </ul>

            <h4>개인정보 보호 및 보안 정책</h4>
            <ul>
              <li>
                작성자의 보안을 위해 게시물 본문 내에 이메일 주소, 휴대폰 번호,
                실거주지 등 민감한 개인정보를 입력하는 것을 엄격히 금지합니다.
              </li>
              <li>
                사용자가 주의사항을 어기고 개인정보를 직접 노출하여 발생하는
                도용, 스팸 등의 모든 피해에 대한 책임은 작성자 본인에게
                있습니다.
              </li>
            </ul>

            <h4>게시물 저작권 및 마케팅 활용 권한</h4>
            <ul>
              <li>
                회원이 작성한 리뷰 텍스트 및 첨부 사진의 저작권은 작성자
                본인에게 귀속됩니다.
              </li>
              <li>
                단, '누림'은 서비스 홍보 및 제품 상세 페이지 제작 등 마케팅
                목적으로 해당 게시물을 무상으로 복제, 수정, 배포하여 활용할 수
                있습니다.
              </li>
            </ul>
          </TextContent>

          {/* 닫기 버튼 누르면 모달 닫기 (이전으로 가고 싶으면 setView('main') 사용) */}
          <CloseButton onClick={() => setView("main")}>닫기</CloseButton>
        </ModalContent>
      </ModalOverlay>
    );
  }

  // 서비스 약관 화면
  if (view === "service") {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent $view="detail" onClick={(e) => e.stopPropagation()}>
          <DetailTitle>[서비스 이용 및 구독 약관]</DetailTitle>
          <DetailSubTitle>
            합리적인 구독 생활을 위한 결제 및 소유권 관련 필수 규정입니다.
          </DetailSubTitle>

          <TextContent>
            <h4>자동 결제 및 청구 시스템</h4>
            <ul>
              <li>
                월 이용 요금은 매월 시스템에 저장된 결제 예정일에 등록된 결제
                수단을 통해 자동으로 결제됩니다.
              </li>
              <li>
                결제 실패 시 재결제 시도가 이루어지며, 미납 시 서비스 이용이
                일시적으로 제한될 수 있습니다.
              </li>
            </ul>

            <h4>의무 사용 기간 및 중도 해지 위약금</h4>
            <ul>
              <li>
                구독 계약 시 약정한 의무 사용 기간 내에 해지를 요청할 경우, 잔여
                기간에 대한 위약금이 발생할 수 있습니다.
              </li>
              <li>
                위약금 및 정산 금액은 누림의 '반납 정산 로직'에 따라 제품의
                상태와 잔여 이용 기간을 고려하여 산출됩니다.
              </li>
            </ul>

            <h4>제품 소유권 귀속 및 인수 절차</h4>
            <ul>
              <li>
                구독 서비스 이용 중인 제품의 법적 소유권은 '누림'에 있으며,
                고객은 제품을 안전하게 관리하고 사용할 의무가 있습니다.
              </li>
              <li>
                사용자가 인수 신청을 접수하고 산정된 잔여 비용을 완납하면 제품의
                소유권은 고객님께 정식으로 이전됩니다.
              </li>
            </ul>
          </TextContent>

          <CloseButton onClick={() => setView("main")}>닫기</CloseButton>
        </ModalContent>
      </ModalOverlay>
    );
  }
};

export default TermsModal;
