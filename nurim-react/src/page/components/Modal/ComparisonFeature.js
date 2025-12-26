import React, { useState, useEffect } from "react";
import styled from "styled-components";

// --- Styled Components ---

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 배경색 등 기존 스타일 유지 */
  /* padding-bottom은 BarContainer가 가리는 만큼 확보해주는 것이 좋습니다 (헤더 높이 56px) */
  padding-bottom: 60px;
`;

// [수정됨] bottom 값을 props로 받아 동적으로 조절
const BarContainer = styled.div`
  width: 1440px;
  background-color: white;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);

  position: fixed;
  /* props.$bottomOffset 만큼 바닥에서 떨어짐 */
  bottom: ${(props) => props.$bottomOffset}px;
  transition: bottom 0.1s ease-out; /* 부드러운 움직임 추가 */

  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

// ... (Header, ExpandedArea, ProductSlot 등 다른 스타일 컴포넌트는 기존과 동일) ...
const Header = styled.div`
  width: 1440px;
  height: 56px;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
`;

const HeaderTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  gap: 10px;
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ResetButton = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #ccc;
  &:hover {
    color: white;
  }
`;

const ArrowIcon = styled.span`
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s;
  font-size: 20px;
`;

const ExpandedArea = styled.div`
  width: 1440px;
  height: 232px;
  background-color: white;
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-sizing: border-box;
  border-top: 1px solid #eee;
`;

const ProductList = styled.div`
  display: flex;
  gap: 20px;
`;

const ProductSlot = styled.div`
  width: 250px;
  height: 150px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
  box-sizing: border-box;
  position: relative;
  background-color: ${(props) => (props.$isEmpty ? "#f9f9f9" : "white")};
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #999;
  font-size: 18px;
  &:hover {
    color: #333;
  }
`;

const ProductImg = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  margin-right: 15px;
  background-color: #eee;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h4 {
    font-size: 14px;
    margin: 0 0 5px 0;
    color: #333;
  }
  span {
    font-size: 12px;
    color: #888;
  }
`;

const EmptyText = styled.div`
  width: 100%;
  text-align: center;
  color: #ccc;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ResultBtn = styled.button`
  background-color: #2f6162;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

// ... (ResultModal 관련 스타일은 기존과 동일) ...
const ResultModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 2000;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;
const CloseResultBtn = styled.button`
  position: absolute;
  top: 30px;
  right: 50px;
  padding: 10px 20px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
`;
const ResultContainer = styled.div`
  width: 1440px;
  padding: 40px;
  box-sizing: border-box;
`;

// --- Main Component ---

const ComparisonFeature = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([
    {
      id: 1,
      name: "LG전자 스탠바이미",
      code: "27ART10AKPL",
      img: "https://via.placeholder.com/90",
    },
    {
      id: 2,
      name: "LG전자 스탠바이미 Go",
      code: "27LX5QKNA",
      img: "https://via.placeholder.com/90",
    },
  ]);

  // [추가됨] 푸터 높이 감지 상태
  const [bottomOffset, setBottomOffset] = useState(0);

  const MAX_SLOTS = 4;

  // [추가됨] 스크롤 이벤트로 푸터 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      // 중요: 실제 푸터 컴포넌트나 태그에 id="main-footer"를 줘야 합니다.
      // 만약 id를 줄 수 없다면 document.querySelector('footer') 등을 사용하세요.
      const footer =
        document.querySelector("footer") ||
        document.getElementById("main-footer");

      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 푸터의 윗부분(top)이 화면(windowHeight)보다 위로 올라오면 (즉, 푸터가 보이면)
      if (footerRect.top < windowHeight) {
        // 화면 높이에서 푸터 top을 뺀 만큼 바를 위로 올림
        const overlap = windowHeight - footerRect.top;
        setBottomOffset(overlap > 0 ? overlap : 0);
      } else {
        setBottomOffset(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // 초기 로딩 시에도 위치 계산
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleReset = (e) => {
    e.stopPropagation();
    setSelectedProducts([]);
  };

  const removeProduct = (id) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  const handleShowResult = () => {
    if (selectedProducts.length === 0) {
      alert("비교할 제품을 선택해주세요.");
      return;
    }
    setShowResult(true);
  };

  const addTestProduct = () => {
    if (selectedProducts.length >= MAX_SLOTS) return;
    const newId = Date.now();
    setSelectedProducts([
      ...selectedProducts,
      {
        id: newId,
        name: `새로운 제품 ${selectedProducts.length + 1}`,
        code: "NEW-CODE",
        img: "https://via.placeholder.com/90",
      },
    ]);
  };

  if (showResult) {
    return (
      <ResultModal>
        <CloseResultBtn onClick={() => setShowResult(false)}>
          닫기 X
        </CloseResultBtn>
        <ResultContainer>
          <h1>제품 비교 결과</h1>
          {/* 결과 화면 내용은 기존과 동일하므로 생략하거나 유지 */}
          <div>제품 비교 상세 내용이 여기에 표시됩니다.</div>
        </ResultContainer>
      </ResultModal>
    );
  }

  return (
    <Wrapper>
      {/* <button
        onClick={addTestProduct}
        style={{ marginTop: "200px", padding: "10px" }}
      >
        + 테스트 제품 추가하기
      </button> */}

      {/* [수정됨] bottomOffset 값을 props로 전달 */}
      <BarContainer $bottomOffset={bottomOffset}>
        <Header onClick={() => setIsOpen(!isOpen)}>
          <HeaderTitle>
            카테고리별 제품 비교하기
            {isOpen && (
              <span style={{ fontWeight: "normal" }}>
                {" "}
                {selectedProducts.length}/{MAX_SLOTS}
              </span>
            )}
          </HeaderTitle>

          <HeaderControls>
            <ResetButton onClick={handleReset}>⟳ 초기화</ResetButton>
            <ArrowIcon $isOpen={isOpen}>⌄</ArrowIcon>
          </HeaderControls>
        </Header>

        <ExpandedArea $isOpen={isOpen}>
          <ProductList>
            {[...Array(MAX_SLOTS)].map((_, index) => {
              const product = selectedProducts[index];
              if (product) {
                return (
                  <ProductSlot key={product.id}>
                    <CloseIcon onClick={() => removeProduct(product.id)}>
                      ✕
                    </CloseIcon>
                    <ProductImg src={product.img} alt={product.name} />
                    <ProductInfo>
                      <h4>{product.name}</h4>
                      <span>{product.code}</span>
                    </ProductInfo>
                  </ProductSlot>
                );
              } else {
                return (
                  <ProductSlot key={index} $isEmpty>
                    <EmptyText>
                      <span style={{ fontSize: "24px" }}>+</span>
                      비교하기 제품은
                      <br />
                      최대 4개까지
                    </EmptyText>
                  </ProductSlot>
                );
              }
            })}
          </ProductList>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <ResultBtn onClick={handleShowResult}>결과 보기</ResultBtn>
          </div>
        </ExpandedArea>
      </BarContainer>
    </Wrapper>
  );
};

export default ComparisonFeature;
