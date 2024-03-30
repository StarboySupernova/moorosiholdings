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
      <SectionTitle className="centre__text">
        Upcoming News, Updates & Events
      </SectionTitle>
      <ParagraphText className="featuredBlogs__text">
        Stay informed with the latest updates on Disaster and Environmental
        Management Trust's projects, events, and initiatives in rural
        development.
      </ParagraphText>
      <BlogGrid blogs={spotlightBlogs} />
    </FeaturedBlogsStyles>
  );
}

export default FeaturedBlogs;

/// colors
/// #1ff4b4 - light green, #2c313e - dark bluish, #cbdd46 - gold
