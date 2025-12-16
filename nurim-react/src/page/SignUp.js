import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";

// --- Styled Components ---
const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 180px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  background-color: white;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SignupCard = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const TitleText = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #333;
`;

const SubText = styled.div`
  color: #666;
`;

const LinkSpan = styled.span`
  color: #2f6364;
  font-weight: 600;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  color: #666;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 0 20px;
  font-size: 16px;
  box-sizing: border-box;
  &:focus {
    border-color: #2f6364;
    outline: none;
  }
`;

const HelperText = styled.p`
  font-size: 12px;
  color: #999;
  margin: 0;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 64px;
  background-color: #2f6364;
  color: white;
  border: none;
  border-radius: 40px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    opacity: 0.9;
  }
`;

// --- Component ---
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await api.post("/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200 || response.status === 201) {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("회원가입 실패. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <SignupCard>
          <Header>
            <TitleText>Create an account</TitleText>
            <SubText>
              Already have an account?
              <LinkSpan onClick={() => navigate("/login")}> Log in</LinkSpan>
            </SubText>
          </Header>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <InputLabel>What should we call you?</InputLabel>
              <StyledInput
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your profile name"
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>What's your email?</InputLabel>
              <StyledInput
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>Create a password</InputLabel>
              <StyledInput
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <HelperText>Use 8 or more characters...</HelperText>
            </InputGroup>

            <InputGroup>
              <InputLabel>Recheck your password</InputLabel>
              <StyledInput
                name="passwordConfirm"
                type="password"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="Re-enter your password"
              />
            </InputGroup>

            <SubmitButton type="submit">Create an account</SubmitButton>
          </Form>
        </SignupCard>
      </ContentWrapper>
    </Container>
  );
};

export default SignUp;
