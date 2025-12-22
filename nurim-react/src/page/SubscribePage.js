import styled from "styled-components";
const ac = "https://placehold.co/23x105";
const ref = "https://placehold.co/58x92";
const tv = "https://placehold.co/154x80";
const wash = "https://placehold.co/97x96";
const air = "https://placehold.co/108x108";

const Container = styled.div`
  width: 1440px;
  height: auto;
  display: flex;
  justify-content: center;
  padding-top: 60px;
  align-items: center;
  flex-wrap: wrap;
`;

const TotalCategoryBox = styled.div`
  width: 1200px;
  height: 150px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const CategoryBox = styled.div`
  width: 200px;
  height: 150px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f5;
  flex-wrap: wrap;
  text-align: center;
`;

const PText = styled.p`
  width: 180px;
`;

const SearchBox = styled.div`
  width: 1200px;
  height: 90px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: #f3f3f5;
  margin-top: 60px;
  margin-bottom: 60px;
`;

const LineSeparator = styled.div`
  width: 1200px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 60px;
`;

const ProductBox = styled.div`
  width: 1200px;
  height: 1878px;
  border: 1px solid black;
`;

const SubscribePage = () => {
  return (
    <Container>
      <TotalCategoryBox>
        <CategoryBox>
          <PText>에어컨</PText>
          <img src={ac} alt="에어컨" />
        </CategoryBox>
        <CategoryBox>
          <PText>냉장고</PText>
          <img src={ref} alt="냉장고" />
        </CategoryBox>
        <CategoryBox>
          <PText>TV</PText>
          <img src={tv} alt="tv" />
        </CategoryBox>
        <CategoryBox>
          <PText>세탁기</PText>
          <img src={wash} alt="세탁기" />
        </CategoryBox>
        <CategoryBox>
          <PText>공기청정기</PText>
          <img src={air} alt="공기청정기" />
        </CategoryBox>
      </TotalCategoryBox>
      <SearchBox>asd</SearchBox>
      <LineSeparator />
      <ProductBox></ProductBox>
    </Container>
  );
};

export default SubscribePage;
