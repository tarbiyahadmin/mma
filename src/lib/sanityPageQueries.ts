import { sanityClient } from './sanity'

const imageProjection = `{ _type, asset->{ _id, url }, hotspot, crop }`

export interface CtaButton {
  label: string
  to: string
  isExternal?: boolean
  variant?: 'primary' | 'accent'
}

export interface SiteSettingsDoc {
  navLinks?: { label: string; to: string; isButton?: boolean }[]
  footerTagline?: string
  footerQuickLinks?: { label: string; to: string; isButton?: boolean }[]
  footerAddress?: string
  footerPhone?: string
  footerEmail?: string
  socialLinks?: { platform: string; url: string }[]
  footerCopyright?: string
  metaTitle?: string
  metaDescription?: string
}

export interface HomepageDoc {
  sections?: any[]
  seo?: { seoTitle?: string; metaDescription?: string }
}

export interface AboutPageDoc {
  sections?: any[]
  seo?: { seoTitle?: string; metaDescription?: string }
}

export interface ProgramsPageDoc {
  eyebrow?: string
  heading?: string
  subheading?: string
  programCards?: any[]
  seo?: { seoTitle?: string; metaDescription?: string }
}

export interface ProgramTableRow {
  title?: string
  text?: string
}

export interface ProgramFormatCard {
  title?: string
  description?: string
}

export interface ProgramFaqItem {
  question?: string
  answer?: string
}

export interface ProgramDoc {
  _id: string
  slug: string
  title: string
  heroEyebrow?: string
  heroSubheading?: string
  heroCta?: CtaButton
  mainImage?: { asset?: { url?: string } }
  shortDescription?: string
  overview?: string
  keyBenefits?: any[]
  structure?: Array<{ stepNumber?: number; title?: string; description?: string }>
  ctaSections?: Array<{ title?: string; subtitle?: string; buttons?: CtaButton[] }>
  cohortStatus?: { state?: 'open' | 'closed'; nextIntake?: string; waitlistCta?: CtaButton }
  eventsSection?: Array<{ title?: string; dateLabel?: string; description?: string; cta?: CtaButton }>
  tableSection?: { rows?: ProgramTableRow[] }
  formatCardsSection?: ProgramFormatCard[]
  faqsSection?: ProgramFaqItem[]
  seo?: { seoTitle?: string; metaDescription?: string }
}

export interface BlogPageDoc {
  eyebrow?: string
  heading?: string
  subheading?: string
  seo?: { seoTitle?: string; metaDescription?: string }
}

export interface BlogPostListItem {
  _id: string
  slug: string
  title: string
  excerpt?: string
  publishedAt?: string
}

export interface BlogPostDoc extends BlogPostListItem {
  body?: unknown[]
  seo?: { seoTitle?: string; metaDescription?: string }
}

const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  sections[]{
    ...,
    cards[]{
      ...,
      image ${imageProjection}
    },
    items[]{ title, description }
  },
  seo{ seoTitle, metaDescription }
}`

const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  sections[]{
    ...,
    items[]{ title, description },
    members[]{ name, role, bio }
  },
  seo{ seoTitle, metaDescription }
}`

const PROGRAMS_PAGE_QUERY = `*[_type == "programsPage"][0]{
  eyebrow,
  heading,
  subheading,
  programCards[]{
    _type,
    title,
    description,
    link,
    linkLabel,
    image ${imageProjection},
    program->{
      "slug": slug.current,
      title,
      shortDescription,
      mainImage ${imageProjection}
    }
  },
  seo{ seoTitle, metaDescription }
}`

const PROGRAMS_FOR_LISTING_QUERY = `*[_type == "program" && defined(slug.current)] | order(title asc){
  _id,
  "slug": slug.current,
  title,
  shortDescription,
  mainImage ${imageProjection}
}`

const PROGRAM_BY_SLUG_QUERY = `*[_type == "program" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  heroEyebrow,
  heroSubheading,
  heroCta{ label, to, isExternal, variant },
  mainImage ${imageProjection},
  shortDescription,
  overview,
  keyBenefits[]{ title, description },
  structure[]{ stepNumber, title, description },
  ctaSections[]{ title, subtitle, buttons[]{ label, to, isExternal, variant } },
  cohortStatus{
    state,
    nextIntake,
    waitlistCta{ label, to, isExternal, variant }
  },
  eventsSection[]{
    title,
    dateLabel,
    description,
    cta{ label, to, isExternal, variant }
  },
  tableSection{
    rows[]{ title, text }
  },
  formatCardsSection[]{ title, description },
  faqsSection[]{ question, answer },
  seo{ seoTitle, metaDescription }
}`

const BLOG_PAGE_QUERY = `*[_type == "blogPage"][0]{ eyebrow, heading, subheading, seo{ seoTitle, metaDescription } }`
const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc){
  _id, "slug": slug.current, title, excerpt, publishedAt
}`
const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id, "slug": slug.current, title, excerpt, publishedAt, body, seo{ seoTitle, metaDescription }
}`

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  navLinks[]{ label, to, isButton },
  footerTagline,
  footerQuickLinks[]{ label, to, isButton },
  footerAddress,
  footerPhone,
  footerEmail,
  socialLinks[]{ platform, url },
  footerCopyright,
  metaTitle,
  metaDescription
}`

export const getHomepagePage = () => sanityClient.fetch<HomepageDoc | null>(HOMEPAGE_QUERY)
export const getAboutPageDoc = () => sanityClient.fetch<AboutPageDoc | null>(ABOUT_PAGE_QUERY)
export const getProgramsPageDoc = () => sanityClient.fetch<ProgramsPageDoc | null>(PROGRAMS_PAGE_QUERY)
export const getProgramsForListingDoc = () => sanityClient.fetch<ProgramDoc[]>(PROGRAMS_FOR_LISTING_QUERY)
export const getProgramBySlugDoc = (slug: string) => sanityClient.fetch<ProgramDoc | null>(PROGRAM_BY_SLUG_QUERY, { slug })
export const getBlogPageDoc = () => sanityClient.fetch<BlogPageDoc | null>(BLOG_PAGE_QUERY)
export const getBlogPostsDoc = () => sanityClient.fetch<BlogPostListItem[]>(BLOG_POSTS_QUERY)
export const getBlogPostBySlugDoc = (slug: string) => sanityClient.fetch<BlogPostDoc | null>(BLOG_POST_BY_SLUG_QUERY, { slug })
export const getSiteSettingsDoc = () => sanityClient.fetch<SiteSettingsDoc | null>(SITE_SETTINGS_QUERY)
