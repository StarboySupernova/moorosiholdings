import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { TopCategoriesStyles } from '../../styles/homePage/TopCategoriesStyles';
// import CategoryGrid from '../category/CategoryGrid';
import ActivityGrid from '../category/ActivityGrid';
import ParagraphText from '../typography/ParagraphText';
import { SectionTitle } from '../typography/Title';

function TopCategories() {
  const data = useStaticQuery(graphql`
    {
      allSanitySpotlight(filter: { _id: { eq: "spotlightItems" } }) {
        nodes {
          activity {
            id
            title
            slug {
              current
            }
            _rawDescription
          }
        }
      }
    }
  `);
  const activities = data.allSanitySpotlight.nodes[0].activity;
  return (
    <TopCategoriesStyles>
      <SectionTitle className="centre__text">Our Vision</SectionTitle>
      <ParagraphText className="hero__text centre__text">
        Creating resilient and sustainably developed communities
      </ParagraphText>
      <SectionTitle className="centre__text">Our Mission</SectionTitle>
      <ParagraphText className="hero__text centre__text">
        Strengthening the capabilities of grassroots communities to collectively
        strategize, mitigate, and respond to a spectrum of natural and
        anthropogenic shocks and hazards.
      </ParagraphText>
      <SectionTitle>Core Initiatives</SectionTitle>
      <ParagraphText>
        Catalyzing Community & Grassroot Sustainability: Our Impactful
        Interventions
      </ParagraphText>
      <ActivityGrid activities={activities} />
    </TopCategoriesStyles>
  );
}

export default TopCategories;
