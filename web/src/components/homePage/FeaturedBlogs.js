import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { FeaturedBlogsStyles } from "../../styles/homePage/FeaturedBlogsStyles";
import BlogGrid from "../blog/BlogGrid";
import ParagraphText from "../typography/ParagraphText";
import { SectionTitle } from "../typography/Title";

const data = useStaticQuery(graphql`
    {
      allSanitySpotlight(filter: { _id: { eq: "spotlightItems" } }) {
        nodes {
          blogs {
            ... on SanityBlog {
              _type 
              id
              title
              publishedAt
              slug { current }
              categories { title, slug { current } }
              coverImage { alt, asset { gatsbyImageData } }
            }
            ... on SanityPublication {
              _type 
              id
              title
              publishedAt: _createdAt
              slug { current }
              coverImage { alt, asset { gatsbyImageData } }
            }
          }
        }
      }
    }
  `);

  const spotlightNode = data.allSanitySpotlight.nodes[0];
  const rawBlogs = spotlightNode?.blogs || [];

  // Map the items and determine the URL prefix based on the Sanity Type
  const spotlightBlogs = rawBlogs.map((item) => ({
    ...item,
    categories: item.categories || [],
    prefix: item._type === "publication" ? "publications" : "spotlight",
  }));

  return (
    <FeaturedBlogsStyles>
      <SectionTitle className="centre__text">Upcoming News, Updates & Events</SectionTitle>
      <ParagraphText className="featuredBlogs__text">
        Stay informed with the latest updates on Diginotive's projects, events, and initiatives.
      </ParagraphText>
      <BlogGrid blogs={spotlightBlogs} />
    </FeaturedBlogsStyles>
  );
}

export default FeaturedBlogs;

/// colors
/// #1ff4b4 - light green, #2c313e - dark bluish, #cbdd46 - gold
