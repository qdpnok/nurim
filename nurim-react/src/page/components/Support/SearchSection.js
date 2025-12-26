// components/Support/SearchSection.js
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1440px;
  height: 375px;
  background-color: #e8f0f0; /* 배경색은 이미지 분위기에 맞춰 연한 민트/회색 톤 임의 지정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const SubText = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const SearchInput = styled.input`
  width: 580px;
  height: 50px;
  border-radius: 25px;
  border: 1px solid #ddd;
  padding: 0 20px;
  font-size: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`;

const SearchButton = styled.button`
  width: 190px;
  height: 32px;
  background-color: #2f6364;
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

const SearchSection = () => {
  return (
    <Container>
      <Title>How can we help you?</Title>
      <SubText>
        자주 묻는 질문과 운영 정책을 확인하여 궁금증을 해결해 보세요.
      </SubText>
      <SearchBox>
        <SearchInput placeholder="무엇을 도와드릴까요? 검색어를 입력하세요." />
        <SearchButton>검색</SearchButton>
      </SearchBox>
    </Container>
  );
};

export default SearchSection;
