import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "artistSettings"][0]{
  seoTitle,
  seoDescription,
  "ogImage": ogImage.asset->url,
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  heroBody,
  "heroBackground": heroBackground.asset->url,
  "heroPortrait": heroPortrait.asset->url,
  aboutEyebrow,
  aboutTitle,
  aboutLead,
  aboutBody,
  aboutPillars,
  "aboutImage": aboutImage.asset->url,
  spotifyArtistId,
  instagramUrl,
  tiktokUrl,
  youtubeUrl
}`;

export const releasesQuery = groq`*[_type == "release"] | order(coalesce(releaseDate, "1900-01-01") desc) {
  title,
  "type": releaseType,
  "year": string(year),
  description,
  "image": cover.asset->url,
  spotifyUrl,
  youtubeId,
  highlight
}`;

export const videosQuery = groq`*[_type == "video" && defined(youtubeId)] | order(orderRank asc, _createdAt desc) {
  title,
  eyebrow,
  youtubeId,
  description
}`;

export const newsQuery = groq`*[_type == "news"] | order(coalesce(publishedAt, "1900-01-01") desc, _createdAt desc) {
  title,
  "date": coalesce(string(publishedAt), ""),
  eyebrow,
  excerpt,
  "image": image.asset->url,
  "alt": coalesce(image.alt, title),
  sourceUrl
}`;

export const eventsQuery = groq`*[_type == "event"] | order(orderRank asc, coalesce(eventDate, "2999-01-01") asc, _createdAt desc) {
  title,
  format,
  venue,
  city,
  "date": coalesce(string(eventDate), "On demand"),
  description,
  "cta": select(defined(ctaLabel) => {
    "label": ctaLabel,
    "href": coalesce(ctaHref, "#contacto")
  })
}`;

export const galleryQuery = groq`*[_type == "galleryImage"] | order(orderRank asc, _createdAt desc) {
  title,
  category,
  "image": image.asset->url,
  alt
}`;

export const socialsQuery = groq`*[_type == "socialLink"] | order(orderRank asc, platform asc) {
  platform,
  href
}`;

export const contactsQuery = groq`*[_type == "contactPerson"] | order(orderRank asc, role asc) {
  role,
  name,
  phone,
  email
}`;
