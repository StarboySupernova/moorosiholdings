import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { HeroSectionStyles } from '../../styles/homePage/HeroSectionStyles';
import ParagraphText from '../typography/ParagraphText';
import Button from '../buttons/Button';

function HeroSection() {
  return (
    <HeroSectionStyles>
      <div className="container">
        <div className="hero__wrapper">
          <div className="left">
            <h1 className="hero__heading">
              Empowering Every Zimbabwean with the Intelligence of Tomorrow
            </h1>
            <ParagraphText className="hero__text">
              "Diginotive Solutions (Private) Limited is a Zimbabwe-based
              Research and Development company specialising in ICT, educational
              technology, and AI content development. We empower businesses and
              organisations through innovative problem-solving rooted in
              thorough research and custom technological solutions tailored to
              the African context."
            </ParagraphText>
            <Button to="/spotlight" tag={Link} className="hero__button">
              Explore Our Latest Work
            </Button>
          </div>
          <div className="right">
            <StaticImage
              className="hero__image"
              src="../../images/DiginotiveMalnutrition.jpg"
              alt="Diginotive hero image"
              placeholder="blurred"
              objectPosition="50% 30%"
            />
          </div>
        </div>
      </div>
    </HeroSectionStyles>
  );
}

export default HeroSection;
