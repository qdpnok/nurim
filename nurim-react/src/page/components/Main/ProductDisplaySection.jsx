import React, { useState } from "react";
import styled from "styled-components";
import sc from "../../../img/Searchg.png";

const Section = styled.section`
  display: flex;
  width: 100%;
  max-width: 1280px;
  margin: 100px auto;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const Heading = styled.h2`
  font-family: "ABeeZee", sans-serif;
  color: #2f6364;
  font-size: 1.25rem;
  text-align: center;
`;

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 800px; /* Max width for search bar */
  height: 60px;
  align-items: center;
  padding: 0 20px;
  border-radius: 40px;
  border: 1px solid #80808080;
  box-sizing: border-box;
`;

const SearchInput = styled.input`
  flex: 1;
  font-family: "Poppins", sans-serif;
  font-size: 1.1rem;
  border: none;
  outline: none;
  background: transparent;
  color: #333;

  &::placeholder {
    color: #aaa;
  }
`;

const SearchButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const ProductDisplaySection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Section>
      <Header>
        <Heading>원하시는 제품을 검색해 보세요.</Heading>
      </Header>
      <SearchForm>
        <SearchInput
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton>
          <SearchIcon src={sc} alt="Search" />
        </SearchButton>
      </SearchForm>
    </Section>
  );
};
