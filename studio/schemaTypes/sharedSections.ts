import { defineField, defineType } from 'sanity'

export const ctaButton = defineType({
  name: 'ctaButton',
  title: 'CTA Button',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', title: 'Label', validation: (r) => r.required() }),
    defineField({ name: 'to', type: 'string', title: 'Link', validation: (r) => r.required() }),
    defineField({ name: 'isExternal', type: 'boolean', title: 'External link', initialValue: false }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Variant',
      initialValue: 'primary',
      options: { list: [{ title: 'Primary', value: 'primary' }, { title: 'Accent', value: 'accent' }] },
    }),
  ],
})

/** Pick a program document — frontend builds `/programs/{slug}`. */
export const programListCard = defineType({
  name: 'programListCard',
  title: 'Program card (from document)',
  type: 'object',
  fields: [
    defineField({
      name: 'program',
      type: 'reference',
      title: 'Program',
      to: [{ type: 'program' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title override',
      description: 'Optional. Defaults to the program title.',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description override',
      rows: 2,
      description: 'Optional. Defaults to the program short description.',
    }),
    defineField({ name: 'linkLabel', type: 'string', title: 'Link label' }),
  ],
})

/** Text-only card for homepage program teasers (no image). */
export const textLinkCard = defineType({
  name: 'textLinkCard',
  title: 'Text link card',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
    defineField({ name: 'link', type: 'string', title: 'Link' }),
    defineField({ name: 'linkLabel', type: 'string', title: 'Link Label' }),
  ],
})

export const iconItem = defineType({
  name: 'iconItem',
  title: 'Icon Item',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
  ],
})

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'object',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'string', title: 'Role' }),
    defineField({ name: 'bio', type: 'text', title: 'Bio', rows: 3 }),
  ],
})

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({ name: 'question', type: 'string', title: 'Question', validation: (r) => r.required() }),
    defineField({ name: 'answer', type: 'text', title: 'Answer', rows: 4 }),
  ],
})

export const numberedStep = defineType({
  name: 'numberedStep',
  title: 'Numbered Step',
  type: 'object',
  fields: [
    defineField({
      name: 'stepNumber',
      type: 'number',
      title: 'Step number',
      description: 'Optional. If empty, steps are numbered in order on the site.',
    }),
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
  ],
})

export const programTableRow = defineType({
  name: 'programTableRow',
  title: 'Table Row',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'text', type: 'text', title: 'Text', rows: 4 }),
  ],
})

export const programFormatCard = defineType({
  name: 'programFormatCard',
  title: 'Format Card',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 4 }),
  ],
})

export const programEventItem = defineType({
  name: 'programEventItem',
  title: 'Program Event Item',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'dateLabel', type: 'string', title: 'Date label', description: 'Example: "Sat, May 18 • 10:00 AM"' }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
    defineField({ name: 'cta', type: 'ctaButton', title: 'Event CTA (optional)' }),
  ],
})
