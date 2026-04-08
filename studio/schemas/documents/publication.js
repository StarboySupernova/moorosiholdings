// studio/schemas/documents/publication.js
import { FcLibrary } from 'react-icons/fc';

export default {
  name: 'publication',
  title: 'Publication & Books',
  type: 'document',
  icon: FcLibrary,
  fields: [
    { name: 'title', title: 'Book/Series Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    {
      name: 'author',
      title: 'Author/Team',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    { name: 'coverImage', title: 'Book Cover', type: 'customImage' },
    {
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'string',
      description: 'e.g., Policymakers, Primary Students, General Public',
    },
    { name: 'description', title: 'Synopsis', type: 'richText' },
  ],
};
