import { defineField, defineType } from 'sanity'
import { seoFields } from './seo'

export const programsPage = defineType({
  name: 'programsPage',
  type: 'document',
  title: 'Programs Page',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow (optional)',
      group: 'content',
      description: 'Small label above the heading. Hidden if empty.',
    }),
    defineField({ name: 'heading', type: 'string', title: 'Heading', group: 'content', initialValue: 'Our Programs' }),
    defineField({ name: 'subheading', type: 'text', title: 'Subheading', group: 'content', rows: 3 }),
    defineField({
      name: 'programCards',
      type: 'array',
      title: 'Program Cards (optional override)',
      group: 'content',
      description:
        'If empty, the site lists up to six Program documents (with a slug). Prefer “Program card (from document)” for correct links and images; legacy “Image card” is still supported (set Link to /programs/your-slug).',
      of: [{ type: 'programListCard' }, { type: 'imageCard' }],
    }),
    ...seoFields,
  ],
})
