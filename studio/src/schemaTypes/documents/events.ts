import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'events',
  title: 'Events',
  type: 'document',
  icon: CalendarIcon,

  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required().error(`Required to generate a page on the website`),
      hidden: ({document}) => !document?.title,
    }),
    defineField({
      name: 'eventType',
      type: 'string',
      options: {
        list: ['in-person', 'virtual'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'date',
      type: 'datetime',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },

      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        },
        {
          name: 'layout',
          type: 'string',
          title: 'Layout',
          description: 'Choose between round and square layouts for the event cover image.',
          options: {
            list: ['round', 'square'],
            layout: 'radio',
          },
        },
      ],
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'reference',
      to: [{type: 'venues'}],
      readOnly: ({value, document}) => !value && document?.eventType === 'virtual',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value && context?.document?.eventType === 'virtual') {
            return 'Only in-person events can have a venue'
          }

          return true
        }),
    }),
  ],
  preview: {
    select: {
      name: 'title',
      venue: 'venues.name',
      date: 'date',
      image: 'image',
    },
    prepare({name, venue, date, image}) {
      const nameFormatted = name || 'Untitled event'
      const dateFormatted = date
        ? new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
        : 'No date'

      return {
        title: nameFormatted,
        subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
        media: image || CalendarIcon,
      }
    },
  },
})
