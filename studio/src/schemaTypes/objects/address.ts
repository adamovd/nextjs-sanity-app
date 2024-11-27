import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export default defineType({
  name: 'address',
  title: 'Address',
  type: 'object',
  icon: HomeIcon,
  options: {
    modal: {
      type: 'dialog',
      width: 'auto',
    },
  },
  validation: (Rule) =>
    // This is a custom validation rule that requires both 'buttonText' and 'link' to be set, or neither to be set
    Rule.custom((fields) => {
      const {street, streetNo} = fields || {}
      if ((street && streetNo) || (!street && !streetNo)) {
        return true
      }
      return 'Both Street and Street Number must be set, or both must be empty'
    }),
  fields: [
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
  ],
})
