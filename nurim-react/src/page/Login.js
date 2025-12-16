import styled from "styled-components";

const Container = styled.div`
  width: 1280px;
  height: auto;
  margin: 0 auto;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 460px;
  height: 640px;
  background-color: white;
  border: 1px solid gray;
  margin: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
`;

const LoginInput = styled.input`
  width: 420px;
  height: 45px;
`;

const Login = () => {
  return (
    <Container>
      <LoginContainer>
        <p>이메일</p>
        <br />
        <LoginInput type="text" placeholder="email@example.com" />
        <br />
        <p>패스워드</p>
        <LoginInput type="password" placeholder="비밀번호를 입력해주세요" />
        <p>
          10자 이상, 영문+숫자+특수문자(!@#$%^&*()_+-=) 조합으로 입력해주세요
        </p>
      </LoginContainer>
    </Container>
  );
};

export default Login;
