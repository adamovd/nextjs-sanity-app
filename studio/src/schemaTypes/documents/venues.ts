import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'venues',
  title: 'Venues',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'street',
      title: 'Street Name',
      type: 'string',
    }),
    defineField({
      name: 'streetNo',
      title: 'Street Number',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'zipCode',
      title: 'Zip Code',
      type: 'number',
    }),
  ],
})
