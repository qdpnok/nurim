import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ProductItem from "../Sub/ProductItem";

const Section = styled.div`
  width: 1240px;
  margin-bottom: 80px;

  h3 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
    text-align: left;
  }

  .recommend-list {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    flex-wrap: nowrap;
  }
`;

const RecommendSection = ({
  currentCategory,
  currentProductId,
  currentType,
}) => {
  const [recommendProducts, setRecommendProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendProducts = async () => {
      if (!currentCategory) return;

      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8222/api/product/list",
          {
            params: {
              category: currentCategory,
              page: 1,
              size: 20,
            },
          }
        );

        const products = response.data.productListDtoList || [];

        // [디버깅] 전체 필드명 확인용 로그
        if (products.length > 0) {
          console.log("🔥 전체 필드명 확인:", Object.keys(products[0]));
        }

        const filtered = products.filter((item) => {
          const itemId = item.pNum || item.pnum || item.num || item.id;
          return String(itemId) !== String(currentProductId);
        });

        const shuffled = filtered.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);

        const mappedProducts = selected.map((item) => {
          const realId = item.pNum || item.pnum || item.num || item.id;

          let imageUrl = "https://placehold.co/200x200?text=NoImage";
          if (item.img) {
            if (item.img.startsWith("http")) {
              imageUrl = item.img;
            } else {
              imageUrl = `/images/${item.img}`;
            }
          }

          // [디버깅] 가격 비교 로그 (콘솔에서 확인 필수)
          // sprice와 pprice가 같다면 백엔드 문제입니다.
          console.log(`[${item.name}] 가격 데이터 비교:`, {
            모드: currentType,
            구매가_pprice: item.pprice,
            구독가_sprice: item.sprice,
            구독가_price_36: item.price_36,
          });

          // [수정] 가격 표시 로직 (엄격한 분리 & 소문자 필드 지원)
          let displayPrice = "가격 문의";
          let finalPrice = 0;

          if (currentType === "subscription") {
            // 구독 모드: price_36 -> sprice 순서로 확인
            // 구매가(pprice)는 절대 참조하지 않음
            finalPrice =
              item.price_36 || item.sprice || item.sPrice || item.s_price || 0;
            displayPrice = finalPrice
              ? `월 ${finalPrice.toLocaleString()}원`
              : "가격 문의";
          } else {
            // 구매 모드: pprice 확인
            finalPrice =
              item.pprice || item.pPrice || item.p_price || item.price || 0;
            displayPrice = finalPrice
              ? `${finalPrice.toLocaleString()}원`
              : "가격 문의";
          }

          // 할인율도 소문자(pdiscountRate) 체크 추가
          const discountRate = item.pDiscountRate || item.pdiscountRate;

          return {
            id: realId,
            name: item.name,
            image: imageUrl,
            price: displayPrice,
            discount: discountRate ? `-${discountRate}%` : null,
            spec: item.spec,
            rating: item.scopeAvg,
            reviewCount: item.scopeCount,
            category: currentCategory,
          };
        });

        setRecommendProducts(mappedProducts);
      } catch (error) {
        console.error("추천 상품 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendProducts();
  }, [currentCategory, currentProductId, currentType]);

  if (loading)
    return (
      <Section>
        <h3>추천 제품을 찾고 있어요...</h3>
      </Section>
    );

  if (recommendProducts.length === 0) return null;

  return (
    <Section>
      <h3>누림 회원님을 위한 추천 제품</h3>
      <div className="recommend-list">
        {recommendProducts.map((product, index) => (
          <ProductItem
            key={product.id || index}
            product={product}
            type={currentType}
            isRecommend={true}
          />
        ))}
      </div>
    </Section>
  );
};

export default RecommendSection;
