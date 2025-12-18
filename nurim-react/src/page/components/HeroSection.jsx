import React from "react";
import styled from "styled-components";
import mainBanner1 from "../../img/main_banner.jpg";
const rectangle1 = "https://placehold.co/100x443";

const Section = styled.section`
  width: 1440px;
  height: 800px;
  position: relative;
  background-color: white;
  margin: 0 auto;
  margin-top: 30px;
`;

const BackgroundImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 1440px;
  height: 748px;
  object-fit: cover;
`;

const BannerImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 1440px;
  height: 800px;
  aspect-ratio: 1.5;
  object-fit: cover;
`;

const OverlayBox = styled.div`
  position: absolute;
  top: 340px;
  left: 140px;
  width: 645px;
  height: 306px;
  background-color: #0000004c;
  border-radius: 20px;
  backdrop-filter: blur(10px) brightness(100%);
  -webkit-backdrop-filter: blur(10px) brightness(100%);
`;

const Title = styled.h1`
  position: absolute;
  top: 377px;
  left: 184px;
  width: 574px;
  font-family: "Poppins", Helvetica, sans-serif;
  font-weight: 700; /* Bold */
  color: white;
  font-size: 35px;
  letter-spacing: 0;
  line-height: 49px;
`;

const Description = styled.p`
  position: absolute;
  top: 445px;
  left: 184px;
  width: 448px;
  font-family: "Poppins", Helvetica, sans-serif;
  font-weight: 400; /* Regular */
  color: white;
  font-size: 1rem; /* text-base */
  letter-spacing: 0;
  line-height: 28.2px;
`;

const StartButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  width: 114px;
  height: 2rem; /* h-8 */
  align-items: center;
  justify-content: center;
  gap: 0.625rem; /* gap-2.5 */
  padding: 1.25rem 4.375rem; /* px-[70px] py-5 */
  position: absolute;
  top: 584px;
  left: 184px;
  background-color: white;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px white, 0 0 0 4px transparent;
  }
`;

const ButtonText = styled.span`
  position: relative;
  width: fit-content;
  margin-top: -15.5px;
  margin-bottom: -13.5px;
  margin-left: -50px;
  margin-right: -50px;
  font-family: "Poppins", Helvetica, sans-serif;
  font-weight: 600;
  color: #2f6364;
  font-size: 15px;
  letter-spacing: 0;
  line-height: 21px;
  white-space: nowrap;
`;

const DecorLineVertical = styled.div`
  position: absolute;
  top: 0;
  left: 458px;
  width: 26px;
  height: 340px;
  background-color: #d9d9d9;
`;

const DecorLineHorizontal = styled.div`
  position: absolute;
  top: 439px;
  left: 0;
  width: 140px;
  height: 13px;
  background-color: #d9d9d9;
`;

export const HeroSection = () => {
  return (
    <Section>
      <BackgroundImg src={rectangle1} alt="Background decoration" />
      <BannerImg
        src={mainBanner1}
        alt="Modern apartment interior showcasing rental lifestyle"
      />
      <OverlayBox />
      <Title>Experiences beyond ownership</Title>
      <Description>
        NURIM is not simply a "rental service" that lends products; it's a
        lifestyle partner that allows customers to fully "enjoy" the value and
        experience they gain from these products.
      </Description>
      <StartButton aria-label="Start exploring NURIM rental services">
        <ButtonText>Start Now</ButtonText>
      </StartButton>
      <DecorLineVertical aria-hidden="true" />
      <DecorLineHorizontal aria-hidden="true" />
    </Section>
  );
};
