import type { Metadata } from "next";
import { ArtistExperience } from "@/components/artist-experience";
import { getSiteContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return {
    title: content.seo.title,
    description: content.seo.description,
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: "/",
      siteName: "TARUYA",
      images: [
        {
          url: content.seo.ogImage,
          width: 1200,
          height: 630,
          alt: "Esparragoza Music"
        }
      ],
      locale: "es_CO",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: [content.seo.ogImage]
    }
  };
}

export default async function Home() {
  const content = await getSiteContent();

  return <ArtistExperience content={content} />;
}
