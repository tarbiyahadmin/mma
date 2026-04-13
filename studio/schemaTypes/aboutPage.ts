import { defineField, defineType } from 'sanity'
import { seoFields } from './seo'

export const aboutPage = defineType({
  name: 'aboutPage',
  type: 'document',
  title: 'About Page',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections (ordered)',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'aboutStorySection',
          title: 'Our Story',
          fields: [
            defineField({ name: 'headline', type: 'string', title: 'Headline', initialValue: 'Our Story' }),
            defineField({ name: 'bodyCopy', type: 'text', title: 'Body Copy', rows: 7 }),
          ],
        },
        {
          type: 'object',
          name: 'aboutMissionVisionSection',
          title: 'Mission & Vision',
          fields: [
            defineField({ name: 'headline', type: 'string', title: 'Headline', initialValue: 'Our Mission & Vision' }),
            defineField({ name: 'mission', type: 'text', title: 'Mission', rows: 4 }),
            defineField({ name: 'vision', type: 'text', title: 'Vision', rows: 4 }),
          ],
        },
        {
          type: 'object',
          name: 'aboutValuesSection',
          title: 'Our Values',
          fields: [
            defineField({ name: 'headline', type: 'string', title: 'Headline', initialValue: 'Our Values' }),
            defineField({ name: 'items', type: 'array', title: 'Values', of: [{ type: 'iconItem' }] }),
          ],
        },
        {
          type: 'object',
          name: 'aboutTeamSection',
          title: 'Meet the Team',
          fields: [
            defineField({ name: 'headline', type: 'string', title: 'Headline', initialValue: 'Meet the Team' }),
            defineField({ name: 'subtext', type: 'text', title: 'Subtext', rows: 3 }),
            defineField({ name: 'members', type: 'array', title: 'Team Members', of: [{ type: 'teamMember' }] }),
          ],
        },
        {
          type: 'object',
          name: 'aboutFaqSection',
          title: 'FAQ',
          fields: [
            defineField({ name: 'headline', type: 'string', title: 'Headline', initialValue: 'FAQ' }),
            defineField({ name: 'faqs', type: 'array', title: 'FAQs', of: [{ type: 'faqItem' }] }),
          ],
        },
      ],
    }),
    ...seoFields,
  ],
})

