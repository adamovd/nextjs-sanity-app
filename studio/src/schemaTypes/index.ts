import eventType from './documents/events'
import page from './documents/page'
import person from './documents/person'
import post from './documents/post'
import venueType from './documents/venues'
import video from './documents/video'
import blockContent from './objects/blockContent'
import callToAction from './objects/callToAction'
import faqSection from './objects/faqSection'
import infoSection from './objects/infoSection'
import link from './objects/link'
import settings from './singletons/settings'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  eventType,
  venueType,
  video,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  faqSection,
]
