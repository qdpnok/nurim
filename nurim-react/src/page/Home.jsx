import React from "react";
import styled from "styled-components";
import { CategoriesSection } from "./components/CategoriesSection";
import { FaqSection } from "./components/FaqSection";
import { FeaturedProductsSection } from "./components/FeaturedProductsSection";
import { HeroSection } from "./components/HeroSection";
import { ProductDisplaySection } from "./components/ProductDisplaySection";
import { PromotionsSection } from "./components/PromotionsSection";

const Main = styled.main`
  background-color: white;
  width: 100%;
  min-width: 1440px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const HotDealsSection = styled.section`
  display: flex;
  margin-left: 5rem; /* ml-20 */
  margin-right: 5rem; /* mr-20 */
  flex: 1;
  max-height: 34px;
  position: relative;
  margin-top: 121.4px;
  width: 1280px;
  height: 34px;
  align-items: center;
  gap: 0.625rem; /* gap-2.5 */
  padding: 0.625rem 0; /* px-0 py-2.5 */
  margin: 0 auto;
`;

export const Home = () => {
  return (
    <Main>
      <HeroSection />
      <ProductDisplaySection />
      <CategoriesSection />
      <PromotionsSection />
      <HotDealsSection></HotDealsSection>
      <FeaturedProductsSection />
      <FaqSection />
    </Main>
  );
};

export default Home;
