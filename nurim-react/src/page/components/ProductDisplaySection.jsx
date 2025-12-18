import React, { useState } from "react";
import styled from "styled-components";
const vector = "https://placehold.co/100x443";

const Section = styled.section`
  display: flex;
  height: 581px;
  width: 1280px;
  align-self: center;
  position: relative;
  margin-top: 11rem; /* mt-44 */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem; /* gap-5 */
  padding: 1.25rem; /* p-5 */
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  height: 37px;
  align-items: center;
  justify-content: space-around;
  gap: 30px;
  position: relative;
  align-self: stretch;
  width: 100%;
`;

const Heading = styled.h2`
  position: relative;
  width: fit-content;
  font-family: "ABeeZee", Helvetica, sans-serif;
  font-weight: 400; /* Regular */
  color: #2f6364;
  font-size: 1.25rem; /* xl */
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
`;

const SearchForm = styled.form`
  display: flex;
  width: 1036px;
  height: 76px;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 35px;
  padding-top: 1.25rem; /* py-5 */
  padding-bottom: 1.25rem;
  position: relative;
  border-radius: 40px;
  border: 1px solid #80808080;
`;

const SrOnlyLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const SearchInput = styled.input`
  position: relative;
  width: 100%;
  font-family: "Poppins", Helvetica, sans-serif;
  font-weight: 500; /* Medium */
  color: #808080;
  font-size: 1.25rem; /* xl */
  letter-spacing: 0;
  line-height: normal;
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: #808080;
  }
`;

const SearchButton = styled.button`
  position: relative;
  width: 1.25rem; /* w-5 */
  height: 1.25rem;
  margin-right: -1px;
  flex-shrink: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const SearchIcon = styled.img`
  width: 100%;
  height: 100%;
`;

export const ProductDisplaySection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <Section>
      <Header>
        <Heading>원하시는 제품을 검색해 보세요.</Heading>
      </Header>

      <SearchForm onSubmit={handleSearchSubmit} role="search">
        <SrOnlyLabel htmlFor="product-search">제품 검색</SrOnlyLabel>
        <SearchInput
          id="product-search"
          type="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
          aria-label="제품 검색"
        />
        <SearchButton type="submit" aria-label="검색">
          <SearchIcon src={vector} alt="" />
        </SearchButton>
      </SearchForm>
    </Section>
  );
};
