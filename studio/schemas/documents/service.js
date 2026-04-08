import { FcServices } from 'react-icons/fc';

export default {
  name: 'activity', // Keeping 'activity' prevents breaking existing Gatsby GraphQL queries
  title: 'Service / R&D Pillar', // Changes how it looks in Sanity Studio
  type: 'document',
  icon: FcServices,
  fields: [
    { name: 'title', title: 'Service Name', type: 'string' },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    { name: 'coverImage', title: 'Cover Image', type: 'customImage' },
    { name: 'description', title: 'Short Description', type: 'normalText' },
    { name: 'body', title: 'Full Service Details', type: 'richText' }, // Added richText for deep dives
  ],
  preview: {
    select: {
      title: 'title',
      image: 'coverImage',
      slug: 'slug',
    },
    prepare({ title, image, slug }) {
      return {
        title,
        media: image,
        subtitle: slug.current,
      };
    },
  },
};
