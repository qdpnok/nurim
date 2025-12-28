// components/Support/HelpSection.js
import React, { useState } from "react";
import styled from "styled-components";
import HelpModal from "../Modal/HelpModal"; // 분리한 모달 임포트

const Container = styled.div`
  width: 1440px;
  height: 880px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: normal;
  margin-bottom: 14.5px;
  color: #101828;
`;

const SubText = styled.p`
  font-size: 16px;
  color: #4a5565;
  margin-bottom: 45px;
`;

const GridBox = styled.div`
  width: 1240px;
  height: 715px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
`;

const Card = styled.div`
  background-color: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 23px 21px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 20px;
  color: #000;
`;

const CardSubText = styled.p`
  width: 270px;
  font-size: 14px;
  font-weight: normal;
  white-space: pre-line;
  color: #4a5565;
  margin-bottom: 35px;
`;

const CardLabel = styled.p`
  font-size: 12px;
  color: #364153;
  margin-bottom: 13px;
`;

const CardContent = styled.ul`
  font-size: 12px;
  color: #2f6364;
  line-height: 2.6;
  list-style: none;
  padding: 0;

  li {
    cursor: pointer;
    &:hover {
      color: #2f6364;
      text-decoration: underline;
    }
  }
`;

const HelpSection = () => {
  const [modalData, setModalData] = useState(null); // 모달에 띄울 데이터 상태

  // 데이터 구조를 { question, answer } 형태로 확장
  const helpData = [
    {
      title: "계정 및 인증 (Account & Auth)",
      sub: "회원가입, 로그인 문제 해결 및 개인 프로필 설정을 관리할 수 있습니다.",
      items: [
        {
          q: "회원가입은 어떻게 하나요?",
          a: "홈페이지 우측 상단의 [Sign Up] 버튼을 클릭하신 후, 이메일 유효성 검사 및 인증을 거쳐 아이디, 성함, 연락처를 입력하고 비밀번호를 설정하면 가입이 완료됩니다.",
        },
        {
          q: "비밀번호를 잊어버렸어요.",
          a: "로그인 화면 하단의 '비밀번호 찾기'를 통해 이메일 인증 후 재설정하실 수 있습니다.",
        },
        {
          q: "프로필 정보는 어떻게 수정하나요?",
          a: "로그인 후 마이페이지 > 프로필 관리 메뉴에서 수정 가능합니다.",
        },
      ],
    },
    {
      title: "구독 및 구매 서비스 (Service Guide)",
      sub: "누림의 핵심인 구독 모델과 일반 구매 서비스 이용 방법을 안내합니다.",
      items: [
        {
          q: "결제 구독과 구매의 차이는 무엇인가요?",
          a: "구독은 월 이용료를 납부하며 서비스를 이용하는 방식이고, 구매는 제품을 일시불 또는 할부로 소유하는 방식입니다.",
        },
        {
          q: "구독 중인 제품을 인수한 후 소유할 수 있나요?",
          a: "네, 계약 기간 종료 후 소유권 이전 신청을 통해 소유하실 수 있습니다.",
        },
        {
          q: "월 구독료 결제 방식이 궁금해요.",
          a: "등록하신 신용카드 또는 계좌 자동이체를 통해 매월 정해진 날짜에 결제됩니다.",
        },
      ],
    },
    {
      title: "배송 및 설치 (Logistics)",
      sub: "주문하신 제품의 배송 일정 확인 및 기사님 방문설치 프로세스를 확인하세요.",
      items: [
        {
          q: "배송지 변경은 어떻게 하나요?",
          a: "배송 시작 전이라면 마이페이지 > 주문내역에서 변경 가능하며, 배송 중에는 고객센터로 문의 바랍니다.",
        },
        {
          q: "전문 기사님 설치는 반드시 필요한가요?",
          a: "네, 가전제품 특성상 안전한 사용을 위해 전문 기사님의 설치가 필수입니다.",
        },
        {
          q: "실시간 배송 상태는 어디서 조회하나요?",
          a: "마이페이지 > 주문내역 또는 알림톡을 통해 확인하실 수 있습니다.",
        },
      ],
    },
    {
      title: "사후 관리 및 AS (Care & AS)",
      sub: "제품 고장 시 수리 접수 방법 및 이전 설치 등 사후 관리 서비스를 지원합니다.",
      items: [
        {
          q: "사용 중 고장이 났을 때 AS 신청 방법은?",
          a: "고객센터(1588-XXXX) 또는 홈페이지 AS 접수 메뉴를 통해 신청 가능합니다.",
        },
        {
          q: "이전 설치 시 발생하는 비용이 궁금해요.",
          a: "이전 설치 거리에 따라 비용이 상이하므로 고객센터 상담이 필요합니다.",
        },
        {
          q: "무상 AS 보증 범위는 어디까지인가요?",
          a: "고객 과실이 아닌 제품 자체 결함의 경우 구독 기간 내 무상 AS가 지원됩니다.",
        },
      ],
    },
    {
      title: "게시물 및 커뮤니티 (Reviews & QnA)",
      sub: "리뷰 작성 가이드 및 1:1 문의를 통한 맞춤 상담 이용 방법을 확인하실 수 있습니다.",
      items: [
        {
          q: "리뷰 작성 시 유의사항이나 제한 사항이 있나요?",
          a: "욕설, 비방, 광고성 글은 통보 없이 삭제될 수 있습니다.",
        },
        {
          q: "비공개 문의글은 어떻게 작성하나요?",
          a: "1:1 문의 작성 시 '비밀글' 체크박스를 선택하시면 됩니다.",
        },
        {
          q: "작성한 리뷰가 보이지 않는 이유는 무엇인가요?",
          a: "운영 정책 위반으로 블라인드 처리되었거나 시스템 반영 시간이 소요될 수 있습니다.",
        },
      ],
    },
    {
      title: "결제 및 환불 (Billing & Refund)",
      sub: "결제 수단 관리, 구독 중도 해지에 따른 위약금 및 환불 규정을 안내합니다.",
      items: [
        {
          q: "등록된 결제 카드는 어떻게 변경하나요?",
          a: "마이페이지 > 결제 수단 관리에서 변경하실 수 있습니다.",
        },
        {
          q: "중도 해지 시 발생하는 위약금 산정 기준은?",
          a: "잔여 계약 기간 및 제품 종류에 따라 위약금이 다르며, 상세 약관을 참조해주세요.",
        },
        {
          q: "결제 영수증이나 전표 발행이 가능한가요?",
          a: "네, 마이페이지 > 결제 내역에서 영수증 출력이 가능합니다.",
        },
      ],
    },
  ];

  const handleOpenModal = (q, a) => {
    setModalData({ title: q, answer: a });
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <Container>
      <Title>누림 도움말</Title>
      <SubText>카테고리별로 정리 된 답변을 찾아보세요.</SubText>
      <GridBox>
        {helpData.map((data, idx) => (
          <Card key={idx}>
            <CardTitle>{data.title}</CardTitle>
            <CardSubText>{data.sub}</CardSubText>
            <CardLabel>Top Questions:</CardLabel>
            <CardContent>
              {data.items.map((item, i) => (
                <li key={i} onClick={() => handleOpenModal(item.q, item.a)}>
                  {item.q}
                </li>
              ))}
            </CardContent>
          </Card>
        ))}
      </GridBox>

      {/* 모달 렌더링 */}
      {modalData && (
        <HelpModal
          title={modalData.title}
          answer={modalData.answer}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default HelpSection;
