import React from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import carticon from "../../../img/carticon.png"; // 경로 확인 필요

const Section = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  margin-bottom: 80px;
`;

const GallerySection = styled.div`
  width: 610px;
  height: 592px;
  display: flex;
  justify-content: space-between;
`;

const ThumbColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ThumbItem = styled.div`
  width: 152px;
  height: 187px;
  background-color: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MainImageItem = styled.div`
  width: 443px;
  height: 592px;
  background-color: #f9f9f9;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoBox = styled.div`
  width: 590px;
  height: 598px;
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

  .option-group {
    padding: 10px 0;
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 10px;
      color: #555;
      font-size: 14px;
    }
    .period-buttons {
      display: flex;
      gap: 10px;
    }
  }

  .price-area {
    margin-top: auto;
    margin-bottom: 20px;
    background-color: #fff;

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 16px;
      padding: 10px 0;

      &.total {
        margin-top: 0;
        border-top: none;
        padding-top: 10px;
        font-weight: bold;
        font-size: 24px;
        color: #000;
        .price-total {
          color: #d32f2f;
        }
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
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 24px;
        height: auto;
      }
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
  background-color: #e0e0e0;
  margin: 15px 0;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  background-color: #f3f3f3;
  font-size: 16px;
  color: #333;
  appearance: none;
  outline: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 15px top 50%;
  background-size: 12px auto;
`;

const PeriodBtn = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.$active ? "#356469" : "#ddd")};
  background-color: ${(props) => (props.$active ? "#fff" : "#fff")};
  color: ${(props) => (props.$active ? "#356469" : "#888")};
  font-weight: bold;
  cursor: pointer;
`;

const ProductTopSection = ({ product, selectedPeriod, setSelectedPeriod }) => {
  return (
    <Section>
      {/* 좌측 이미지 갤러리 */}
      <GallerySection>
        <ThumbColumn>
          {[1, 2, 3].map((num) => (
            <ThumbItem key={num}>
              {/* [수정] 이미지 주소 변경: via.placeholder.com -> placehold.co */}
              <img
                src={`https://placehold.co/152x187?text=View${num}`}
                alt={`썸네일${num}`}
              />
            </ThumbItem>
          ))}
        </ThumbColumn>
        <MainImageItem>
          {/* [수정] 이미지 주소 변경: via.placeholder.com -> placehold.co */}
          <img
            src={product.img || "https://placehold.co/443x592?text=Main"}
            alt={product.name}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </MainImageItem>
      </GallerySection>

      {/* 우측 정보 박스 */}
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

        <div className="option-group">
          <label>Choose Option</label>
          <StyledSelect defaultValue="default">
            <option value="default" disabled hidden>
              Option
            </option>
            <option value="none">없음</option>
          </StyledSelect>
        </div>

        <Divider />

        <div className="option-group">
          <label>계약 기간</label>
          <div className="period-buttons">
            {[36, 48, 60].map((period) => (
              <PeriodBtn
                key={period}
                $active={selectedPeriod === period}
                onClick={() => setSelectedPeriod(period)}
              >
                {period} 개월
              </PeriodBtn>
            ))}
          </div>
        </div>

        <Divider />

        <div className="price-area">
          <div className="row">
            <span>월 별 구독료</span>
            <span className="price">
              {product.price
                ? Number(product.price / selectedPeriod).toLocaleString()
                : 0}
              원
            </span>
          </div>
          <Divider />
          <div className="row total">
            <span>가전 구독 총 요금</span>
            <span className="price-total">
              {product.price ? product.price.toLocaleString() : 0}원
            </span>
          </div>
        </div>

        <div className="btn-group">
          <button className="cart">
            <img src={carticon} alt="장바구니" />
          </button>
          <button className="consult">구독 상담 예약</button>
          <button className="subscribe">구독 하기</button>
        </div>
      </InfoBox>
    </Section>
  );
};

export default ProductTopSection;
