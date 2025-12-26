// pages/CustomerSupportPage.js
import React from "react";
import styled from "styled-components";

import SearchSection from "./components/Support/SearchSection";
import HelpSection from "./components/Support/HelpSection";
import InquirySection from "./components/Support/InquirySection";
import FaqSection from "./components/Support/FaqSection";
import QnaSection from "./components/Support/QnaSection";

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  background-color: white;
`;

// 각 컴포넌트 사이 여백 90px
const SectionWrapper = styled.div`
  width: 1440px;
  margin-bottom: 90px;
  display: flex;
  justify-content: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CustomerSupportPage = () => {
  return (
    <PageWrapper>
      <SectionWrapper>
        <SearchSection />
      </SectionWrapper>

      <SectionWrapper>
        <HelpSection />
      </SectionWrapper>

      <SectionWrapper>
        <InquirySection />
      </SectionWrapper>

      <SectionWrapper>
        <FaqSection />
      </SectionWrapper>

      <SectionWrapper>
        <QnaSection />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default CustomerSupportPage;
