// components/Support/SearchSection.js
import React from "react";
import styled from "styled-components";

import SearchIcon from "../../../img/Searchg.png";

const Container = styled.div`
  width: 1440px;
  height: 375px;
  background: linear-gradient(
    to bottom right,
    rgba(47, 99, 100, 0.1) 0%,
    rgba(47, 99, 100, 0.2) 54%,
    rgba(47, 99, 100, 0.1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: normal;
  margin-bottom: 25px;
  color: #2f2f2f;
`;

const SubText = styled.p`
  font-size: 16px;
  color: #4a5565;
  margin-bottom: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const SearchGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 580px;
  height: 50px;
  border-radius: 13px;
  border: 1px solid #ddd;
  background-color: #fff;
  padding: 0 14px;
  font-size: 12px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
    0px 4px 6px -4px rgba(0, 0, 0, 0.1);
  outline: none;
  gap: 10px;
  margin-bottom: 16px;

  &::placeholder {
    color: #aaa;
  }
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  width: 100%;
  font-size: 12px;
  color: black;
  outline: none;

  &::placeholder {
    color: #1e1e1e;
    opacity: 0.3;
  }
`;

const SearchImg = styled.img`
  height: 17.5px;
  width: 17.5px;
  cursor: pointer;
`;

const SearchButton = styled.button`
  width: 190px;
  height: 32px;
  background-color: #2f6364;
  color: white;
  border: none;
  border-radius: 8.75px;
  font-size: 14px;
  cursor: pointer;
  font-weight: normal;
  font-family: "Poppins";

  &:hover {
    opacity: 0.9;
  }
`;

const SearchSection = () => {
  return (
    <Container>
      <Title>How can we help you?</Title>
      <SubText>
        자주 묻는 질문에 대한 답변을 찾거나 지원팀에 문의하려면 여기를
        클릭하세요.
      </SubText>
      <SearchBox>
        <SearchGroup>
          <SearchImg src={SearchIcon} alt="검색" />
          <SearchInput placeholder="Search for help articles, topics, or questions..." />
        </SearchGroup>
        <SearchButton>검색</SearchButton>
      </SearchBox>
    </Container>
  );
};

export default SearchSection;
