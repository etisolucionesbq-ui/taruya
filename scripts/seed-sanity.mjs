import { createReadStream, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

loadEnvFile(path.join(process.cwd(), ".env.local"));
loadEnvFile(path.join(process.cwd(), ".env"));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === "your-project-id") {
  throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID before seeding Sanity.");
}

if (!token) {
  throw new Error("Set SANITY_API_WRITE_TOKEN with write permissions before seeding Sanity.");
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });
const uploadedAssets = new Map();

function isPermissionError(error) {
  return error?.statusCode === 403 || error?.details?.type === "mutationError";
}

function explainSeedError(error) {
  if (!isPermissionError(error)) {
    throw error;
  }

  console.error("\nSanity rejected the seed because the token cannot create content.");
  console.error("Create a new token in sanity.io/manage with Editor or Administrator permissions.");
  console.error("Then set it in .env.local as SANITY_API_WRITE_TOKEN and run npm run sanity:seed again.\n");
  console.error(`Project: ${projectId}`);
  console.error(`Dataset: ${dataset}`);
  console.error(`Sanity response: ${error.message}`);
  process.exit(1);
}

function imagePath(publicPath) {
  return path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
}

async function imageRef(publicPath) {
  if (!publicPath) return undefined;
  const filePath = imagePath(publicPath);

  if (!existsSync(filePath)) return undefined;
  if (uploadedAssets.has(filePath)) return uploadedAssets.get(filePath);

  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: path.basename(filePath)
  });
  const reference = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  uploadedAssets.set(filePath, reference);
  return reference;
}

async function withImage(document, publicPath, fieldName = "image") {
  const image = await imageRef(publicPath);
  return image ? { ...document, [fieldName]: image } : document;
}

const socials = [
  ["Instagram", "https://www.instagram.com/esparragozamusic/"],
  ["TikTok", "https://www.tiktok.com/@esparragozamusic"],
  ["Facebook", "https://www.facebook.com/esparragozamusic/"],
  ["YouTube", "https://www.youtube.com/@esparragozamusic"],
  ["Spotify", "https://open.spotify.com/intl-es/artist/5RtgixeZzTtEm7Ow6oWxIr"],
  ["WhatsApp", "https://wa.me/573116592248"],
  ["Email", "mailto:taruyamusic@gmail.com"]
];

const contacts = [
  ["CEO & Artist", "Jose Daniel Esparragoza Medina", "+57 311 659 2248", "taruyamusic@gmail.com"],
  ["Booking Manager", "Laura Marcela Molina Guillen", "+57 301 318 6243", ""],
  ["Tour Manager", "Carlos Andres Bueno Otero", "+57 305 211 8552", ""]
];

const releases = [
  ["el-poder-de-los-ancestros", "El Poder de los Ancestros", "Album", 2025, "/media/source/discografia-01-eccb5ddd04.png", true],
  ["el-poder-de-los-ancestros-live", "El Poder de los Ancestros (Live)", "Album en vivo", 2024, "/media/source/show-01-aed0cfde6c.jpg", false],
  ["los-gaiteros", "Los Gaiteros", "Compilado", 2025, "/media/source/discografia-02-3633ab7e78.jpg", true],
  ["guarito-na-ma", "Guarito Na' Ma'", "Single", 2025, "/media/source/discografia-03-3c5dea7f8a.jpg", false],
  ["quedate-live", "Quedate (Live)", "Single", 2024, "", false],
  ["astdr", "ASTDR", "Single", 2023, "", false]
];

const videos = [
  ["a-otro-nivel", "Esparragoza A Otro Nivel", "Television nacional", "4OpKEZ9F7eM", "Audicion en A Otro Nivel de Caracol TV, representando a la musica folclorica ante una audiencia nacional."],
  ["pura-sabrosura", "Pura sabrosura, papa", "Music video", "roU8DyIcDCI", "Una ventana directa al sabor y al universo sonoro de Esparragoza."],
  ["show-deluxe", "Show deluxe", "Live session", "X3acBNpkE4I", "El Legado de la Cumbia en formato de gran escenario."],
  ["formato-en-vivo", "Formato en vivo", "Performance", "z9tuxhEaD0w", "Cumbia, banda y una puesta en escena preparada para festivales."]
];

const news = [
  ["a-otro-nivel", "ESPARRAGOZA: Un artista A Otro Nivel", "Caracol TV", "2025-01-01", "/media/source/noticias-01-e897aa5241.jpg", "Participo del reality musical mas importante de la television colombiana, logrando subir hasta el segundo nivel del ascensor con respaldo de Gian Marco."],
  ["corazon-del-mundo", "Reencuentro en el Corazon del Mundo", "Cumbre CELAC-UE", "2025-11-09", "/media/source/bio-01-56abd33810.jpg", "Invitado por el Ministerio de las Culturas como artista de cierre en Santa Marta, compartiendo programacion con Andy Montanez, Cimarron, Maia y otros artistas."],
  ["los-gaiteros-canonazos", "\"Los Gaiteros\" entra en Los 14 Canonazos Bailables", "Discos Fuentes", "2025-10-14", "/media/source/discografia-02-3633ab7e78.jpg", "La cancion fue seleccionada para el volumen 65 de la compilacion legendaria, encabezando el Lado B."],
  ["festival-casa-paz", "Festival CASA por la Paz", "Santa Marta 500 anos", "2025-07-20", "/media/source/show-02-4ec6051cdd.jpg", "Artista principal en la Quinta de San Pedro Alejandrino durante la conmemoracion de los 500 anos de Santa Marta."],
  ["mar-fest-2024", "Primer lugar en Mar Fest 2024", "Fiestas del Mar", "2024-01-01", "/media/source/noticias-01-e897aa5241.jpg", "Reconocido con el primer lugar en la categoria Solista del Mar Fest, destacando la fusion folclorica entre multiples generos."]
];

const events = [
  ["desde-la-raiz", "Desde la raiz", "Formato acustico", "Teatros, salas y espacios culturales", "Disponible para booking", "Presentacion intima en formato de guitarras o piano para espacios reducidos que desean experimentar la musica de cantautor en su forma mas autentica.", "Cotizar acustico"],
  ["legado-cumbia", "El Legado de la Cumbia", "Formato deluxe", "Festivales, teatros y grandes eventos", "Colombia / internacional", "Show insignia junto a 9 musicos, equipo tecnico especializado y produccion sonora de calidad.", "Cotizar full band"],
  ["conferencias", "Conferencias", "Academico", "Universidades, festivales y entidades", "Disponible para agenda", "Talleres y charlas sobre creacion musical, derechos de autor, folclor caribe y gestion cultural.", "Mas informacion"]
];

const gallery = [
  ["escenario-ancestros", "Escenario ancestros", "Live", "/media/source/bio-01-56abd33810.jpg"],
  ["full-band", "Full band", "Show", "/media/source/show-06-3826c63695.jpg"],
  ["press-portrait", "Press portrait", "Press", "/media/source/home-01-2950d633b9.png"],
  ["deluxe-live", "Deluxe live", "Festival", "/media/source/show-01-aed0cfde6c.jpg"],
  ["identidad-discografica", "Identidad discografica", "Music", "/media/source/discografia-01-eccb5ddd04.png"],
  ["contacto-artistico", "Contacto artistico", "Booking", "/media/source/contacto-01-a76597718a.jpg"]
];

async function seed() {
  const documents = [];

  let artistSettingsDocument = {
    _id: "artist-settings-taruya",
    _type: "artistSettings",
    seoTitle: "TARUYA | Esparragoza Music",
    seoDescription: "Plataforma artistica cinematografica para Esparragoza Music.",
    heroEyebrow: "Una Experiencia que Va Más Allá de la Música",
    heroTitle: "ESPARRAGOZA",
    heroSubtitle: "Cantautor | Productor | Speaker",
    heroBody: "La evolucion de la cumbia: tradicion del Magdalena para el mundo. Una propuesta que une investigacion territorial, escenarios vivos y sonido global.",
    aboutEyebrow: "Sobre el artista",
    aboutTitle: "El puente entre el poder de los ancestros y el sonido global de la nueva cumbia.",
    aboutLead: "ESPARRAGOZA (Jose Daniel Esparragoza Medina) es un cantautor, productor y conferencista del Magdalena.",
    aboutBody: [
      "Su obra combina investigacion territorial, composicion original y un lenguaje contemporaneo que renueva la cumbia desde sus raices.",
      "Desde temprana edad ha recorrido festivales y territorios musicales del Caribe, absorbiendo saberes de la tradicion oral.",
      "Junto a Discos Fuentes Edimusica S.A.S., expande una vision donde la cumbia es legado vivo y energia de futuro."
    ],
    aboutPillars: [
      { title: "Plan Nacional de Salvaguardia", body: "Colaborador para la construccion del Plan Nacional de Salvaguardia de la Cumbia." },
      { title: "Musica para la Convivencia", body: "Delegado departamental por el Magdalena para el Plan Nacional de Musica para la Convivencia 2025-2035." },
      { title: "Tradicion + escenario", body: "Cumbia, tambora, gaitas, investigacion territorial y puesta en escena." }
    ],
    spotifyArtistId: "5RtgixeZzTtEm7Ow6oWxIr",
    instagramUrl: "https://www.instagram.com/esparragozamusic/",
    tiktokUrl: "https://www.tiktok.com/@esparragozamusic",
    youtubeUrl: "https://www.youtube.com/@esparragozamusic"
  };

  artistSettingsDocument = await withImage(artistSettingsDocument, "/media/source/show-06-3826c63695.jpg", "heroBackground");
  artistSettingsDocument = await withImage(artistSettingsDocument, "/media/source/home-01-2950d633b9.png", "heroPortrait");
  artistSettingsDocument = await withImage(artistSettingsDocument, "/media/source/bio-01-56abd33810.jpg", "aboutImage");
  artistSettingsDocument = await withImage(artistSettingsDocument, "/media/source/show-06-3826c63695.jpg", "ogImage");
  documents.push(artistSettingsDocument);

  for (const [index, [platform, href]] of socials.entries()) {
    documents.push({ _id: `social-${platform.toLowerCase()}`, _type: "socialLink", platform, href, orderRank: index + 1 });
  }

  for (const [index, [role, name, phone, email]] of contacts.entries()) {
    documents.push({ _id: `contact-${index + 1}`, _type: "contactPerson", role, name, phone, email, orderRank: index + 1 });
  }

  for (const [index, [slug, title, releaseType, year, cover, highlight]] of releases.entries()) {
    documents.push(await withImage({ _id: `release-${slug}`, _type: "release", title, releaseType, year, description: title, highlight, orderRank: index + 1 }, cover, "cover"));
  }

  for (const [index, [slug, title, eyebrow, youtubeId, description]] of videos.entries()) {
    documents.push({ _id: `video-${slug}`, _type: "video", title, eyebrow, youtubeId, description, orderRank: index + 1 });
  }

  for (const [index, [slug, title, eyebrow, publishedAt, image, excerpt]] of news.entries()) {
    documents.push(await withImage({ _id: `news-${slug}`, _type: "news", title, eyebrow, publishedAt, excerpt, featured: index === 0 }, image));
  }

  for (const [index, [slug, title, format, venue, city, description, ctaLabel]] of events.entries()) {
    documents.push({ _id: `event-${slug}`, _type: "event", title, format, venue, city, description, ctaLabel, ctaHref: "#contacto", orderRank: index + 1 });
  }

  for (const [index, [slug, title, category, image]] of gallery.entries()) {
    documents.push(await withImage({ _id: `gallery-${slug}`, _type: "galleryImage", title, category, alt: title, orderRank: index + 1 }, image));
  }

  for (const document of documents) {
    await client.createOrReplace(document);
    console.log(`Seeded ${document._type}: ${document._id}`);
  }

  console.log(`Done. Seeded ${documents.length} Sanity documents in ${projectId}/${dataset}.`);
}

seed().catch(explainSeedError);
