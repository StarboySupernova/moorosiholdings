import React from 'react';
import { BlogGridStyles } from '../../styles/blog/BlogGridStyles';
import BlogItem from './BlogItem';

function BlogGrid({ blogs }) {
  return (
    <BlogGridStyles>
      {blogs &&
        blogs.map((blog) => (
          <BlogItem
            key={blog.id}
            path={blog.slug?.current}
            title={blog.title}
            categories={blog.categories}
            image={
              blog.coverImage?.asset
                ? {
                    imageData: blog.coverImage.asset.gatsbyImageData,
                    altText: blog.coverImage.alt,
                  }
                : null
            }
            publishedAt={blog.publishedAt}
          />
        ))}
    </BlogGridStyles>
  );
}

export default BlogGrid;