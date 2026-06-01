import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const sourceBase = process.env.NEXT_PUBLIC_SOURCE_SITE || "https://sites.google.com/view/esparragozamusic/home";
const pages = [
  ["home", sourceBase],
  ["bio", "https://sites.google.com/view/esparragozamusic/bio"],
  ["discografia", "https://sites.google.com/view/esparragozamusic/discograf%C3%ADa"],
  ["show", "https://sites.google.com/view/esparragozamusic/show"],
  ["noticias", "https://sites.google.com/view/esparragozamusic/noticias"],
  ["contacto", "https://sites.google.com/view/esparragozamusic/contacto"]
];

const outputDir = path.join(process.cwd(), "content");
const imageDir = path.join(process.cwd(), "public", "media", "source-sync");

function decodeHtml(value) {
  return value
    .replace(/\\u003d/g, "=")
    .replace(/\\u0026/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function extractText(html) {
  const readable = decodeHtml(html)
    .replace(/<script[\s\S]*?<\/script>/gi, "\n")
    .replace(/<style[\s\S]*?<\/style>/gi, "\n")
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 2);

  return unique(readable).filter((line) => !line.startsWith("http"));
}

function extractUrls(html, pattern) {
  return unique([...decodeHtml(html).matchAll(pattern)].map((match) => match[0].replace(/\\u003d/g, "=")));
}

async function downloadImage(url, pageKey, index) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed ${response.status} ${url}`);
  }

  const contentType = response.headers.get("content-type") || "image/jpeg";
  const ext = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg";
  const bytes = Buffer.from(await response.arrayBuffer());
  const hash = createHash("sha1").update(bytes).digest("hex").slice(0, 10);
  const file = `${pageKey}-${String(index).padStart(2, "0")}-${hash}.${ext}`;
  await writeFile(path.join(imageDir, file), bytes);
  return { file, publicPath: `/media/source-sync/${file}`, url, contentType, bytes: bytes.length };
}

await mkdir(outputDir, { recursive: true });
await mkdir(imageDir, { recursive: true });

const result = [];

for (const [key, url] of pages) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "TARUYA source sync"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const html = await response.text();
  const images = extractUrls(html, /https:\/\/lh3\.googleusercontent\.com\/sitesv\/[^"'<>\s)]+/g).slice(0, 24);
  const youtube = extractUrls(html, /https:\/\/www\.youtube\.com\/embed\/[A-Za-z0-9_-]+[^"'<>\s)]*/g);
  const spotify = extractUrls(html, /https:\/\/open\.spotify\.com\/[^"'<>\s)]*/g);
  const socials = extractUrls(html, /https?:\/\/(?:www\.)?(?:instagram\.com|tiktok\.com|facebook\.com|youtube\.com|wa\.me)\/[^"'<>\s)]*/g);
  const downloadedImages = [];

  for (const [index, imageUrl] of images.entries()) {
    try {
      downloadedImages.push(await downloadImage(imageUrl, key, index + 1));
    } catch (error) {
      downloadedImages.push({ url: imageUrl, error: error instanceof Error ? error.message : "Unknown error" });
    }
  }

  result.push({
    key,
    url,
    extractedAt: new Date().toISOString(),
    text: extractText(html),
    images: downloadedImages,
    youtube,
    spotify,
    socials
  });
}

await writeFile(path.join(outputDir, "source-cache.json"), JSON.stringify(result, null, 2));
console.log(`Source cache written to ${path.join(outputDir, "source-cache.json")}`);
