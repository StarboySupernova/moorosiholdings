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
              Empowering sustainability through grassroots-driven
              environmentally friendly intervention methods
            </h1>
            <ParagraphText className="hero__text">
              We proactively leverage cutting edge solutions & collective effort
              to compliment and augment the capacity of vulnerable rural
              populations to envision and construct a resilient, environmentally
              sustainable future, one community at a time.
            </ParagraphText>
            <Button to="/spotlight" tag={Link} className="hero__button">
              Explore Our Latest Work
            </Button>
          </div>
          <div className="right">
            <StaticImage
              className="hero__image"
              src="../../images/demtMalnutrition.jpg"
              alt="DEMT hero image"
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
