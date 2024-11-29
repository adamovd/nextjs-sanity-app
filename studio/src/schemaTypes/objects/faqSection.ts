import {StackIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  icon: StackIcon,

  fields: [
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'question',
            },
            prepare(selection) {
              return {
                title: selection.title,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Please add at least one FAQ item'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'FAQ Block',
      }
    },
  },
})
