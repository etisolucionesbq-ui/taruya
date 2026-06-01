"use client";

import Image from "next/image";
import type { ComponentType, FormEvent } from "react";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Disc3,
  ExternalLink,
  Facebook,
  Headphones,
  Images,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  Music2,
  Newspaper,
  Phone,
  Play,
  Radio,
  Send,
  Sparkles,
  Ticket,
  X,
  Youtube
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { GalleryItem, MediaAsset, Release, SiteContent, SocialLink } from "@/types/content";
import { cn, initials, spotifyArtistEmbed, youtubeEmbedUrl } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Musica", href: "#musica" },
  { label: "Videos", href: "#videos" },
  { label: "Noticias", href: "#noticias" },
  { label: "Eventos", href: "#show" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contacto", href: "#contacto" }
];

const socialIconMap: Record<SocialLink["platform"], ComponentType<{ className?: string }>> = {
  Instagram,
  TikTok: Music2,
  Facebook,
  YouTube: Youtube,
  Spotify: Headphones,
  WhatsApp: MessageCircle,
  Email: Mail
};

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}

function useStableReducedMotion(hydrated: boolean) {
  const prefersReducedMotion = useReducedMotion();
  return hydrated ? Boolean(prefersReducedMotion) : false;
}

function ImageStage({
  asset,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw"
}: {
  asset?: MediaAsset;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-zinc-950", className)}>
      {asset?.src ? (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <div className="placeholder-art absolute inset-0" aria-hidden />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden />
    </div>
  );
}

function Reveal({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const hydrated = useHydrated();
  const reduceMotion = useStableReducedMotion(hydrated);

  if (!hydrated) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={reveal}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <Reveal className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <div className="mb-3 inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase text-[color:var(--green)]">
          <Sparkles className="h-3.5 w-3.5" />
          {eyebrow}
        </div>
        <h2 className="text-balance text-4xl font-black uppercase leading-[0.92] text-white md:text-6xl">{title}</h2>
      </div>
      {copy ? <p className="max-w-sm text-sm leading-6 text-zinc-300 md:text-base">{copy}</p> : null}
    </Reveal>
  );
}

function Header({ socials }: { socials: SocialLink[] }) {
  const [open, setOpen] = useState(false);
  const primarySocial = socials.find((social) => social.platform === "Instagram") || socials[0];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-[min(1180px,calc(100vw-24px))] items-center justify-between">
  <a
  href="#home"
  className="group flex items-center ml-2"
  aria-label="TARUYA home"
>
  <Image
    src="/media/source/logo.png"
    alt="TARUYA"
    width={180}
    height={60}
    priority
    className="h-16 w-auto object-contain"
  />
</a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-semibold uppercase text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {primarySocial ? (
            <a
              href={primarySocial.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 border border-white/15 bg-white/10 px-3 text-sm font-bold uppercase text-white transition hover:border-[color:var(--green)] hover:bg-[color:var(--green)] hover:text-black"
            >
              <Instagram className="h-4 w-4" />
              Seguir
            </a>
          ) : null}
          <a
            href="#contacto"
            className="inline-flex h-10 items-center gap-2 bg-white px-4 text-sm font-black uppercase text-black transition hover:bg-[color:var(--gold)]"
          >
            <Ticket className="h-4 w-4" />
            Booking
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-white/10 text-white lg:hidden"
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-t border-white/10 bg-black/90 px-4 py-4 lg:hidden"
        >
          <div className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border border-white/10 px-4 py-3 text-sm font-bold uppercase text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.nav>
      ) : null}
    </header>
  );
}

function Hero({ content }: { content: SiteContent }) {
  const hydrated = useHydrated();
  const reduceMotion = useStableReducedMotion(hydrated);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], ["0%", reduceMotion ? "0%" : "16%"]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, reduceMotion ? 1 : 1.08]);
  const heroCopy = (
    <>
      <div className="mb-5 inline-flex items-center gap-2 border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase text-[color:var(--green)] backdrop-blur-xl">
        <Radio className="h-3.5 w-3.5" />
        {content.hero.eyebrow}
      </div>
      <h1 className="cinema-title text-5xl text-white sm:text-7xl md:text-8xl xl:text-[9.5rem]">
        {content.hero.title}
      </h1>
      <p className="mt-4 text-lg font-black uppercase text-[color:var(--gold)] md:text-2xl">{content.hero.subtitle}</p>
      <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-200 md:text-xl md:leading-8">{content.hero.body}</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {content.hero.ctas.map((cta) => (
          <a
            key={cta.href}
            href={cta.href}
            className={cn(
              "inline-flex h-12 items-center justify-center gap-2 border px-5 text-sm font-black uppercase transition",
              cta.variant === "primary" && "border-[color:var(--green)] bg-[color:var(--green)] text-black hover:bg-white",
              cta.variant === "secondary" && "border-white/20 bg-white text-black hover:bg-[color:var(--gold)]",
              cta.variant === "ghost" && "border-white/20 bg-white/10 text-white backdrop-blur-xl hover:border-white hover:bg-white/20"
            )}
          >
            {cta.variant === "primary" ? <Play className="h-4 w-4 fill-current" /> : <ArrowUpRight className="h-4 w-4" />}
            {cta.label}
          </a>
        ))}
      </div>
    </>
  );
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {hydrated ? (
        <motion.div className="absolute inset-0" style={{ y, scale }}>
          <ImageStage
            asset={content.hero.background}
            className="h-full w-full"
            imageClassName="object-[55%_center]"
            priority
            sizes="100vw"
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0">
          <ImageStage
            asset={content.hero.background}
            className="h-full w-full"
            imageClassName="object-[55%_center]"
            priority
            sizes="100vw"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.96),rgba(0,0,0,.58)_48%,rgba(0,0,0,.18)),linear-gradient(90deg,rgba(0,0,0,.62),rgba(0,0,0,.18))] md:bg-[linear-gradient(90deg,rgba(0,0,0,.92),rgba(0,0,0,.54)_42%,rgba(0,0,0,.18)),linear-gradient(0deg,rgba(0,0,0,.96),transparent_42%,rgba(0,0,0,.46))]" />
      <div className="absolute inset-x-0 top-16 border-y border-white/10 bg-black/20 py-2">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap text-xs font-black uppercase text-zinc-300">
          {Array.from({ length: 2 }).map((_, index) => (
            <span key={index} className="flex gap-10">
              <span>El Legado de la Cumbia</span>
              <span className="text-[color:var(--gold)]">Magdalena para el mundo</span>
              <span>Discos Fuentes</span>
              <span className="text-[color:var(--cyan)]">Tradicion viva</span>
              <span>Music experience</span>
            </span>
          ))}
        </div>
      </div>

      <div className="section-shell relative z-10 flex min-h-screen items-end pb-10 pt-32 md:pb-16">
        <div className="grid w-full max-w-5xl gap-8 lg:items-end">
          {hydrated ? (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              {heroCopy}
            </motion.div>
          ) : (
            <div>{heroCopy}</div>
          )}
        </div>
      </div>
    </section>
  );
}

function AboutSection({ content }: { content: SiteContent }) {
  return (
    <section id="sobre" className="relative bg-black py-24 md:py-32">
      <div className="section-shell">
        <SectionHeader eyebrow={content.about.eyebrow} title={content.about.title} copy={content.about.lead} />
        <div className="grid gap-8 lg:grid-cols-[.8fr_1fr] lg:items-stretch">
          <Reveal>
            <ImageStage asset={content.about.image} className="min-h-[460px] w-full" imageClassName="object-[50%_center]" sizes="(max-width: 1024px) 100vw, 45vw" />
          </Reveal>
          <div className="grid gap-5">
            <Reveal className="noise-panel p-6 md:p-8">
              <div className="relative z-10 space-y-5 text-base leading-7 text-zinc-200">
                {content.about.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {content.about.pillars.map((pillar, index) => (
                <Reveal key={pillar.title} delay={index * 0.08} className="noise-panel p-5">
                  <div className="relative z-10">
                    <BadgeCheck className="mb-5 h-6 w-6 text-[color:var(--green)]" />
                    <h3 className="text-lg font-black uppercase text-white">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">{pillar.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MusicSection({ content }: { content: SiteContent }) {
  const highlighted = content.releases.filter((release) => release.highlight).slice(0, 2);

  return (
    <section id="musica" className="relative overflow-hidden bg-zinc-950 py-24 md:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,75,31,.15),transparent_34%,rgba(37,208,194,.1))]" />
      <div className="section-shell relative">
        <SectionHeader
          eyebrow="Musica"
          title="Raiz, tambora, gaitas y futuro en alta temperatura."
          copy=""
        />
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal className="noise-panel p-4">
            <div className="relative z-10 overflow-hidden bg-black">
              <iframe
                title="Spotify artist embed"
                src={spotifyArtistEmbed(content.integrations.spotifyArtistId)}
                width="100%"
                height="420"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </Reveal>
          <div className="grid gap-5">
            {highlighted.map((release, index) => (
              <Reveal key={release.title} delay={index * 0.08} className="noise-panel grid gap-4 p-4 md:grid-cols-[180px_1fr]">
                <ImageStage asset={release.image} className="relative z-10 aspect-square w-full" sizes="180px" />
                <div className="relative z-10 flex flex-col justify-between p-1">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-[color:var(--cyan)]">
                      <Disc3 className="h-4 w-4" />
                      {release.type} / {release.year}
                    </div>
                    <h3 className="text-3xl font-black uppercase text-white">{release.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">{release.description}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {release.spotifyUrl ? (
                      <a
                        href={release.spotifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 border border-white/15 bg-white px-3 py-2 text-xs font-black uppercase text-black transition hover:bg-[color:var(--green)]"
                      >
                        <Headphones className="h-4 w-4" />
                        Spotify
                      </a>
                    ) : null}
                    {release.youtubeId ? (
                      <a
                        href={`https://www.youtube.com/watch?v=${release.youtubeId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 border border-white/15 bg-white/10 px-3 py-2 text-xs font-black uppercase text-white transition hover:bg-white hover:text-black"
                      >
                        <Youtube className="h-4 w-4" />
                        YouTube
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReleaseCard({ release, index }: { release: Release; index: number }) {
  return (
    <Reveal delay={index * 0.04} className="group noise-panel">
      <div className="relative z-10">
        <ImageStage asset={release.image} className="aspect-[4/3] w-full" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="p-5">
          <div className="mb-2 flex items-center justify-between gap-3 text-xs font-bold uppercase text-zinc-400">
            <span>{release.type}</span>
            <span className="text-[color:var(--gold)]">{release.year}</span>
          </div>
          <h3 className="text-2xl font-black uppercase text-white">{release.title}</h3>
          <p className="mt-3 min-h-20 text-sm leading-6 text-zinc-300">{release.description}</p>
          <div className="mt-5 flex gap-2">
            {release.spotifyUrl ? (
              <a href={release.spotifyUrl} target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-white/10 text-white transition hover:bg-[color:var(--green)] hover:text-black" aria-label={`Escuchar ${release.title} en Spotify`}>
                <Headphones className="h-4 w-4" />
              </a>
            ) : null}
            {release.youtubeId ? (
              <a href={`https://www.youtube.com/watch?v=${release.youtubeId}`} target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-white/10 text-white transition hover:bg-white hover:text-black" aria-label={`Ver ${release.title} en YouTube`}>
                <Play className="h-4 w-4 fill-current" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function DiscographySection({ content }: { content: SiteContent }) {
  return (
    <section id="discografia" className="bg-black py-24 md:py-32">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Discografia"
          title="Un catalogo que ya conversa con la historia tropical."
          copy=""
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {content.releases.map((release, index) => (
            <ReleaseCard key={`${release.title}-${release.year}`} release={release} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideosSection({ content }: { content: SiteContent }) {
  const [activeId, setActiveId] = useState(content.videos[0]?.youtubeId || "");
  const activeVideo = content.videos.find((video) => video.youtubeId === activeId) || content.videos[0];

  return (
    <section id="videos" className="relative overflow-hidden bg-zinc-950 py-24 md:py-32">
      <div className="section-shell">
        <SectionHeader eyebrow="Videos" title="Pantalla grande para una cumbia que no se queda quieta." />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
          <Reveal className="noise-panel p-3">
            <div className="relative z-10 aspect-video overflow-hidden bg-black">
              {activeVideo?.youtubeId ? (
                <iframe
                  key={activeVideo.youtubeId}
                  title={activeVideo.title}
                  src={youtubeEmbedUrl(activeVideo.youtubeId)}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="placeholder-art h-full w-full" />
              )}
            </div>
          </Reveal>
          <div className="grid gap-3">
            {content.videos.map((video, index) => (
              <Reveal key={video.youtubeId || video.title} delay={index * 0.05}>
                <button
                  type="button"
                  onClick={() => setActiveId(video.youtubeId)}
                  className={cn(
                    "noise-panel relative z-10 w-full p-4 text-left transition",
                    activeId === video.youtubeId && "border-[color:var(--green)]"
                  )}
                >
                  <div className="relative z-10 flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 bg-white/10 text-white">
                      <Play className="h-4 w-4 fill-current" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold uppercase text-[color:var(--cyan)]">{video.eyebrow}</span>
                      <span className="mt-1 block text-lg font-black uppercase text-white">{video.title}</span>
                      <span className="mt-2 block text-sm leading-5 text-zinc-400">{video.description}</span>
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsSection({ content }: { content: SiteContent }) {
  return (
    <section id="noticias" className="bg-black py-24 md:py-32">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Noticias"
          title="Reconocimientos, television, festivales y territorio."
          copy=""
        />
        <div className="grid gap-5 lg:grid-cols-5">
          {content.news.map((item, index) => (
            <Reveal
              key={`${item.title}-${item.date}`}
              delay={index * 0.04}
              className={cn("noise-panel lg:col-span-2", index === 0 && "lg:col-span-3 lg:row-span-2")}
            >
              <div className="relative z-10 grid h-full md:grid-cols-[.82fr_1fr] lg:block">
                <ImageStage
                  asset={item.image}
                  className={cn("min-h-64", index === 0 ? "lg:min-h-[430px]" : "lg:min-h-56")}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="p-5 md:p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-[color:var(--gold)]">
                    <Newspaper className="h-4 w-4" />
                    {item.eyebrow} / {item.date}
                  </div>
                  <h3 className="text-2xl font-black uppercase text-white md:text-3xl">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-zinc-300">{item.excerpt}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsSection({ content }: { content: SiteContent }) {
  return (
    <section id="show" className="relative overflow-hidden bg-zinc-950 py-24 md:py-32">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Eventos"
          title="Tres formatos para llevar El Legado de la Cumbia al escenario correcto."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {content.events.map((event, index) => (
            <Reveal key={event.title} delay={index * 0.06} className="noise-panel p-6">
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center border border-white/15 bg-white/10 text-[color:var(--green)]">
                      {index === 0 ? <Mic2 className="h-5 w-5" /> : index === 1 ? <Radio className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                    </span>
                    <span className="text-xs font-bold uppercase text-zinc-400">{event.format}</span>
                  </div>
                  <h3 className="text-3xl font-black uppercase text-white">{event.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-zinc-300">{event.description}</p>
                  <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 text-sm text-zinc-300">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[color:var(--cyan)]" />
                      {event.venue}
                    </span>
                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[color:var(--cyan)]" />
                      {event.city} / {event.date}
                    </span>
                  </div>
                </div>
                {event.cta ? (
                  <a
                    href={event.cta.href}
                    className="mt-8 inline-flex h-11 items-center justify-center gap-2 bg-white px-4 text-sm font-black uppercase text-black transition hover:bg-[color:var(--gold)]"
                  >
                    <Ticket className="h-4 w-4" />
                    {event.cta.label}
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryTile({ item, index }: { item: GalleryItem; index: number }) {
  return (
    <Reveal delay={index * 0.04} className={cn("group relative min-h-72 overflow-hidden", index % 5 === 0 && "md:col-span-2 md:row-span-2")}>
      <ImageStage asset={item.image} className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <div className="mb-2 inline-flex items-center gap-2 border border-white/15 bg-black/50 px-3 py-1 text-xs font-bold uppercase text-[color:var(--green)] backdrop-blur-xl">
          <Images className="h-3.5 w-3.5" />
          {item.category}
        </div>
        <h3 className="text-2xl font-black uppercase text-white">{item.title}</h3>
      </div>
    </Reveal>
  );
}

function GallerySection({ content }: { content: SiteContent }) {
  return (
    <section id="galeria" className="bg-black py-24 md:py-32">
      <div className="section-shell">
        <SectionHeader eyebrow="Galeria" title="Visuales fullscreen para sentir la tarima antes de llegar." />
        <div className="grid auto-rows-[minmax(18rem,auto)] gap-4 md:grid-cols-3">
          {content.gallery.map((item, index) => (
            <GalleryTile key={`${item.title}-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialStrip({ socials }: { socials: SocialLink[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {socials.map((social) => {
        const Icon = socialIconMap[social.platform] || ExternalLink;

        return (
          <a
            key={`${social.platform}-${social.href}`}
            href={social.href}
            target={social.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
            className="inline-flex h-11 items-center gap-2 border border-white/15 bg-white/10 px-3 text-sm font-bold uppercase text-white transition hover:border-[color:var(--green)] hover:bg-[color:var(--green)] hover:text-black"
          >
            <Icon className="h-4 w-4" />
            {social.platform}
          </a>
        );
      })}
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: data
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input
        name="name"
        required
        placeholder="Nombre"
        className="h-12 border border-white/15 bg-black/45 px-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-[color:var(--green)]"
      />
      <input
        name="email"
        required
        type="email"
        placeholder="Email"
        className="h-12 border border-white/15 bg-black/45 px-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-[color:var(--green)]"
      />
      <input
        name="event"
        placeholder="Evento / ciudad"
        className="h-12 border border-white/15 bg-black/45 px-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-[color:var(--green)]"
      />
      <select
        name="department"
        defaultValue="booking"
        className="h-12 border border-white/15 bg-black/45 px-4 text-white outline-none transition focus:border-[color:var(--green)]"
      >
        <option className="bg-zinc-950 text-white" value="booking">
          Booking
        </option>
        <option className="bg-zinc-950 text-white" value="info">
          Info / prensa
        </option>
        <option className="bg-zinc-950 text-white" value="legal">
          Legal
        </option>
        <option className="bg-zinc-950 text-white" value="accounting">
          Contabilidad
        </option>
        <option className="bg-zinc-950 text-white" value="royalties">
          Royalties
        </option>
        <option className="bg-zinc-950 text-white" value="publishing">
          Publishing
        </option>
      </select>
      <textarea
        name="message"
        required
        placeholder="Mensaje"
        rows={5}
        className="resize-none border border-white/15 bg-black/45 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-[color:var(--green)]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-12 items-center justify-center gap-2 bg-[color:var(--green)] px-5 text-sm font-black uppercase text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {status === "loading" ? "Enviando" : "Enviar booking"}
      </button>
      {status === "sent" ? <p className="text-sm font-semibold text-[color:var(--green)]">Mensaje enviado. El equipo de TARUYA lo recibira por correo.</p> : null}
      {status === "error" ? <p className="text-sm font-semibold text-[color:var(--ember)]">No se pudo enviar. Intenta de nuevo.</p> : null}
    </form>
  );
}

function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: new FormData(form)
      });

      if (!response.ok) {
        throw new Error("Newsletter request failed");
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-2 sm:flex-row">
      <input
        name="email"
        type="email"
        required
        placeholder="Email para updates"
        className="h-12 min-w-0 flex-1 border border-white/15 bg-black/45 px-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-[color:var(--green)]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-12 items-center justify-center gap-2 bg-white px-5 text-sm font-black uppercase text-black transition hover:bg-[color:var(--gold)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Mail className="h-4 w-4" />
        {status === "loading" ? "..." : "Newsletter"}
      </button>
      <span className="sr-only" aria-live="polite">
        {status}
      </span>
    </form>
  );
}

function ContactSection({ content }: { content: SiteContent }) {
  const heroContact = content.contacts[0];
  const whatsapp = content.socials.find((social) => social.platform === "WhatsApp")?.href;

  return (
    <section id="contacto" className="relative overflow-hidden bg-zinc-950 py-24 md:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,75,31,.18),transparent_36%,rgba(183,255,74,.1))]" />
      <div className="section-shell relative">
        <SectionHeader eyebrow="Contacto" title="Booking, prensa y universo social en un solo backstage." />
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal className="noise-panel p-6 md:p-8">
            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center bg-white text-xl font-black text-black">
                  {heroContact ? initials(heroContact.name) : "ES"}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-[color:var(--cyan)]">{heroContact?.role || "Booking"}</p>
                  <h3 className="mt-1 text-2xl font-black uppercase text-white">{heroContact?.name || "Esparragoza Music"}</h3>
                </div>
              </div>
              <div className="grid gap-3">
                {content.contacts.map((person) => (
                  <div key={`${person.role}-${person.name}`} className="border border-white/10 bg-black/35 p-4">
                    <p className="text-xs font-bold uppercase text-[color:var(--gold)]">{person.role}</p>
                    <p className="mt-1 font-black uppercase text-white">{person.name}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-zinc-300">
                      {person.phone ? (
                        <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-white">
                          <Phone className="h-4 w-4 text-[color:var(--green)]" />
                          {person.phone}
                        </a>
                      ) : null}
                      {person.email ? (
                        <a href={`mailto:${person.email}`} className="inline-flex items-center gap-2 hover:text-white">
                          <Mail className="h-4 w-4 text-[color:var(--green)]" />
                          {person.email}
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <SocialStrip socials={content.socials} />
              </div>
              <NewsletterForm />
              {whatsapp ? (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex h-12 items-center justify-center gap-2 border border-white/15 bg-white/10 px-5 text-sm font-black uppercase text-white transition hover:bg-[color:var(--green)] hover:text-black"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp directo
                </a>
              ) : null}
            </div>
          </Reveal>
          <Reveal className="noise-panel p-6 md:p-8">
            <div className="relative z-10">
              <h3 className="text-3xl font-black uppercase text-white">Llevar el show a tu escenario</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Produccion, prensa, festivales, universidades o marcas: este canal envia la solicitud directamente al correo correspondiente del equipo.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-white/10 bg-black py-8">
      <div className="section-shell flex flex-col gap-4 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <p className="font-bold uppercase">TARUYA / ESPARRAGOZA MUSIC / 2026</p>
        <div className="flex flex-wrap gap-4">
          <a href={content.integrations.youtubeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
            YouTube <ExternalLink className="h-3 w-3" />
          </a>
          <a href={content.integrations.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
            Instagram <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export function ArtistExperience({ content }: { content: SiteContent }) {
  return (
    <main>
      <Header socials={content.socials} />
      <Hero content={content} />
      <AboutSection content={content} />
      <MusicSection content={content} />
      <DiscographySection content={content} />
      <VideosSection content={content} />
      <NewsSection content={content} />
      <EventsSection content={content} />
      <GallerySection content={content} />
      <ContactSection content={content} />
      <Footer content={content} />
    </main>
  );
}
