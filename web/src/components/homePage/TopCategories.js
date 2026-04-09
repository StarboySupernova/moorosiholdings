import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { TopCategoriesStyles } from "../../styles/homePage/TopCategoriesStyles";
// import CategoryGrid from '../category/CategoryGrid';
import ActivityGrid from "../category/ActivityGrid";
import ParagraphText from "../typography/ParagraphText";
import { SectionTitle } from "../typography/Title";
import ValueGrid from "../category/ValueGrid";
import ObjectiveGrid from "../category/ObjectiveGrid";

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
      allSanityObjective {
        nodes {
          id
          _rawDescription
        }
      }
      allSanityValue {
        nodes {
          id
          _rawDescription
        }
      }
    }
  `);
  const activities = data.allSanitySpotlight.nodes[0].activity;
  const objectives = data.allSanityObjective.nodes;
  const DiginotiveValues = data.allSanityValue.nodes;

  return (
    <TopCategoriesStyles>
      <SectionTitle className="centre__text">Vision</SectionTitle>
      <ParagraphText className="hero__text centre__text">
        Creating resilient and sustainably developed communities
      </ParagraphText>
      <SectionTitle className="centre__text">Mission</SectionTitle>
      <ParagraphText className="hero__text centre__text">
        Strengthening the capabilities of grassroots communities to collectively
        strategize, mitigate, and respond to a spectrum of natural and
        anthropogenic shocks and hazards.
      </ParagraphText>
      <SectionTitle className="centre__text">Our Values</SectionTitle>
      <ValueGrid DiginotiveValues={DiginotiveValues} />
      <SectionTitle className="centre__text">Our Objectives</SectionTitle>
      <ObjectiveGrid objectives={objectives} />
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

// https://0wfqubi4.api.sanity.io/v1/graphql/production/default
