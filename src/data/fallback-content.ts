import type { SiteContent } from "@/types/content";

export const fallbackContent: SiteContent = {
  seo: {
    title: "TARUYA | Esparragoza Music",
    description:
      "Plataforma artistica cinematografica para Esparragoza Music: cumbia del Magdalena, shows en vivo, discografia, noticias y booking.",
    ogImage: "/media/source/show-06-3826c63695.jpg"
  },
  hero: {
    eyebrow: "Una Experiencia que Va Más Allá de la Música",
    title: "ESPARRAGOZA",
    subtitle: "Cantautor | Productor | Speaker",
    body:
      "La evolucion de la cumbia: tradicion del Magdalena para el mundo. Una propuesta que une investigacion territorial, escenarios vivos y sonido global.",
    background: {
      src: "/media/source/show-06-3826c63695.jpg",
      alt: "Esparragoza en vivo con banda y pantalla escenica"
    },
    portrait: {
      src: "/media/source/home-01-2950d633b9.png",
      alt: "Retrato oficial de Esparragoza"
    },
    ctas: [
      { label: "Ver show en vivo", href: "#show", variant: "primary" },
      { label: "Escuchar musica", href: "#musica", variant: "secondary" },
      { label: "Booking", href: "#contacto", variant: "ghost" }
    ],
    stats: [
      { value: "2025", label: "El Poder de los Ancestros" },
      { value: "9+", label: "Musicos en formato deluxe" },
      { value: "65", label: "14 Canonazos Bailables" }
    ]
  },
  about: {
    eyebrow: "Sobre el artista",
    title: "El puente entre el poder de los ancestros y el sonido global de la nueva cumbia.",
    lead:
      "ESPARRAGOZA (Jose Daniel Esparragoza Medina) es un cantautor, productor y conferencista del Magdalena, reconocido como una de las voces jovenes mas relevantes de la musica tradicional del Caribe colombiano.",
    body: [
      "Su obra combina investigacion territorial, composicion original y un lenguaje contemporaneo que renueva la cumbia desde sus raices, proyectandola hacia audiencias nacionales e internacionales.",
      "Desde temprana edad ha recorrido festivales y territorios musicales del Caribe, absorbiendo saberes de la tradicion oral y colaborando con reconocidos maestros de la musica tradicional.",
      "Junto a Discos Fuentes Edimusica S.A.S., el sello discografico mas antiguo de LATAM, expande una vision donde la cumbia es legado vivo y energia de futuro."
    ],
    pillars: [
      {
        title: "Plan Nacional de Salvaguardia",
        body:
          "Colaborador para la construccion del Plan Nacional de Salvaguardia de la Cumbia, resolucion 0321-2024, Ministerio de las Culturas, las Artes y los Saberes."
      },
      {
        title: "Musica para la Convivencia",
        body:
          "Delegado departamental por el Magdalena para el Plan Nacional de Musica para la Convivencia 2025-2035."
      },
      {
        title: "Tradicion + escenario",
        body:
          "Su propuesta mezcla cumbia, tambora, gaitas, investigacion territorial y una puesta en escena preparada para festivales, teatros y grandes eventos."
      }
    ],
    image: {
      src: "/media/source/bio-01-56abd33810.jpg",
      alt: "Esparragoza presentandose en escenario con la banda"
    }
  },
  releases: [
    {
      title: "El Poder de los Ancestros",
      type: "Album",
      year: "2025",
      description:
        "Album central del universo Esparragoza: una descarga de cumbia, memoria y futuro desde el Magdalena.",
      image: {
        src: "/media/source/discografia-01-eccb5ddd04.png",
        alt: "Discografia de Esparragoza con El Poder de los Ancestros y sencillos"
      },
      spotifyUrl: "https://open.spotify.com/artist/5RtgixeZzTtEm7Ow6oWxIr",
      highlight: true
    },
    {
      title: "El Poder de los Ancestros (Live)",
      type: "Album en vivo",
      year: "2024",
      description: "Registro en vivo de la energia escenica de Esparragoza y su banda.",
      image: {
        src: "/media/source/show-01-aed0cfde6c.jpg",
        alt: "Show en vivo de Esparragoza"
      },
      youtubeId: "X3acBNpkE4I"
    },
    {
      title: "Los Gaiteros",
      type: "Compilado",
      year: "2025",
      description:
        "Incluido en Los 14 Canonazos Bailables Vol. 65 de Discos Fuentes, encabezando el Lado B con frescura y energia.",
      image: {
        src: "/media/source/discografia-02-3633ab7e78.jpg",
        alt: "Los 14 Canonazos Bailables Volumen 65"
      },
      highlight: true
    },
    {
      title: "Guarito Na' Ma'",
      type: "Single",
      year: "2025",
      description: "Sencillo destacado de la etapa reciente del artista.",
      image: {
        src: "/media/source/discografia-03-3c5dea7f8a.jpg",
        alt: "Arte visual de lanzamiento de Esparragoza"
      }
    },
    {
      title: "Quedate (Live)",
      type: "Single",
      year: "2024",
      description: "Version en vivo incluida dentro del repertorio actual.",
      youtubeId: "9DNuR8zyk5M"
    },
    {
      title: "ASTDR",
      type: "Single",
      year: "2023",
      description: "Sencillo dentro del catalogo alternativo de Esparragoza.",
      youtubeId: "mW1fWkdkysY"
    }
  ],
  videos: [
    {
      title: "Esparragoza A Otro Nivel",
      eyebrow: "Television nacional",
      youtubeId: "4OpKEZ9F7eM",
      description:
        "Audicion en A Otro Nivel de Caracol TV, representando a la musica folclorica ante una audiencia nacional."
    },
    {
      title: "Pura sabrosura, papa",
      eyebrow: "Music video",
      youtubeId: "roU8DyIcDCI",
      description: "Una ventana directa al sabor y al universo sonoro de Esparragoza."
    },
    {
      title: "Show deluxe",
      eyebrow: "Live session",
      youtubeId: "X3acBNpkE4I",
      description: "El Legado de la Cumbia en formato de gran escenario."
    },
    {
      title: "Formato en vivo",
      eyebrow: "Performance",
      youtubeId: "z9tuxhEaD0w",
      description: "Cumbia, banda y una puesta en escena preparada para festivales."
    }
  ],
  news: [
    {
      title: "ESPARRAGOZA: Un artista A Otro Nivel",
      date: "2025",
      eyebrow: "Caracol TV",
      excerpt:
        "Participo del reality musical mas importante de la television colombiana, logrando subir hasta el segundo nivel del ascensor con respaldo de Gian Marco.",
      image: {
        src: "/media/source/noticias-01-e897aa5241.jpg",
        alt: "Esparragoza con reconocimiento en escenario"
      }
    },
    {
      title: "Reencuentro en el Corazon del Mundo",
      date: "2025-11-09",
      eyebrow: "Cumbre CELAC-UE",
      excerpt:
        "Invitado por el Ministerio de las Culturas como artista de cierre en Santa Marta, compartiendo programacion con Andy Montanez, Cimarron, Maia y otros artistas.",
      image: {
        src: "/media/source/bio-01-56abd33810.jpg",
        alt: "Esparragoza en tarima con banda"
      }
    },
    {
      title: "\"Los Gaiteros\" entra en Los 14 Canonazos Bailables",
      date: "2025-10-14",
      eyebrow: "Discos Fuentes",
      excerpt:
        "La cancion fue seleccionada para el volumen 65 de la compilacion legendaria, encabezando el Lado B.",
      image: {
        src: "/media/source/discografia-02-3633ab7e78.jpg",
        alt: "Contraportada de Los 14 Canonazos Bailables Vol. 65"
      }
    },
    {
      title: "Festival CASA por la Paz",
      date: "2025-07-20",
      eyebrow: "Santa Marta 500 anos",
      excerpt:
        "Artista principal en la Quinta de San Pedro Alejandrino durante la conmemoracion de los 500 anos de Santa Marta.",
      image: {
        src: "/media/source/show-02-4ec6051cdd.jpg",
        alt: "Esparragoza en concierto"
      }
    },
    {
      title: "Primer lugar en Mar Fest 2024",
      date: "2024",
      eyebrow: "Fiestas del Mar",
      excerpt:
        "Reconocido con el primer lugar en la categoria Solista del Mar Fest, destacando la fusion folclorica entre multiples generos.",
      image: {
        src: "/media/source/noticias-01-e897aa5241.jpg",
        alt: "Premio Mar Fest recibido por Esparragoza"
      }
    }
  ],
  events: [
    {
      title: "Desde la raiz",
      format: "Formato acustico",
      venue: "Teatros, salas y espacios culturales",
      city: "Disponible para booking",
      date: "On demand",
      description:
        "Presentacion intima en formato de guitarras o piano para espacios reducidos que desean experimentar la musica de cantautor en su forma mas autentica.",
      cta: { label: "Cotizar acustico", href: "#contacto" }
    },
    {
      title: "El Legado de la Cumbia",
      format: "Formato deluxe",
      venue: "Festivales, teatros y grandes eventos",
      city: "Colombia / internacional",
      date: "On demand",
      description:
        "Show insignia junto a 9 musicos, equipo tecnico especializado y produccion sonora de calidad.",
      cta: { label: "Cotizar full band", href: "#contacto" }
    },
    {
      title: "Conferencias",
      format: "Academico",
      venue: "Universidades, festivales y entidades",
      city: "Disponible para agenda",
      date: "On demand",
      description:
        "Talleres y charlas sobre creacion musical, derechos de autor, folclor caribe y gestion cultural.",
      cta: { label: "Mas informacion", href: "#contacto" }
    }
  ],
  gallery: [
    {
      title: "Escenario ancestros",
      category: "Live",
      image: { src: "/media/source/bio-01-56abd33810.jpg", alt: "Show de Esparragoza con pantalla El Poder de los Ancestros" }
    },
    {
      title: "Full band",
      category: "Show",
      image: { src: "/media/source/show-06-3826c63695.jpg", alt: "Esparragoza cantando con su banda en escenario" }
    },
    {
      title: "Press portrait",
      category: "Press",
      image: { src: "/media/source/home-01-2950d633b9.png", alt: "Retrato oficial de Esparragoza" }
    },
    {
      title: "Deluxe live",
      category: "Festival",
      image: { src: "/media/source/show-01-aed0cfde6c.jpg", alt: "Concierto de Esparragoza en vivo" }
    },
    {
      title: "Identidad discografica",
      category: "Music",
      image: { src: "/media/source/discografia-01-eccb5ddd04.png", alt: "Catalogo visual de Esparragoza" }
    },
    {
      title: "Contacto artistico",
      category: "Booking",
      image: { src: "/media/source/contacto-01-a76597718a.jpg", alt: "Foto vertical de Esparragoza" }
    }
  ],
  contacts: [
    {
      role: "CEO & Artist",
      name: "Jose Daniel Esparragoza Medina",
      phone: "+57 311 659 2248",
      email: "taruyamusic@gmail.com"
    },
    {
      role: "Booking Manager",
      name: "Laura Marcela Molina Guillen",
      phone: "+57 301 318 6243"
    },
    {
      role: "Tour Manager",
      name: "Carlos Andres Bueno Otero",
      phone: "+57 305 211 8552"
    }
  ],
  socials: [
    { platform: "Instagram", href: "https://www.instagram.com/esparragozamusic/" },
    { platform: "TikTok", href: "https://www.tiktok.com/@esparragozamusic" },
    { platform: "Facebook", href: "https://www.facebook.com/esparragozamusic/" },
    { platform: "YouTube", href: "https://www.youtube.com/@esparragozamusic" },
    { platform: "Spotify", href: "https://open.spotify.com/intl-es/artist/5RtgixeZzTtEm7Ow6oWxIr" },
    { platform: "WhatsApp", href: "https://wa.me/573116592248" },
    { platform: "Email", href: "mailto:taruyamusic@gmail.com" }
  ],
  integrations: {
    spotifyArtistId: "5RtgixeZzTtEm7Ow6oWxIr",
    instagramUrl: "https://www.instagram.com/esparragozamusic/",
    tiktokUrl: "https://www.tiktok.com/@esparragozamusic",
    youtubeUrl: "https://www.youtube.com/@esparragozamusic"
  }
};
