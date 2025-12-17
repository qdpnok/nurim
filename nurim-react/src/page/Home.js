import styled from "styled-components";

const Container = styled.div`
  width: 1440px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  margin-top: 50px;
  background-color: #ffffff;
`;

const Home = () => {
  return (
    <Container>
      <h1>Home</h1>
    </Container>
  );
};

export default Home;
