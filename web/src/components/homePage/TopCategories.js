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
  const spotlightNode = data.allSanitySpotlight.nodes[0];
  const activities = spotlightNode?.activity || [];
  const objectives = data.allSanityObjective?.nodes || [];
  const DiginotiveValues = data.allSanityValue?.nodes || [];

  return (
    <TopCategoriesStyles>
      <SectionTitle className="centre__text">Vision</SectionTitle>
      <ParagraphText className="hero__text centre__text">
        To be the premier partner in infrastructure development, heavy logistics, and facility management across South Africa, driving operational excellence.
      </ParagraphText>
      <SectionTitle className="centre__text">Mission</SectionTitle>
      <ParagraphText className="hero__text centre__text">
        To deliver safe, reliable, and high-quality services in construction, transport, and facility maintenance, tailored to the dynamic needs of the public and private sectors.
      </ParagraphText>
      <SectionTitle className="centre__text">Our Values</SectionTitle>
      <ValueGrid DiginotiveValues={DiginotiveValues} />
      <SectionTitle className="centre__text">Our Objectives</SectionTitle>
      <ObjectiveGrid objectives={objectives} />
      <SectionTitle className="centre__text">Core Capabilities</SectionTitle>
      <ParagraphText className="centre__text">
        Mining Support, Civil Engineering, Heavy Plant Logistics, and Complete Hard/Soft Facilities Management.
      </ParagraphText>
      <ActivityGrid activities={activities} />
    </TopCategoriesStyles>
  );
}

export default TopCategories;

// https://0wfqubi4.api.sanity.io/v1/graphql/production/default
