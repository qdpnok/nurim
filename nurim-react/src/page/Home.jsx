import React from "react";
import styled from "styled-components";
import { CategoriesSection } from "./components/Main/CategoriesSection";
import { FaqSection } from "./components/Main/FaqSection";
import { FeaturedProductsSection } from "./components/Main/FeaturedProductsSection";
import { HeroSection } from "./components/Main/HeroSection";
import { ProductDisplaySection } from "./components/Main/ProductDisplaySection";
import { PromotionsSection } from "./components/Main/PromotionsSection";

const Main = styled.main`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content */
`;

// Removed HotDealsSection as it was empty and causing spacing issues or replace content if needed.
// If you need spacing, use margin in sections.

export const Home = () => {
  return (
    <Main>
      <HeroSection />
      <ProductDisplaySection />
      <CategoriesSection />
      <PromotionsSection />
      <FeaturedProductsSection />
      <FaqSection />
    </Main>
  );
};

export default Home;
