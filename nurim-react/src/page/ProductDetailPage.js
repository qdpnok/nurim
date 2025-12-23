import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// 컴포넌트 import (기존에 만드신 스펙 테이블 재사용)
import ProductSpecTable from "./components/Sub/ProductSpecTable";

// 아이콘 (필요시 설치: npm install react-icons)
import { AiOutlineHeart, AiFillStar } from "react-icons/ai";

// --- Styled Components (요청하신 사이즈 적용) ---

const Container = styled.div`
  width: 1240px; /* 전체 기준 너비 */
  margin: 0 auto;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between; /* 610 + 590 + 여백 = 1240 근사치 */
  margin-top: 60px;
  margin-bottom: 80px;
`;

// 상품 이미지 박스 610x593
const ImageBox = styled.div`
  width: 610px;
  height: 593px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* or contain */
  }
`;

// 상품 설명 박스 590x598
const InfoBox = styled.div`
  width: 590px;
  height: 598px; /* 요청하신 높이 */
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;

  .header {
    h2 {
      font-size: 32px;
      margin-bottom: 10px;
      font-weight: 700;
    }
    .sub-info {
      display: flex;
      gap: 15px;
      color: #888;
      align-items: center;
      .rating {
        color: #333;
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }

  .option-area {
    margin: 30px 0;
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .period-buttons {
      display: flex;
      gap: 10px;
    }
  }

  .price-area {
    margin-top: auto;
    margin-bottom: 30px;
    background-color: #f8f8f8;
    padding: 20px;
    border-radius: 10px;

    .row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 16px;
      &.total {
        margin-top: 15px;
        border-top: 1px solid #ddd;
        padding-top: 15px;
        font-weight: bold;
        font-size: 20px;
        color: #356469;
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
    }
    .consult {
      background-color: #eee;
      color: #333;
    }
    .subscribe {
      background-color: #356469;
      color: #fff;
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eee;
  margin: 20px 0;
`;

const PeriodBtn = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.$active ? "#356469" : "#ddd")};
  background-color: ${(props) => (props.$active ? "#fff" : "#f9f9f9")};
  color: ${(props) => (props.$active ? "#356469" : "#888")};
  font-weight: bold;
  cursor: pointer;
`;

// 추천제품박스 1240x467
const RecommendSection = styled.div`
  width: 1240px;
  height: 467px;
  margin-bottom: 80px;
  /* background-color: #f0f0f0; debug용 */

  h3 {
    font-size: 24px;
    margin-bottom: 30px;
    text-align: left;
  }

  .recommend-list {
    display: flex;
    justify-content: space-between;
    .rec-item {
      width: 290px;
      height: 380px; /* 내부 요소 크기 */
      /* background-color: #ddd; */
      border: 1px solid #eee;
      border-radius: 10px;

      .rec-img {
        width: 100%;
        height: 250px;
        background-color: #eee;
      }
      p {
        margin-top: 20px;
        font-weight: bold;
      }
    }
  }
`;

// Product Details, Reviews 박스 1240x1081
const DetailReviewSection = styled.div`
  width: 1240px;
  height: 1081px; /* 요청하신 높이 */
  margin-bottom: 80px;
  border-top: 2px solid #333;

  .tabs {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin: 40px 0;
  }

  .content-area {
    width: 100%;
    height: 900px;
    /* background-color: #fcfcfc; */
  }
`;

const TabBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.$active ? "#000" : "#ccc")};
  border-bottom: ${(props) => (props.$active ? "3px solid #000" : "none")};
  padding-bottom: 5px;
  cursor: pointer;
`;

// Q&A, 고객지원 박스 1240x1247
const SupportSection = styled.div`
  width: 1240px;
  height: 1247px; /* 요청하신 높이 */
  background-color: #fafafa;
  padding: 60px;
  box-sizing: border-box;
  text-align: left;
  border-radius: 20px;

  h3 {
    font-size: 24px;
    margin-bottom: 40px;
  }

  .support-content {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
`;

const ProductDetailPage = () => {
  const { id } = useParams(); // URL에서 상품 ID(num) 가져오기
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details"); // details | reviews

  // 옵션 선택 상태
  const [selectedPeriod, setSelectedPeriod] = useState(36); // 기본 36개월

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        // 백엔드 상세 조회 API 호출
        const response = await axios.get(
          `http://localhost:8222/api/product/detail/${id}`
        );
        setProduct(response.data);
      } catch (e) {
        console.error("상세 정보 로딩 실패:", e);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  if (loading) return <Container>Loading...</Container>;
  if (!product) return <Container>상품 정보가 없습니다.</Container>;

  return (
    <Container>
      {/* 1. 상단 섹션: 이미지 + 상품 설명 */}
      <TopSection>
        {/* 상품 이미지 박스 (610x593) */}
        <ImageBox>
          {/* 실제 이미지가 public 폴더나 서버에 있다면 경로 수정 필요 */}
          {/* 예: src={`/img/${product.img}`} */}
          <img
            src={product.img || "https://via.placeholder.com/610x593"}
            alt={product.name}
          />
        </ImageBox>

        {/* 상품 설명 박스 (590x598) */}
        <InfoBox>
          <div className="header">
            <h2>{product.name}</h2>
            <div className="sub-info">
              <span>{product.serialNum || "MODEL-NUM-001"}</span>
              <span className="rating">
                <AiFillStar color="#FFD700" /> 4.5 / 5
              </span>
            </div>
          </div>

          <Divider />

          <div className="option-area">
            <label>계약 기간</label>
            <div className="period-buttons">
              <PeriodBtn
                $active={selectedPeriod === 36}
                onClick={() => setSelectedPeriod(36)}
              >
                36 개월
              </PeriodBtn>
              <PeriodBtn
                $active={selectedPeriod === 48}
                onClick={() => setSelectedPeriod(48)}
              >
                48 개월
              </PeriodBtn>
              <PeriodBtn
                $active={selectedPeriod === 60}
                onClick={() => setSelectedPeriod(60)}
              >
                60 개월
              </PeriodBtn>
            </div>
          </div>

          <div className="price-area">
            <div className="row">
              <span>월 별 구독료</span>
              {/* 가격 로직은 DB 데이터에 맞게 계산 필요 */}
              <span className="price">
                {Number(product.price / selectedPeriod).toLocaleString()}원
              </span>
            </div>
            <div className="row total">
              <span>총 렌탈료</span>
              <span className="price-total">
                {product.price.toLocaleString()}원
              </span>
            </div>
          </div>

          <div className="btn-group">
            <button className="cart">장바구니</button>
            <button className="consult">구독 상담 예약</button>
            <button className="subscribe">구독 하기</button>
          </div>
        </InfoBox>
      </TopSection>

      {/* 2. 추천 제품 박스 (1240x467) */}
      <RecommendSection>
        <h3>누림 회원님을 위한 추천 제품</h3>
        <div className="recommend-list">
          {/* 추후 추천 제품 API 연동 후 map으로 뿌리기 */}
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="rec-item">
              <div className="rec-img"></div>
              <p>추천 상품 {item}</p>
            </div>
          ))}
        </div>
      </RecommendSection>

      {/* 3. 상세정보 & 리뷰 탭 박스 (1240x1081) */}
      <DetailReviewSection>
        <div className="tabs">
          <TabBtn
            $active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
          >
            Product Details
          </TabBtn>
          <TabBtn
            $active={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (45)
          </TabBtn>
        </div>

        <div className="content-area">
          {activeTab === "details" ? (
            // 기존에 가지고 계신 ProductSpecTable 컴포넌트 사용
            // DB에서 받아온 spec 문자열을 파싱해서 넘겨줘야 할 수도 있음
            <div className="spec-container">
              <h3>상품 상세 스펙</h3>
              <ProductSpecTable data={product.spec || {}} />
            </div>
          ) : (
            <div className="reviews-container">
              <h3>상품 리뷰</h3>
              {/* 리뷰 컴포넌트 or 리스트 */}
              <p>리뷰 내용이 들어갈 자리입니다.</p>
            </div>
          )}
        </div>
      </DetailReviewSection>

      {/* 4. Q&A, 고객지원 박스 (1240x1247) */}
      <SupportSection>
        <h3>Q&A / 고객 지원</h3>
        <div className="support-content">
          <div className="qna-box">
            <h4>자주 묻는 질문</h4>
            <ul>
              <li>Q. 배송은 얼마나 걸리나요?</li>
              <li>Q. A/S 신청은 어떻게 하나요?</li>
            </ul>
          </div>
          <div className="notice-box">
            <h4>구매 시 유의사항</h4>
            <p>고객의 실수로 인한 파손은 책임지지 않습니다...</p>
          </div>
        </div>
      </SupportSection>
    </Container>
  );
};

export default ProductDetailPage;
