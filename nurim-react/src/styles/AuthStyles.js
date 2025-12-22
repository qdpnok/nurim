// src/styles/AuthStyles.js
import styled, { createGlobalStyle, css } from "styled-components";
import { Link } from "react-router-dom";

// ==========================================
// 1. Global Styles (전역 스타일 정의)
// ==========================================
export const GlobalStyle = createGlobalStyle`
  :root {
    --primitives-color-brand-50: rgba(248, 247, 251, 1);
    --primitives-color-grey-50: rgba(255, 255, 255, 1);
    --primitives-color-grey-500: rgba(95, 105, 128, 1);
    --primitives-color-grey-800: rgba(46, 47, 51, 1);
    --primitives-radius-3xl: 300px;
    --primitives-radius-3xl-duplicate: 300px;
    --primitives-radius-sm: 6px;
    --primitives-spacing-1: 8px;
    --primitives-spacing-10: 80px;
    --primitives-spacing-12: 96px;
    --primitives-spacing-3: 24px;
    --primitives-spacing-4: 32px;
    --primitives-spacing-6: 48px;
    --primitives-spacing-8: 64px;
    --tokens-background-primary: var(--primitives-color-grey-50);
    --tokens-buttons-secondary: var(--primitives-color-brand-50);
    --tokens-radius-radius-full: var(--primitives-radius-3xl);
    --tokens-radius-radius-fully-rounded: var(--primitives-radius-3xl-duplicate);
    --tokens-radius-radius-minimal: var(--primitives-radius-sm);
    --tokens-spacing-spacing-2xl: var(--primitives-spacing-8);
    --tokens-spacing-spacing-3xl: var(--primitives-spacing-10);
    --tokens-spacing-spacing-lg: var(--primitives-spacing-4);
    --tokens-spacing-spacing-md: var(--primitives-spacing-3);
    --tokens-spacing-spacing-sm: var(--primitives-spacing-1);
    --tokens-spacing-spacing-xl: var(--primitives-spacing-6);
    --tokens-text-body-sub: var(--primitives-color-grey-500);
    --tokens-text-heading-main: var(--primitives-color-grey-800);
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', 'Poppins', Helvetica, sans-serif; /* Poppins 추가 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button,
  input,
  select,
  textarea {
    appearance: none;
    background: transparent;
    border: 0;
    outline: none;
    font-family: inherit;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

// ==========================================
// 2. Auth Page Components (로그인/회원가입 등)
// ==========================================

export const Container = styled.div`
  width: 1440px;
  height: 1024px;
  background-color: var(--tokens-background-primary, #ffffff);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -140px; /* 헤더 높이 고려 */
`;

export const Card = styled.div`
  width: 100%;
  max-width: 1440px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
`;

export const Content = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-top: 60px;
`;

export const Header = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: var(--tokens-text-heading-main, #333);
  margin: 0;
`;

export const SubText = styled.div`
  font-size: 16px;
  color: var(--tokens-text-body-sub, #888);
`;

export const LinkSpan = styled(Link)`
  color: #2f6364;
  font-weight: 600;
  text-decoration: none;
  margin-left: 6px;
`;

// --- Form Elements ---

export const FormSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 15px;
  color: #555;
  font-weight: 500;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 52px;
  border: 1px solid #ddd;
  border-radius: var(--tokens-radius-radius-minimal, 8px);
  padding: 0 16px;
  font-size: 15px;
  color: var(--tokens-text-heading-main, #333);
  transition: border-color 0.2s;
  background-color: ${(props) => (props.readOnly ? "#fafafa" : "white")};
  border-color: ${(props) => (props.readOnly ? "#f0f0f0" : "#ddd")};

  &::placeholder {
    color: #c0c0c0;
  }
  &:focus {
    border-color: #2f6364;
  }
`;

export const HelperText = styled.p`
  font-size: 13px;
  color: ${(props) => (props.$valid ? "#2f6364" : "#888")};
  margin: 0;
  line-height: 1.4;
`;

export const ErrorText = styled.p`
  font-size: 13px;
  color: #e74c3c;
  margin: 0;
`;

export const ResendLink = styled.span`
  font-size: 13px;
  color: #666;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #2f6364;
  }
`;

// --- Buttons ---

export const AuthButton = styled.button`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #2f6364;
  border-radius: var(--tokens-radius-radius-minimal, 8px);
  color: #2f6364;
  font-weight: 600;
  cursor: pointer;
  background-color: white;
  transition: all 0.2s;

  &:hover {
    background-color: #f0fcfc;
  }

  ${(props) =>
    props.disabled &&
    css`
      border-color: #ddd;
      color: #aaa;
      cursor: not-allowed;
      &:hover {
        background-color: white;
      }
    `}
`;

export const SmallBtn = styled.button`
  position: absolute;
  right: 8px;
  top: 38px;
  padding: 6px 12px;
  background: #2f6364;
  color: white;
  border-radius: var(--tokens-radius-radius-minimal, 6px);
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background: #244f50;
  }
`;

export const NextButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: #2f6364;
  border-radius: var(--tokens-radius-radius-minimal, 8px);
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #244f50;
  }
`;

// --- Stepper ---

export const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const StepperItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
`;

export const Circle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#2f6364" : "#e0e0e0")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s;
`;

export const StepText = styled.span`
  font-size: 14px;
  color: ${(props) => (props.$active ? "#333" : "#aaa")};
  font-weight: ${(props) => (props.$active ? 600 : 400)};
`;

export const Line = styled.div`
  flex: 1;
  height: 2px;
  background-color: ${(props) => (props.$active ? "#2f6364" : "#e0e0e0")};
  margin: 0 10px;
  transform: translateY(-14px);
  transition: background-color 0.3s;
`;

// --- Modal ---

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  width: 535px;
  height: 428px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #2f6364;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;

  &::after {
    content: "";
    display: block;
    width: 20px;
    height: 36px;
    border: solid #2f6364;
    border-width: 0 5px 5px 0;
    transform: rotate(45deg);
    margin-top: -8px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
  text-align: center;
`;

export const ModalDesc = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 40px 0;
  text-align: center;
  line-height: 1.5;
`;

export const ModalButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: #2f6364;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #244f50;
  }
`;

// --- 기타 ---
export const Description = styled.p`
  font-size: 16px;
  color: #333;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 30px;
  white-space: pre-wrap;
  b {
    font-weight: 700;
  }
`;

export const ResultBox = styled.div`
  text-align: center;
  margin-top: 40px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;

  h3 {
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: #666;
  }
`;
