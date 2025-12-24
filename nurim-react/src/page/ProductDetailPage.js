import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// 분리된 컴포넌트 임포트
import ProductTopSection from "./components/ProductDetail/ProductTopSection";
import RecommendSection from "./components/ProductDetail/RecommendSection";
import DetailReviewSection from "./components/ProductDetail/DetailReviewSection";
import SupportSection from "./components/ProductDetail/SupportSection";

import { allProductSpecs } from "../data";

const Container = styled.div`
  width: 1240px;
  margin: 0 auto;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const findSpecById = (id) => {
  if (!allProductSpecs) return [];
  const allCategories = Object.values(allProductSpecs);
  for (const categoryData of allCategories) {
    if (categoryData[id]) {
      return categoryData[id];
    }
  }
  return [];
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(36);

  const staticSpecData = findSpecById(id);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8222/api/product/detail/${id}`
        );
        setProduct(response.data);
      } catch (e) {
        console.error("상세 정보 로딩 실패:", e);
        setProduct({
          id: id,
          name: "LG 휘센 오브제컬렉션 (테스트용)",
          img: "",
          price: 2500000,
          spec: null,
        });
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProductDetail();
  }, [id]);

  if (loading) return <Container>Loading...</Container>;
  if (!product) return <Container>상품 정보를 불러오는 중입니다...</Container>;

  return (
    <Container>
      {/* 1. 상단 섹션 (이미지, 가격, 옵션) */}
      <ProductTopSection
        product={product}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />

      {/* 2. 추천 제품 섹션 */}
      <RecommendSection />

      {/* 3. 상세정보 & 리뷰 탭 섹션 */}
      <DetailReviewSection product={product} staticSpecData={staticSpecData} />

      {/* 4. 고객지원 & 유의사항 섹션 */}
      <SupportSection />
    </Container>
  );
};

export default ProductDetailPage;
