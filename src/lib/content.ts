import { fallbackContent } from "@/data/fallback-content";
import { sanityClient, sanityEnabled } from "@/lib/sanity";
import { cache } from "react";
import {
  contactsQuery,
  eventsQuery,
  galleryQuery,
  newsQuery,
  releasesQuery,
  settingsQuery,
  socialsQuery,
  videosQuery
} from "../../sanity/lib/queries";
import type {
  ContactPerson,
  EventItem,
  GalleryItem,
  NewsItem,
  Release,
  SiteContent,
  SocialLink,
  Video
} from "@/types/content";

type FetchResult<T> = { ok: true; data: T } | { ok: false };

type SanitySettings = {
  seoTitle?: string | null;
  seoDescription?: string | null;
  ogImage?: string | null;
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroBody?: string | null;
  heroBackground?: string | null;
  heroPortrait?: string | null;
  aboutEyebrow?: string | null;
  aboutTitle?: string | null;
  aboutLead?: string | null;
  aboutBody?: string[] | null;
  aboutPillars?: Array<{ title?: string | null; body?: string | null }> | null;
  aboutImage?: string | null;
  spotifyArtistId?: string | null;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  youtubeUrl?: string | null;
};

type SanityRelease = Omit<Partial<Release>, "image" | "type"> & {
  type?: string | null;
  image?: string | null;
};

type SanityVideo = Partial<Video>;

type SanityNewsItem = Omit<Partial<NewsItem>, "image"> & {
  image?: string | null;
  alt?: string | null;
};

type SanityGalleryItem = Omit<Partial<GalleryItem>, "image"> & {
  image?: string | null;
  alt?: string | null;
};

type SanityEventItem = Partial<EventItem> & {
  cta?: Partial<EventItem["cta"]> | null;
};

type SanitySocialLink = Partial<SocialLink> & {
  platform?: string | null;
};

const releaseTypes: Release["type"][] = ["Album", "Album en vivo", "Single", "Compilado"];
const socialPlatforms: SocialLink["platform"][] = [
  "Instagram",
  "TikTok",
  "Facebook",
  "YouTube",
  "Spotify",
  "WhatsApp",
  "Email"
];

function text(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function isReleaseType(value: unknown): value is Release["type"] {
  return typeof value === "string" && releaseTypes.includes(value as Release["type"]);
}

function isSocialPlatform(value: unknown): value is SocialLink["platform"] {
  return typeof value === "string" && socialPlatforms.includes(value as SocialLink["platform"]);
}

async function fetchSanity<T>(query: string): Promise<FetchResult<T>> {
  if (!sanityEnabled) {
    return { ok: false };
  }

  try {
    const data = await sanityClient.fetch<T>(query, {}, { next: { revalidate: 60 } });
    return { ok: true, data };
  } catch (error) {
    console.warn("Sanity fetch failed; keeping local fallback content.", error);
    return { ok: false };
  }
}

function mapRelease(item: SanityRelease): Release {
  return {
    title: text(item.title, "Untitled release"),
    type: isReleaseType(item.type) ? item.type : "Single",
    year: text(item.year, "TBA"),
    description: text(item.description),
    image: item.image ? { src: item.image, alt: text(item.title, "Release artwork") } : undefined,
    spotifyUrl: item.spotifyUrl,
    youtubeId: item.youtubeId,
    highlight: item.highlight
  };
}

function mapVideo(item: SanityVideo): Video | null {
  const youtubeId = text(item.youtubeId);

  if (!youtubeId) {
    return null;
  }

  return {
    title: text(item.title, "Video"),
    eyebrow: text(item.eyebrow, "Video"),
    youtubeId,
    description: text(item.description)
  };
}

function mapNews(item: SanityNewsItem): NewsItem {
  const title = text(item.title, "Noticia");

  return {
    title,
    date: text(item.date),
    eyebrow: text(item.eyebrow, "Actualidad"),
    excerpt: text(item.excerpt),
    image: item.image ? { src: item.image, alt: text(item.alt, title) } : undefined,
    sourceUrl: item.sourceUrl
  };
}

function mapEvent(item: SanityEventItem): EventItem {
  const label = text(item.cta?.label);
  const href = text(item.cta?.href, "#contacto");

  return {
    title: text(item.title, "Evento"),
    format: text(item.format, "Show"),
    venue: text(item.venue, "Venue TBA"),
    city: text(item.city, "TBA"),
    date: text(item.date, "On demand"),
    description: text(item.description),
    cta: label ? { label, href } : undefined
  };
}

function mapGallery(item: SanityGalleryItem): GalleryItem {
  const title = text(item.title, "Galeria");

  return {
    title,
    category: text(item.category, "Visual"),
    image: item.image ? { src: item.image, alt: text(item.alt, title) } : undefined
  };
}

function mapSocial(item: SanitySocialLink): SocialLink | null {
  if (!isSocialPlatform(item.platform) || !item.href) {
    return null;
  }

  return {
    platform: item.platform,
    href: item.href
  };
}

function mapContact(item: Partial<ContactPerson>): ContactPerson | null {
  if (!item.role || !item.name) {
    return null;
  }

  return {
    role: item.role,
    name: item.name,
    phone: item.phone,
    email: item.email
  };
}

function applySettings(settings: SanitySettings | null | undefined): SiteContent {
  if (!settings) {
    return fallbackContent;
  }

  return {
    ...fallbackContent,
    seo: {
      title: text(settings.seoTitle, fallbackContent.seo.title),
      description: text(settings.seoDescription, fallbackContent.seo.description),
      ogImage: text(settings.ogImage, fallbackContent.seo.ogImage)
    },
    hero: {
      ...fallbackContent.hero,
      eyebrow: text(settings.heroEyebrow, fallbackContent.hero.eyebrow),
      title: text(settings.heroTitle, fallbackContent.hero.title),
      subtitle: text(settings.heroSubtitle, fallbackContent.hero.subtitle),
      body: text(settings.heroBody, fallbackContent.hero.body),
      background: {
        src: text(settings.heroBackground, fallbackContent.hero.background.src),
        alt: fallbackContent.hero.background.alt
      },
      portrait: {
        src: text(settings.heroPortrait, fallbackContent.hero.portrait.src),
        alt: fallbackContent.hero.portrait.alt
      }
    },
    about: {
      ...fallbackContent.about,
      eyebrow: text(settings.aboutEyebrow, fallbackContent.about.eyebrow),
      title: text(settings.aboutTitle, fallbackContent.about.title),
      lead: text(settings.aboutLead, fallbackContent.about.lead),
      body: settings.aboutBody?.length ? settings.aboutBody.map((item) => text(item)).filter(Boolean) : fallbackContent.about.body,
      pillars: settings.aboutPillars?.length
        ? settings.aboutPillars.map((pillar) => ({
            title: text(pillar.title, "Pilar"),
            body: text(pillar.body)
          }))
        : fallbackContent.about.pillars,
      image: {
        src: text(settings.aboutImage, fallbackContent.about.image.src),
        alt: fallbackContent.about.image.alt
      }
    },
    integrations: {
      spotifyArtistId: text(settings.spotifyArtistId, fallbackContent.integrations.spotifyArtistId),
      instagramUrl: text(settings.instagramUrl, fallbackContent.integrations.instagramUrl),
      tiktokUrl: text(settings.tiktokUrl, fallbackContent.integrations.tiktokUrl),
      youtubeUrl: text(settings.youtubeUrl, fallbackContent.integrations.youtubeUrl)
    }
  };
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const [settings, releases, socials, contacts, videos, news, events, gallery] = await Promise.all([
    fetchSanity<SanitySettings | null>(settingsQuery),
    fetchSanity<SanityRelease[]>(releasesQuery),
    fetchSanity<SanitySocialLink[]>(socialsQuery),
    fetchSanity<Partial<ContactPerson>[]>(contactsQuery),
    fetchSanity<SanityVideo[]>(videosQuery),
    fetchSanity<SanityNewsItem[]>(newsQuery),
    fetchSanity<SanityEventItem[]>(eventsQuery),
    fetchSanity<SanityGalleryItem[]>(galleryQuery)
  ]);

  let content = settings.ok ? applySettings(settings.data) : fallbackContent;

  if (releases.ok && releases.data.length > 0) {
    content = { ...content, releases: releases.data.map(mapRelease) };
  }

  if (socials.ok && socials.data.length > 0) {
    content = { ...content, socials: socials.data.map(mapSocial).filter((item): item is SocialLink => Boolean(item)) };
  }

  if (contacts.ok && contacts.data.length > 0) {
    content = { ...content, contacts: contacts.data.map(mapContact).filter((item): item is ContactPerson => Boolean(item)) };
  }

  content = {
    ...content,
    videos: videos.ok ? videos.data.map(mapVideo).filter((item): item is Video => Boolean(item)) : content.videos
  };

  content = {
    ...content,
    news: news.ok ? news.data.map(mapNews) : content.news
  };

  content = {
    ...content,
    events: events.ok ? events.data.map(mapEvent) : content.events
  };

  return {
    ...content,
    gallery: gallery.ok ? gallery.data.map(mapGallery) : content.gallery
  };
});
