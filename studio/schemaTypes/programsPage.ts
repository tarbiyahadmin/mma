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
    defineField({ name: 'heading', type: 'string', title: 'Heading', group: 'content', initialValue: 'Our Programs' }),
    defineField({ name: 'subheading', type: 'text', title: 'Subheading', group: 'content', rows: 3 }),
    ...seoFields,
  ],
})
