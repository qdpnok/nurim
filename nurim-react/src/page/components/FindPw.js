import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function FindPw() {
  return (
    <Container>
      <h3>Find Password</h3>
      <p>비밀번호 찾기 기능이 들어갈 화면입니다.</p>
    </Container>
  );
}
