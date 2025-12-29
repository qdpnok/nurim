import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/Axios"; // 경로 확인 필요
import AcquisitionModal from "../../Modal/AcquisitionModal";

// --- 스타일 정의 ---

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
  text-align: left;
`;

const TitleHeader = styled.div`
  text-align: left;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #000;
  margin: 0;
`;

const SubTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #000;
  border-bottom: 2px solid #000;
  padding-bottom: 10px;
  display: inline-block;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  margin-bottom: 40px;
`;

const Th = styled.th`
  padding: 15px;
  background-color: #f5f5f5;
  font-size: 14px;
  color: #555;
  text-align: center;
  border: none;

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const Td = styled.td`
  padding: 20px 15px;
  text-align: center;
  font-size: 14px;
  color: #333;
  vertical-align: middle;
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;

  &:first-child {
    border-left: 1px solid #eee;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:last-child {
    border-right: 1px solid #eee;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    background-color: #eee;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 12px 40px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) => (props.$primary ? "#fff" : "#2F5D62")};
  color: ${(props) => (props.$primary ? "#2F5D62" : "#fff")};
  border: ${(props) => (props.$primary ? "1px solid #2F5D62" : "none")};

  &:hover {
    opacity: 0.9;
  }
`;

// --- 커스텀 체크박스 스타일 ---
const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${(props) => (props.checked ? "#000" : "#fff")};
  border: 1px solid ${(props) => (props.checked ? "#000" : "#ccc")};
  border-radius: 4px;
  transition: all 150ms;
  display: flex;
  align-items: center;
  justify-content: center;

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

const CustomCheckbox = ({ checked, onChange }) => (
  <CheckboxContainer onClick={onChange}>
    <HiddenCheckbox checked={checked} readOnly />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

const Acquisition = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // [수정] 실제 데이터 state
  const [products, setProducts] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]); // 선택된 ID들
  const memberNum = 1; // 임시 회원 번호

  // [수정] 데이터 로드 (구독 중인 상품 불러오기)
  useEffect(() => {
    api
      .get(`/mypage/subscriptions/${memberNum}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("데이터 로드 실패:", err);
      });
  }, []);

  // [추가] 전체 선택/해제 핸들러
  const handleAllCheck = () => {
    if (checkedItems.length === products.length) {
      // 이미 모두 선택된 상태라면 모두 해제
      setCheckedItems([]);
    } else {
      // 아니라면 모든 제품 ID 선택
      const allIds = products.map((p) => p.id);
      setCheckedItems(allIds);
    }
  };

  // [추가] 개별 선택 핸들러
  const handleSingleCheck = (id) => {
    if (checkedItems.includes(id)) {
      // 이미 선택된 항목이면 제외
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      // 선택되지 않은 항목이면 추가
      setCheckedItems([...checkedItems, id]);
    }
  };

  // 신청하기 버튼 클릭
  const handleApply = () => {
    if (checkedItems.length === 0) {
      alert("제품을 선택해주세요.");
      return;
    }
    // 예시: 첫 번째 선택한 제품만 모달로 넘김 (다중 선택 로직은 모달 로직에 따라 변경)
    const targetProduct = products.find((p) => p.id === checkedItems[0]);
    setSelectedProduct(targetProduct);
    setIsModalOpen(true);
  };

  // 모달 내부 '확인' 시 실행할 함수
  const submitAcquisition = async () => {
    try {
      await api.post("/mypage/acquisition", {
        memberNum: 1, // 임시 회원 번호
        productNum: selectedProduct.pNum, // [수정] 키 값을 productId -> productNum 으로 변경
      });
      alert("인수 신청이 완료되었습니다.");
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Breadcrumb>Home &gt; My Page &gt; 인수 신청</Breadcrumb>
      <TitleHeader>
        <Title>인수 신청</Title>
      </TitleHeader>

      <SubTitle>구독 제품</SubTitle>
      <Table>
        <thead>
          <tr>
            <Th>
              <CustomCheckbox
                checked={
                  products.length > 0 && checkedItems.length === products.length
                }
                onChange={handleAllCheck}
              />
            </Th>
            <Th>전체선택</Th>
            <Th>가전 명</Th>
            {/* DTO에 날짜가 없다면 이 컬럼을 제거하거나 다른 정보로 대체해야 함 */}
            <Th>스펙</Th>
            <Th>월 케어 비용</Th>
            <Th>브랜드</Th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.pNum}>
              {" "}
              {/* [수정] key를 pNum으로 */}
              <Td>
                <CustomCheckbox
                  checked={checkedItems.includes(product.pNum)} // [수정]
                  onChange={() => handleSingleCheck(product.pNum)} // [수정]
                />
              </Td>
              <Td>
                {/* [수정] image -> img */}
                <img src={product.img} alt="제품" />
              </Td>
              <Td style={{ textAlign: "left", paddingLeft: "30px" }}>
                <strong>{product.name}</strong>
                <br />
                {/* [수정] model -> category 또는 serialNum */}
                <span style={{ fontSize: "12px", color: "#888" }}>
                  [{product.category}]
                </span>
              </Td>
              {/* [수정] DTO에 날짜 필드가 없으므로 spec으로 대체 예시 */}
              <Td>{product.spec}</Td>
              {/* [수정] monthlyPrice -> price_36 또는 sPrice */}
              <Td>
                {product.price_36 ? product.price_36.toLocaleString() : 0}원
              </Td>
              {/* [수정] remaining -> brand 등으로 대체 */}
              <Td>{product.brand}</Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ButtonGroup>
        <Button $primary onClick={handleApply}>
          신청하기
        </Button>
        <Button onClick={() => navigate(-1)}>닫기</Button>
      </ButtonGroup>

      {isModalOpen && (
        <AcquisitionModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onConfirm={submitAcquisition} // 모달 확인 버튼 이벤트 연결
        />
      )}
    </Container>
  );
};

export default Acquisition;
