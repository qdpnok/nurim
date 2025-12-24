import React, { useState } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { FaCheckCircle, FaEllipsisH } from "react-icons/fa";
import { BiSlider } from "react-icons/bi";
import ProductSpecTable from "../Sub/ProductSpecTable"; // 경로 확인 필요

const Section = styled.div`
  width: 1240px;
  min-height: 800px;
  margin-bottom: 80px;

  .tabs {
    display: flex;
    justify-content: center;
    gap: 0px;
    margin: 60px 0;
  }

  .content-area {
    width: 100%;
    padding-bottom: 50px;
  }
`;

const TabBtn = styled.button`
  width: 414px;
  padding: 15px 0;
  background: none;
  border: none;
  border-bottom: ${(props) =>
    props.$active ? "4px solid #000" : "1px solid #ddd"};
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.$active ? "#000" : "#ccc")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #333;
  }
`;

// --- 리뷰 스타일 ---
const ReviewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h3 {
    font-size: 24px;
    font-weight: bold;
    span {
      font-weight: 400;
      color: #888;
      font-size: 18px;
      margin-left: 5px;
    }
  }

  .header-buttons {
    display: flex;
    gap: 10px;
  }
`;

const FilterBtn = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f5f5f5;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

const SortBtn = styled.button`
  width: 120px;
  height: 48px;
  border-radius: 30px;
  background-color: #f5f5f5;
  border: none;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  &:hover {
    background-color: #eee;
  }
`;

const WriteBtn = styled.button`
  width: 166px;
  height: 48px;
  border-radius: 30px;
  background-color: #000;
  color: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
`;

const ReviewCard = styled.div`
  width: 610px;
  height: 265px;
  border: 1px solid #eee;
  border-radius: 20px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;

  .top-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .stars {
      color: #ffd700;
      font-size: 18px;
      display: flex;
      gap: 2px;
    }
    .menu-icon {
      color: #aaa;
      cursor: pointer;
    }
  }

  .user-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 16px;

    .check-icon {
      color: #27ae60;
      font-size: 14px;
    }
  }

  .review-text {
    font-size: 14px;
    color: #555;
    line-height: 1.6;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .date {
    margin-top: auto;
    font-size: 13px;
    color: #999;
    font-weight: 500;
  }
`;

const LoadMoreBtn = styled.button`
  width: 230px;
  height: 52px;
  border-radius: 30px;
  border: 1px solid #ddd;
  background-color: #fff;
  font-weight: bold;
  font-size: 15px;
  margin-top: 50px;
  cursor: pointer;
  &:hover {
    border-color: #000;
  }
`;

// 더미 데이터
const dummyReviews = [
  {
    id: 1,
    name: "Samantha D.",
    date: "August 14, 2023",
    text: "I absolutely love this product! The design is unique and the performance feels so comfortable.",
  },
  {
    id: 2,
    name: "Alex M.",
    date: "August 15, 2023",
    text: "The product exceeded my expectations! The colors are vibrant and the build quality is top-notch.",
  },
  {
    id: 3,
    name: "Ethan R.",
    date: "August 16, 2023",
    text: "This is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye.",
  },
  {
    id: 4,
    name: "Olivia P.",
    date: "August 17, 2023",
    text: "As a UI/UX enthusiast, I value simplicity and functionality. This product not only represents those principles but also feels great to use.",
  },
  {
    id: 5,
    name: "Liam K.",
    date: "August 18, 2023",
    text: "This product is a fusion of comfort and creativity. The interface is soft, and the design speaks volumes about the skill.",
  },
  {
    id: 6,
    name: "Ava H.",
    date: "August 19, 2023",
    text: "I'm not just using a product; I'm experiencing a piece of design philosophy.",
  },
];

const DetailReviewSection = ({ product, staticSpecData }) => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <Section>
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
          <div className="spec-container">
            <h3>상품 상세 스펙</h3>
            <ProductSpecTable data={product.spec || staticSpecData} />
          </div>
        ) : (
          <ReviewContainer>
            <ReviewHeader>
              <h3>
                All Reviews <span>(451)</span>
              </h3>
              <div className="header-buttons">
                <FilterBtn>
                  <BiSlider />
                </FilterBtn>
                <SortBtn>
                  최신순 <span style={{ fontSize: "12px" }}>▼</span>
                </SortBtn>
                <WriteBtn>리뷰 작성 하기</WriteBtn>
              </div>
            </ReviewHeader>

            <ReviewGrid>
              {dummyReviews.map((review) => (
                <ReviewCard key={review.id}>
                  <div className="top-row">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <AiFillStar key={i} />
                      ))}
                    </div>
                    <FaEllipsisH className="menu-icon" />
                  </div>
                  <div className="user-row">
                    {review.name} <FaCheckCircle className="check-icon" />
                  </div>
                  <p className="review-text">{review.text}</p>
                  <div className="date">Posted on {review.date}</div>
                </ReviewCard>
              ))}
            </ReviewGrid>
            <LoadMoreBtn>Load More Reviews</LoadMoreBtn>
          </ReviewContainer>
        )}
      </div>
    </Section>
  );
};

export default DetailReviewSection;
