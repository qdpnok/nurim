import React from "react";
import styled from "styled-components";
import mainBanner1 from "../../../img/main_banner.jpg";

const Section = styled.section`
  width: 100%;
  height: 800px;
  position: relative;
  background-color: white;
  overflow: hidden; /* Prevent overflow */

  @media (max-width: 768px) {
    height: 600px;
  }
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const OverlayBox = styled.div`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%); /* Vertically center */
  width: 45%;
  max-width: 645px;
  padding: 40px;
  background-color: #0000004c;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  color: white;

  @media (max-width: 768px) {
    width: 80%;
    left: 10%;
  }
`;

const Title = styled.h1`
  font-family: "Poppins", Helvetica, sans-serif;
  font-weight: 700;
  font-size: clamp(24px, 4vw, 35px); /* Responsive font size */
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-family: "Poppins", Helvetica, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 40px;
`;

const StartButton = styled.button`
  all: unset;
  padding: 15px 40px;
  background-color: white;
  border-radius: 15px;
  cursor: pointer;
  color: #2f6364;
  font-weight: 600;
  font-family: "Poppins", sans-serif;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

export const HeroSection = () => {
  return (
    <Section>
      <BannerImg src={mainBanner1} alt="Banner" />
      <OverlayBox>
        <Title>Experiences beyond ownership</Title>
        <Description>
          NURIM is not simply a "rental service" that lends products; it's a
          lifestyle partner that allows customers to fully "enjoy" the value and
          experience they gain from these products.
        </Description>
        <StartButton>Start Now</StartButton>
      </OverlayBox>
    </Section>
  );
};
