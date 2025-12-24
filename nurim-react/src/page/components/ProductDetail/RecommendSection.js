import React from "react";
import styled from "styled-components";

const Section = styled.div`
  width: 1240px;
  height: 467px;
  margin-bottom: 80px;

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
      height: 380px;
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

const RecommendSection = () => {
  return (
    <Section>
      <h3>누림 회원님을 위한 추천 제품</h3>
      <div className="recommend-list">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="rec-item">
            <div className="rec-img"></div>
            <p>추천 상품 {item}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default RecommendSection;
