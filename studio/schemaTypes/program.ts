import { defineType, defineField } from 'sanity';
import { seoFields } from './seo';

export const program = defineType({
  name: 'program',
  type: 'document',
  title: 'Program',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      group: 'content',
      description: 'URL segment for this program. Page will be at /programs/{slug} (e.g. hifz-intensive).',
      validation: (r) => r.required(),
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({ name: 'title', type: 'string', title: 'Title', group: 'content', validation: (r) => r.required() }),
    defineField({ name: 'heroSubheading', type: 'text', title: 'Hero Subheading', group: 'content', rows: 3 }),
    defineField({ name: 'heroCta', type: 'ctaButton', title: 'Hero CTA', group: 'content' }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description (for cards)',
      group: 'content',
      description: 'Brief summary shown on the Programs listing page.',
      rows: 2,
    }),
    defineField({
      name: 'comingSoon',
      type: 'boolean',
      title: 'Coming soon',
      group: 'content',
      initialValue: false,
      description:
        'When enabled, program cards show a Coming soon state: no link, muted styling, and no hover. The program page URL still exists if someone has the link.',
    }),
    defineField({
      name: 'listingOrder',
      type: 'number',
      title: 'Order on Programs page',
      group: 'content',
      initialValue: 0,
      validation: (r) => r.integer().min(0),
      description: 'Lower numbers appear first on /programs only. When tied, programs are sorted by title.',
    }),
    defineField({ name: 'overview', type: 'text', title: 'Program Overview', group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'keyBenefits',
      type: 'array',
      title: 'Key Benefits',
      group: 'content',
      of: [{ type: 'iconItem' }],
      description: 'Title and description only (no images).',
    }),
    defineField({
      name: 'structure',
      type: 'array',
      title: 'Structure / How It Works',
      group: 'content',
      of: [{ type: 'numberedStep' }],
    }),
    defineField({
      name: 'cohortStatus',
      type: 'object',
      title: 'Cohort status',
      group: 'content',
      description: 'Controls whether upcoming sessions are shown or the waitlist empty state is shown.',
      fields: [
        defineField({
          name: 'state',
          type: 'string',
          title: 'Status',
          initialValue: 'open',
          options: {
            list: [
              { title: 'Open (has active cohort)', value: 'open' },
              { title: 'Closed (no active cohort)', value: 'closed' },
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
        }),
        defineField({
          name: 'nextIntake',
          type: 'string',
          title: 'Next intake (optional)',
          description: 'Short text such as "Next intake: Fall 2026".',
        }),
        defineField({
          name: 'waitlistCta',
          type: 'ctaButton',
          title: 'Waitlist / notify CTA (optional)',
          description: 'Shown in the empty state when status is closed.',
        }),
      ],
    }),
    defineField({
      name: 'eventsSection',
      type: 'array',
      title: 'Upcoming sessions',
      group: 'content',
      description: 'Session cards shown only while status is open.',
      of: [{ type: 'programEventItem' }],
    }),
    defineField({
      name: 'ctaSections',
      type: 'array',
      title: 'CTA Sections Throughout',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'subtitle', type: 'text', title: 'Subtitle', rows: 3 }),
            defineField({ name: 'buttons', type: 'array', title: 'Buttons', of: [{ type: 'ctaButton' }] }),
          ],
        },
      ],
    }),
    defineField({
      name: 'tableSection',
      type: 'object',
      title: 'Table section (optional)',
      group: 'content',
      description: 'Structured rows with title and text. Omitted on the site if empty.',
      fields: [
        defineField({
          name: 'rows',
          type: 'array',
          title: 'Rows',
          of: [{ type: 'programTableRow' }],
        }),
      ],
    }),
    defineField({
      name: 'formatCardsSection',
      type: 'array',
      title: 'Format cards (side-by-side)',
      group: 'content',
      description: 'Optional cards with title and description only.',
      of: [{ type: 'programFormatCard' }],
    }),
    defineField({
      name: 'faqsSection',
      type: 'array',
      title: 'FAQs',
      group: 'content',
      description: 'Optional question and answer list.',
      of: [{ type: 'faqItem' }],
    }),
    ...seoFields,
  ],
});
