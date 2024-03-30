import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { HeroSectionStyles } from '../../styles/homePage/HeroSectionStyles';
import ParagraphText from '../typography/ParagraphText';
import Button from '../buttons/Button';
import { SectionTitle } from '../typography/Title';

function HeroSection() {
  return (
    <HeroSectionStyles>
      <div className="container">
        <div className="hero__wrapper">
          <div className="left">
            <h1 className="hero__heading">DEMT</h1>
            <ParagraphText className="hero__text">
              Welcome to Disaster and Environmental Management Trust (D.E.M.T.),
              your trusted partner in community-driven development. At D.E.M.T.,
              we believe in the power of grassroots initiatives to drive lasting
              change. Founded in 2019, our organization is dedicated to
              fostering resilience and sustainable development starting from the
              Mashonaland East province of Zimbabwe, propagating outwards. We
              work hand-in-hand with local communities, implementing impactful
              programs in water and sanitation, climate-smart agriculture, and
              infrastructure rehabilitation. Through strategic partnerships with
              local authorities, we empower communities to plan, mitigate, and
              respond to environmental and climate-related challenges. Join us
              in envisioning a future where rural communities thrive, equipped
              with the knowledge and resources to overcome adversity. Together,
              we're building a resilient tomorrow, one community at a time.
            </ParagraphText>
            <SectionTitle>Our Vision</SectionTitle>
            <ParagraphText className="hero__text">
              Creating resilient and sustainably developed communities
            </ParagraphText>
            <ParagraphText className="hero__text">
              Strengthening the capabilities of grassroots communities to
              collectively strategize, mitigate, and respond to a spectrum of
              natural and anthropogenic shocks and hazards.
            </ParagraphText>
            <Button to="/spotlight" tag={Link} className="hero__button">
              Explore Our Work
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
