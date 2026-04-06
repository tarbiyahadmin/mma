import { defineType, defineField } from 'sanity';

export const navLink = defineType({
  name: 'navLink',
  type: 'object',
  title: 'Nav Link',
  fields: [
    defineField({ name: 'label', type: 'string', title: 'Label', validation: (r) => r.required() }),
    defineField({ name: 'to', type: 'string', title: 'Path', validation: (r) => r.required() }),
    defineField({
      name: 'isButton',
      type: 'boolean',
      title: 'Style as button (header)',
      description: 'In the main navbar, show this item as the gold primary button instead of a text link. Often used for the last item (e.g. Apply).',
      initialValue: false,
    }),
  ],
});
