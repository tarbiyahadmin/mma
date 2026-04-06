import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const DOCUMENT_TYPES = [
  'siteSettings',
  'homepage',
  'programsPage',
  'programCategory',
  'program',
  'blogPage',
  'blogPost',
  'careersPage',
  'careerRole',
  'aboutPage',
  'contentPage',
  'landingPage',
  'infoPage',
]

export default defineConfig({
  name: 'default',
  title: 'Muslim Mentorship Academy',

  projectId: '4wx4efgg',
  dataset: 'production',

  plugins: [
    structureTool({
      name: 'structure',
      title: 'Structure',
      structure: (S) =>
        S.list()
          .title('Content')
          .items(
            S.documentTypeListItems().filter((item) => DOCUMENT_TYPES.includes(item.getId() ?? ''))
          ),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
