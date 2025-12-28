import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// 컴포넌트 임포트
import ProductTopSection from "./components/ProductDetail/ProductTopSection";
import RecommendSection from "./components/ProductDetail/RecommendSection";
import DetailReviewSection from "./components/ProductDetail/DetailReviewSection";
import SupportSection from "./components/ProductDetail/SupportSection";

// [중요] 데이터 파일 임포트 (경로를 본인 프로젝트 구조에 맞게 수정하세요)
import { allProductSpecs } from "../data";

const Container = styled.div`
  width: 1240px;
  margin: 0 auto;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductDetailPage = () => {
  const { id } = useParams(); // URL의 id (예: 82)
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(36);

  // 구매/구독 타입 결정
  const currentType = location.pathname.toLowerCase().includes("purchase")
    ? "purchase"
    : "subscription";

  // [핵심 로직] ID로 static 데이터(상세 스펙 이미지 등) 찾기
  const staticSpecData = useMemo(() => {
    if (!allProductSpecs || !id) return null;

    // allProductSpecs 안의 모든 카테고리(Tv, Ref, Ac 등)를 순회하며 ID 검색
    const allCategories = Object.values(allProductSpecs);

    for (const categoryData of allCategories) {
      // categoryData 안에 해당 id(키)가 있는지 확인
      if (categoryData[id]) {
        return categoryData[id]; // 찾으면 해당 데이터 반환
      }
    }
    return null; // 없으면 null
  }, [id]);

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
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProductDetail();
  }, [id]);

  if (loading) return <Container>Loading...</Container>;
  if (!product) return <Container>상품 정보를 불러오는 중입니다...</Container>;

  // 카테고리 추론 (추천 제품용)
  let inferredCategory = "TV";
  if (product.img && product.img.includes("ref")) inferredCategory = "냉장고";
  else if (product.img && product.img.includes("ac"))
    inferredCategory = "에어컨";
  else if (product.img && product.img.includes("wt"))
    inferredCategory = "세탁기";
  else if (product.img && product.img.includes("air"))
    inferredCategory = "공기청정기";

  return (
    <Container>
      <ProductTopSection
        product={product}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />

      <RecommendSection
        currentCategory={inferredCategory}
        currentProductId={id}
        currentType={currentType}
      />

      {/* [수정] 찾은 staticSpecData를 자식 컴포넌트에 전달 */}
      <DetailReviewSection product={product} staticSpecData={staticSpecData} />

      <SupportSection />
    </Container>
  );
};

export default ProductDetailPage;
