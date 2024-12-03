import eventType from './documents/events'
import page from './documents/page'
import person from './documents/person'
import post from './documents/post'
import venueType from './documents/venues'
import video from './documents/video'
import blockContent from './objects/blockContent'
import buttonGroup from './objects/button-group'
import callToAction from './objects/call-to-action'
import faqSection from './objects/faq-section'
import infoSection from './objects/info-section'
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
  buttonGroup,
]
