import { defineField, defineType } from 'sanity'
import { seoFields } from './seo'

export const homepage = defineType({
  name: 'homepage',
  type: 'document',
  title: 'Homepage',
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
          name: 'homeHeroSection',
          title: 'Hero Section',
          fields: [
            defineField({
              name: 'eyebrow',
              type: 'string',
              title: 'Eyebrow (optional)',
              description: 'Small label above the heading. Hidden if empty.',
            }),
            defineField({ name: 'heading', type: 'string', title: 'Heading', validation: (r) => r.required() }),
            defineField({ name: 'subheading', type: 'text', title: 'Subheading', rows: 3 }),
            defineField({ name: 'primaryCta', type: 'ctaButton', title: 'Primary CTA' }),
            defineField({ name: 'secondaryCta', type: 'ctaButton', title: 'Secondary CTA' }),
          ],
        },
        {
          type: 'object',
          name: 'homeProblemSection',
          title: 'The Problem We Solve',
          fields: [
            defineField({
              name: 'eyebrow',
              type: 'string',
              title: 'Eyebrow (optional)',
              description: 'Small label above the headline. Hidden if empty.',
            }),
            defineField({ name: 'headline', type: 'string', title: 'Headline', validation: (r) => r.required() }),
            defineField({ name: 'bodyCopy', type: 'text', title: 'Body Copy', rows: 5 }),
          ],
        },
        {
          type: 'object',
          name: 'homeProgramsSection',
          title: 'Our Programs',
          fields: [
            defineField({
              name: 'eyebrow',
              type: 'string',
              title: 'Eyebrow (optional)',
              description: 'Small label above the headline. Hidden if empty.',
            }),
            defineField({ name: 'headline', type: 'string', title: 'Headline', initialValue: 'Our Programs' }),
            defineField({
              name: 'cards',
              type: 'array',
              title: 'Cards',
              description: 'Text-only on the site. Legacy image cards are accepted; images are not shown.',
              of: [{ type: 'textLinkCard' }, { type: 'imageCard' }],
            }),
          ],
        },
        {
          type: 'object',
          name: 'homeDifferenceSection',
          title: 'What Makes MMA Different',
          fields: [
            defineField({
              name: 'eyebrow',
              type: 'string',
              title: 'Eyebrow (optional)',
              description: 'Small label above the headline. Hidden if empty.',
            }),
            defineField({ name: 'headline', type: 'string', title: 'Headline', initialValue: 'What Makes MMA Different' }),
            defineField({ name: 'items', type: 'array', title: 'Items', of: [{ type: 'iconItem' }] }),
          ],
        },
      ],
    }),
    ...seoFields,
  ],
})
