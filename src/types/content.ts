export type MediaAsset = {
  src?: string;
  alt: string;
  hotspot?: "center" | "top" | "bottom" | "left" | "right";
};

export type Cta = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type SocialLink = {
  platform: "Instagram" | "TikTok" | "Facebook" | "YouTube" | "Spotify" | "WhatsApp" | "Email";
  href: string;
};

export type Release = {
  title: string;
  type: "Album" | "Album en vivo" | "Single" | "Compilado";
  year: string;
  description: string;
  image?: MediaAsset;
  spotifyUrl?: string;
  youtubeId?: string;
  highlight?: boolean;
};

export type Video = {
  title: string;
  eyebrow: string;
  youtubeId: string;
  description: string;
};

export type NewsItem = {
  title: string;
  date: string;
  eyebrow: string;
  excerpt: string;
  image?: MediaAsset;
  sourceUrl?: string;
};

export type EventItem = {
  title: string;
  format: string;
  venue: string;
  city: string;
  date: string;
  description: string;
  cta?: Cta;
};

export type GalleryItem = {
  title: string;
  category: string;
  image?: MediaAsset;
};

export type ContactPerson = {
  role: string;
  name: string;
  phone?: string;
  email?: string;
};

export type SiteContent = {
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    body: string;
    background: MediaAsset;
    portrait: MediaAsset;
    ctas: Cta[];
    stats: Array<{ value: string; label: string }>;
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string[];
    pillars: Array<{ title: string; body: string }>;
    image: MediaAsset;
  };
  releases: Release[];
  videos: Video[];
  news: NewsItem[];
  events: EventItem[];
  gallery: GalleryItem[];
  contacts: ContactPerson[];
  socials: SocialLink[];
  integrations: {
    spotifyArtistId: string;
    instagramUrl: string;
    tiktokUrl: string;
    youtubeUrl: string;
  };
};
