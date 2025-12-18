import React, { useState } from "react";
import styled from "styled-components";
import { ArrowDown } from "lucide-react";
import { ArrowUp } from "lucide-react";

const Section = styled.section`
  display: flex;
  width: 1280px;
  height: 766px;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--tokens-spacing-spacing-2xl);
  padding-top: var(--tokens-spacing-spacing-xl);
  padding-right: var(--tokens-spacing-spacing-3xl);
  padding-bottom: var(--tokens-spacing-spacing-xl);
  padding-left: var(--tokens-spacing-spacing-3xl);
  background-color: var(--tokens-background-primary);
  margin: 0 auto;
  margin-top: 90px;
`;

const ContentWrapper = styled.div`
  flex-direction: column;
  align-items: flex-start;
  gap: var(--tokens-spacing-spacing-lg);
  padding-right: var(--tokens-spacing-spacing-3xl);
  padding-left: var(--tokens-spacing-spacing-3xl);
  padding-top: 0;
  padding-bottom: 0;
  align-self: stretch;
  width: 100%;
  flex: 0 0 auto;
  display: flex;
  position: relative;
`;

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem; /* gap-2.5 */
  padding-top: var(--tokens-spacing-spacing-sm);
  padding-bottom: var(--tokens-spacing-spacing-sm);
  padding-left: 0;
  padding-right: 0;
  position: relative;
  align-self: stretch;
  width: 100%;
  flex: 0 0 auto;
  background-color: transparent;
`;

const Title = styled.h2`
  position: relative;
  width: fit-content;
  margin-top: -1px;
  font-family: "Inter", Helvetica, sans-serif;
  font-weight: 600;
  color: var(--tokens-text-heading-main);
  font-size: 35px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
`;

const FaqItemWrapper = styled.div`
  width: 1200px;
  align-items: flex-start;
  gap: var(--tokens-spacing-spacing-sm);
  position: relative;
  flex: 0 0 auto;
  margin-right: -80px;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $expanded }) => ($expanded ? "flex-start" : "center")};
  height: 133px;
`;

const FaqContent = styled.div`
  align-items: ${({ $expanded }) => ($expanded ? "flex-start" : "center")};
  gap: var(--primitives-spacing-12);
  padding-top: var(--tokens-spacing-spacing-md);
  padding-bottom: var(--tokens-spacing-spacing-md);
  padding-left: 0;
  padding-right: 0;
  align-self: stretch;
  width: 100%;
  flex: 0 0 auto;
  display: flex;
  position: relative;
`;

const Number = styled.div`
  position: relative;
  width: 42px;
  font-family: "Inter", Helvetica, sans-serif;
  font-weight: 500; /* Medium */
  color: var(--tokens-text-heading-main);
  font-size: 1.25rem; /* xl */
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  margin-top: ${({ $expanded }) => ($expanded ? "-1px" : "0")};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: var(--tokens-spacing-spacing-md);
  position: relative;
  flex: 1;
  flex-grow: 1;
`;

const Question = styled.p`
  position: relative;
  align-self: ${({ $expanded }) => ($expanded ? "stretch" : "auto")};
  flex: ${({ $expanded }) => ($expanded ? "none" : "1")};
  margin-top: ${({ $expanded }) => ($expanded ? "-1px" : "0")};
  font-family: "Inter", Helvetica, sans-serif;
  font-weight: 500; /* Medium */
  color: var(--tokens-text-heading-main);
  font-size: 1.25rem; /* xl */
  letter-spacing: 0;
  line-height: normal;
`;

const Answer = styled.p`
  position: relative;
  align-self: stretch;
  font-family: "Inter", Helvetica, sans-serif;
  font-weight: 400; /* Regular */
  color: var(--tokens-text-body-sub);
  font-size: 15px;
  letter-spacing: 0;
  line-height: normal;
`;

const ToggleButton = styled.button`
  gap: 0.625rem; /* gap-2.5 */
  padding: 0.625rem; /* p-2.5 */
  flex: 0 0 auto;
  background-color: var(--tokens-buttons-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: var(--tokens-radius-radius-full);
  cursor: pointer;
`;

const Divider = styled.div`
  position: relative;
  align-self: stretch;
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
`;

const StyledArrowDown = styled(ArrowDown)`
  position: relative !important;
  width: 1.5rem !important; /* w-6 */
  height: 1.5rem !important; /* h-6 */
`;

const StyledArrowUp = styled(ArrowUp)`
  position: relative !important;
  width: 1.5rem !important; /* w-6 */
  height: 1.5rem !important; /* h-6 */
`;

export const FaqSection = () => {
  const [expandedItems, setExpandedItems] = useState([0, 3]);

  const faqData = [
    {
      id: 0,
      number: "01",
      question: "What types of furniture do you offer?",
      answer:
        "We offer a wide range of contemporary furniture including sofas, chairs, tables, beds, storage solutions, and outdoor furniture. Our collection is designed to suit modern aesthetics and functional needs.",
    },
    {
      id: 1,
      number: "02",
      question: "Do you offer international shipping?",
      answer: "",
    },
    {
      id: 2,
      number: "03",
      question: "What is your return policy?",
      answer: "",
    },
    {
      id: 3,
      number: "04",
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and financing options through Affirm. All transactions are secure and encrypted.",
    },
  ];

  const toggleItem = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <Section>
      <ContentWrapper>
        <Header>
          <Title>We have got the answers to your questions!</Title>
        </Header>
        {faqData.map((item) => (
          <FaqItemWrapper
            key={item.id}
            $expanded={expandedItems.includes(item.id)}
          >
            <FaqContent $expanded={expandedItems.includes(item.id)}>
              <Number $expanded={expandedItems.includes(item.id)}>
                {item.number}
              </Number>

              {expandedItems.includes(item.id) ? (
                <TextContainer>
                  <Question $expanded={true}>{item.question}</Question>
                  <Answer>{item.answer}</Answer>
                </TextContainer>
              ) : (
                <Question $expanded={false}>{item.question}</Question>
              )}

              <ToggleButton
                onClick={() => toggleItem(item.id)}
                aria-expanded={expandedItems.includes(item.id)}
                aria-label={`Toggle ${item.question}`}
              >
                {expandedItems.includes(item.id) ? (
                  <StyledArrowDown />
                ) : (
                  <StyledArrowUp />
                )}
              </ToggleButton>
            </FaqContent>
            <Divider />
          </FaqItemWrapper>
        ))}
      </ContentWrapper>
    </Section>
  );
};
