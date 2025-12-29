import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import api from "../api/Axios";

// 컴포넌트 import
import CategoryFilter from "./components/Sub/CategoryFilter";
import ProductItem from "./components/Sub/ProductItem";
import Pagination from "./components/Sub/Pagination";

// [추가] 스펙 데이터 import
import { productCardData } from "../data/productCardSpecs";

// 이미지 import
import ac from "../img/C_ac.png";
import ref from "../img/C_ref.png";
import tv from "../img/C_tv.png";
import wash from "../img/C_wt.png";
import air from "../img/C_air.png";

const CATEGORIES = [
  { name: "에어컨", img: ac },
  { name: "냉장고", img: ref },
  { name: "TV", img: tv },
  { name: "세탁기", img: wash },
  { name: "공기청정기", img: air },
];

// --- 스타일 컴포넌트 ---
const Container = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProductGrid = styled.div`
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  margin-bottom: 50px;
`;
const SearchBox = styled.div`
  width: 1200px;
  height: 90px;
  background-color: #f3f3f5;
  border-radius: 10px;
  margin: 60px 0;
  display: flex;
  align-items: center;
  padding-left: 30px;
  box-sizing: border-box;
  color: #999;
  font-size: 16px;
`;
const ContentHeader = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
`;
const Breadcrumb = styled.div`
  font-size: 14px;
  color: #888;
  display: flex;
  gap: 8px;
  align-items: center;
  height: 24px;
  line-height: 1;
  span.active {
    color: #333;
    font-weight: bold;
  }
`;
const PageTitle = styled.h2`
  width: 1200px;
  font-size: 28px;
  font-weight: 800;
  color: #000;
  margin: 30px 0;
  text-align: left;
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 1;
`;

const LineSeparator = styled.div`
  width: 1200px;
  height: 1px;
  background-color: #e0e0e0;
  margin-bottom: 0px;
`;
const EmptyMessage = styled.div`
  width: 100%;
  padding: 50px;
  text-align: center;
  color: #888;
`;

// [수정 1] props로 받는 type 이름을 initialType으로 변경 (내부에서 재정의하기 위함)
const SubPage = ({ type: initialType }) => {
  const location = useLocation();

  // [수정 2] URL을 분석하여 type을 확실하게 결정 (Router props 무시하고 URL 우선)
  // URL에 'purchase'가 포함되어 있으면 구매 모드, 아니면 구독 모드
  const type = location.pathname.toLowerCase().includes("purchase")
    ? "purchase"
    : "subscription";

  const [selectedCategory, setSelectedCategory] = useState("에어컨");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setError(null);
        setAllProducts([]);
        setLoading(true);

        const pages = [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ];

        const requests = pages.map((page) =>
          api.get("/product/list", {
            params: { page: page, size: 20 },
          })
        );

        const results = await Promise.allSettled(requests);

        const flatData = results
          .filter(
            (result) => result.status === "fulfilled" && result.value.data
          )
          .flatMap((result) => {
            const data = result.value.data;
            return Array.isArray(data) ? data : data.productListDtoList || [];
          });

        // 데이터 매핑
        const mappedData = flatData.map((item) => {
          const uniqueId = item.pnum || item.pNum || item.id;
          const sNumVal = Number(item.snum || item.sNum);

          const mappingKey = sNumVal;
          const customData = productCardData[mappingKey];

          // 카테고리 로직
          let fixedCategory = "기타";
          const imgName = (item.img || "").toLowerCase();
          if (imgName.includes("ac")) fixedCategory = "에어컨";
          else if (imgName.includes("ref")) fixedCategory = "냉장고";
          else if (imgName.includes("tv")) fixedCategory = "TV";
          else if (imgName.includes("wash") || imgName.includes("wt"))
            fixedCategory = "세탁기";
          else if (imgName.includes("air")) fixedCategory = "공기청정기";

          // 뱃지(할인율) 텍스트 결정 로직
          let displayBadge = null;

          if (type === "subscription") {
            displayBadge = "36개월 구독 기준";
          } else {
            const rate = item.pdiscountrate || item.pDiscountRate;
            if (rate) {
              displayBadge = `-${rate}% off`;
            }
          }

          // 가격 및 이름 결정 로직
          let finalPrice = "0won";
          let finalName = item.name;
          let finalSpecs = item.spec;

          if (customData) {
            if (customData.name && customData.name.length > 0) {
              finalName = customData.name[0];
            }

            if (type === "subscription") {
              // 구독: 36개월 가격
              if (customData.prices && customData.prices.rent) {
                finalPrice = `월 ${customData.prices.rent[36].toLocaleString()}원`;
              }
            } else {
              // 구매: 구매 가격
              if (customData.prices && customData.prices.buy) {
                finalPrice = `${customData.prices.buy.toLocaleString()}원`;
              }
            }

            if (customData.specs && customData.specs.length > 0) {
              finalSpecs = customData.specs.join(" | ");
            }
          } else {
            finalPrice = item.price
              ? `${item.price.toLocaleString()}원`
              : "0원";
          }

          return {
            id: uniqueId,
            snum: sNumVal,
            category: fixedCategory,
            image: item.img,
            alt: finalName,
            name: finalName,
            price: finalPrice,
            discount: displayBadge,
            spec: finalSpecs,
            reviewCount: item.scopeCount || item.scopecount || 0,
            rating: item.scopeAvg || item.scopeavg || 0,
          };
        });

        // 중복 제거
        const uniqueData = mappedData.filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i
        );

        // 필터링 적용 (type 변수 사용)
        const pageTypeFiltered = uniqueData.filter((product) => {
          if (!product.snum) return false;

          if (type === "subscription") {
            return product.snum >= 1 && product.snum <= 50;
          } else {
            return product.id >= 51 && product.id <= 100;
          }
        });

        console.log(`📦 전체 확보된 데이터: ${uniqueData.length}개`);
        console.log(
          `🎯 현재 페이지(${type}) 필터링된 데이터: ${pageTypeFiltered.length}개`
        );

        setAllProducts(pageTypeFiltered);
      } catch (e) {
        console.error("Error fetching products:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [type]); // [수정] type이 변경될 때마다 재실행 (URL이 바뀌면 type도 바뀜)

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  const filteredByCategory =
    selectedCategory === "전체"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  const totalItems = filteredByCategory.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredByCategory.slice(startIndex, endIndex);

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container>
      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryClick}
      />

      <SearchBox>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: "10px" }}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        Search Product Here
      </SearchBox>

      <ContentHeader>
        <Breadcrumb>
          <span>Home</span> <span>&gt;</span>
          <span>
            {/* [수정 3] type이 purchase면 'Purchase'로 대문자 표기 */}
            {type === "subscription" ? "Subscriptions" : "Purchase"}
          </span>{" "}
          <span>&gt;</span>
          <span className="active">{selectedCategory}</span>
        </Breadcrumb>
      </ContentHeader>

      <LineSeparator />

      <PageTitle>{selectedCategory} Products</PageTitle>

      <ProductGrid>
        {currentProducts.length > 0 ? (
          currentProducts.map((data, index) => (
            <ProductItem
              key={data.id ? `${data.id}-${index}` : index}
              product={data}
              type={type} // 결정된 type 전달
            />
          ))
        ) : (
          <EmptyMessage>해당 카테고리에 등록된 상품이 없습니다.</EmptyMessage>
        )}
      </ProductGrid>

      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default SubPage;
