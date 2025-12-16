import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  width: 830px;
  height: 1200px;
  border: 1px solid gray;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 30px;
`;

const LogoBox = styled.div`
  width: 700px;
  height: 80px;
  border: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const P = styled.p`
  width: 700px;
  height: 30px;
`;

const TextBox = styled.p`
  width: 700px;
  height: 42px;
`;

const Input1 = styled.input`
  width: 570px;
  height: 24px;
`;

const Input2 = styled.input`
  width: 660px;
  height: 24px;
`;

const InputBox = styled.div`
  width: 700px;
  height: 45px;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 65px;
  height: 24px;
`;

const SignUp = () => {
  const [userName, setUserName] = useState();

  return (
    <Container>
      <LogoBox>
        <P>로고자리임.</P>
      </LogoBox>
      <P>회원가입</P>
      <TextBox>
        <p>누림 계정을 생성해주세요</p>
      </TextBox>
      <P>이름</P>
      <InputBox>
        <Input1
          type="text"
          placeholder="이름입력"
          value={userName}
          onChange={(e) => e.target.value}
        />
        <Button>중복확인</Button>
      </InputBox>
      <InputBox>
        <Input2 type="text" placeholder="" />
      </InputBox>
    </Container>
  );
};

export default SignUp;
