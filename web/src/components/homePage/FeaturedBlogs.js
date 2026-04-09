import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { FeaturedBlogsStyles } from "../../styles/homePage/FeaturedBlogsStyles";
import BlogGrid from "../blog/BlogGrid";
import ParagraphText from "../typography/ParagraphText";
import { SectionTitle } from "../typography/Title";

function FeaturedBlogs() {
  const data = useStaticQuery(graphql`
    {
      allSanitySpotlight(filter: { _id: { eq: "spotlightItems" } }) {
        nodes {
          blogs {
            ... on SanityBlog {
              id
              title
              publishedAt
              slug {
                current
              }
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
            ... on SanityPublication {
              id
              title
              # Publications don't have categories in our schema,
              # so we provide an empty array to prevent the UI from crashing
              publishedAt: _createdAt
              slug {
                current
              }
              coverImage {
                alt
                asset {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `);
  const spotlightBlogs = data.allSanitySpotlight.nodes[0].blogs.map((item) => ({
    ...item,
    categories: item.categories || [], // Default to empty array for Publications
  }));
  return (
    <FeaturedBlogsStyles>
      <SectionTitle className="centre__text">
        Upcoming News, Updates & Events
      </SectionTitle>
      <ParagraphText className="featuredBlogs__text">
        Stay informed with the latest updates on Diginotive's projects, events,
        and initiatives in tech development.
      </ParagraphText>
      <BlogGrid blogs={spotlightBlogs} />
    </FeaturedBlogsStyles>
  );
}

export default FeaturedBlogs;

/// colors
/// #1ff4b4 - light green, #2c313e - dark bluish, #cbdd46 - gold
