import {SquareIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'buttonGroup',
  title: 'Button Group',
  type: 'object',
  icon: SquareIcon,
  fields: [
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'button',
          title: 'Button',
          fields: [
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Button link',
              type: 'link',
            },
            {
              name: 'color',
              title: 'Button Color',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'},
                  {title: 'Tertiary', value: 'tertiary'},
                ],
                layout: 'radio',
              },
            },
            {
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  {title: 'Outline', value: 'outline'},
                  {title: 'Filled', value: 'filled'},
                ],
                layout: 'radio',
              },
            },
            {
              name: 'size',
              title: 'Button Size',
              type: 'string',
              options: {
                list: [
                  {title: 'Small', value: 'small'},
                  {title: 'Medium', value: 'medium'},
                  {title: 'Large', value: 'large'},
                ],
                layout: 'radio',
              },
            },
          ],
          preview: {
            select: {
              title: 'buttonText',
            },
            prepare(selection) {
              return {
                title: selection.title,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Please add at least one Button'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Button Group',
      }
    },
  },
})
