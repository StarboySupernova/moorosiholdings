import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { HeroSectionStyles } from "../../styles/homePage/HeroSectionStyles";
import ParagraphText from "../typography/ParagraphText";
import Button from "../buttons/Button";

function HeroSection() {
  return (
    <HeroSectionStyles>
      <div className="container">
        <div className="hero__wrapper">
          <div className="left">
            <h1 className="hero__heading">
              Delivering Excellence in Logistics, Construction & Facilities Management
            </h1>
            <ParagraphText className="hero__text">
              "Moorosi Holdings and Logistics provides reliable, scalable, and compliance-driven solutions. From abnormal load transport and civil engineering to fully integrated soft and hard building maintenance, we empower South African infrastructure."
            </ParagraphText>
            <Button to="/activities" tag={Link} className="hero__button">
              Explore Our Services
            </Button>
          </div>
          <div className="right">
            <StaticImage
              className="hero__image"
              src="../../images/demtMalnutrition.jpg" /* Note: Remember to swap this image file in your repo later! */
              alt="Moorosi Holdings Heavy Logistics"
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
