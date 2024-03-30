import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { FeaturedBlogsStyles } from '../../styles/homePage/FeaturedBlogsStyles';
import BlogGrid from '../blog/BlogGrid';
import ParagraphText from '../typography/ParagraphText';
import { SectionTitle } from '../typography/Title';

function FeaturedBlogs() {
  const data = useStaticQuery(graphql`
    {
      allSanitySpotlight(filter: { _id: { eq: "spotlightItems" } }) {
        nodes {
          blogs {
            id
            title
            publishedAt
            categories {
              title
              slug {
                current
              }
            }
            coverImage {
              alt
              asset {
                gatsbyImageData
              }
            }
            slug {
              current
            }
          }
        }
      }
    }
  `);
  const spotlightBlogs = data.allSanitySpotlight.nodes[0].blogs;
  return (
    <FeaturedBlogsStyles>
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
      <SectionTitle className="centre__text">
        Upcoming News, Updates & Events
      </SectionTitle>
      <BlogGrid blogs={spotlightBlogs} />
    </FeaturedBlogsStyles>
  );
}

export default FeaturedBlogs;

/// colors
/// #1ff4b4 - light green, #2c313e - dark bluish, #cbdd46 - gold
