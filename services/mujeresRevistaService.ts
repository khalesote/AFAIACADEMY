import xml2js from 'xml-js';

// Feeds RSS de fuentes abiertas sobre mujeres, inmigraci├│n, moda, salud y bienestar
const REVISTA_FEEDS = [
  {
    nombre: 'RTVE - Sociedad',
    url: 'https://www.rtve.es/rss/temas_sociedad.xml',
    categoria: 'Noticias',
    categoriaAr: 'ÏúÏ«Ï¿ÏºÏ▒',
  },
  {
    nombre: '20 Minutos - Sociedad',
    url: 'https://www.20minutos.es/rss/sociedad/',
    categoria: 'Noticias',
    categoriaAr: 'ÏúÏ«Ï¿ÏºÏ▒',
  },
  {
    nombre: 'Europa Press - Espa├▒a',
    url: 'https://www.europapress.es/rss/rss.aspx',
    categoria: 'Noticias',
    categoriaAr: 'ÏúÏ«Ï¿ÏºÏ▒',
  },
  {
    nombre: 'El Pa├¡s - Sociedad',
    url: 'https://elpais.com/rss/sociedad.xml',
    categoria: 'Noticias',
    categoriaAr: 'ÏúÏ«Ï¿ÏºÏ▒',
  },
  {
    nombre: 'El Pa├¡s - Moda',
    url: 'https://elpais.com/rss/s/smoda.xml',
    categoria: 'Moda',
    categoriaAr: '┘à┘êÏÂÏ®',
  },
  {
    nombre: 'El Pa├¡s - Salud',
    url: 'https://elpais.com/rss/s/salud.xml',
    categoria: 'Salud',
    categoriaAr: 'ÏÁÏ¡Ï®',
  },
  {
    nombre: 'El Diario - Sociedad',
    url: 'https://www.eldiario.es/rss/sociedad/',
    categoria: 'Noticias',
    categoriaAr: 'ÏúÏ«Ï¿ÏºÏ▒',
  },
  {
    nombre: 'P├║blico - Sociedad',
    url: 'https://www.publico.es/rss/sociedad',
    categoria: 'Noticias',
    categoriaAr: 'ÏúÏ«Ï¿ÏºÏ▒',
  },
  {
    nombre: '20 Minutos - Moda y Estilo',
    url: 'https://www.20minutos.es/rss/estilo/',
    categoria: 'Moda',
    categoriaAr: '┘à┘êÏÂÏ®',
  },
  {
    nombre: 'El Mundo - Salud',
    url: 'https://www.elmundo.es/rss/salud.xml',
    categoria: 'Salud',
    categoriaAr: 'ÏÁÏ¡Ï®',
  },
  {
    nombre: 'RTVE - Salud',
    url: 'https://www.rtve.es/rss/temas_salud.xml',
    categoria: 'Salud',
    categoriaAr: 'ÏÁÏ¡Ï®',
  },
  {
    nombre: 'BOE - Extranjer├¡a',
    url: 'https://www.boe.es/rss/BOE-L-extranjeria.xml',
    categoria: 'Normativa',
    categoriaAr: '┘ä┘êÏºÏªÏ¡',
  },
  {
    nombre: 'Ministerio de Inclusi├│n',
    url: 'https://extranjeros.inclusion.gob.es/es/informacionInteres/actualidad/rss/actualidad.xml',
    categoria: 'Gobierno',
    categoriaAr: 'Ï¡┘â┘ê┘àÏ®',
  },
  {
    nombre: 'Infomigrante',
    url: 'https://infomigrante.es/feed/',
    categoria: 'Inmigraci├│n',
    categoriaAr: '┘çÏ¼Ï▒Ï®',
  },
  {
    nombre: 'ParaInmigrantes',
    url: 'https://www.parainmigrantes.info/feed/',
    categoria: 'Inmigraci├│n',
    categoriaAr: '┘çÏ¼Ï▒Ï®',
  },
  {
    nombre: 'Mundo Migra',
    url: 'https://www.migrar.org/feed/',
    categoria: 'Inmigraci├│n',
    categoriaAr: '┘çÏ¼Ï▒Ï®',
  },
];

export interface RevistaArticle {
  title: string;
  summary: string;
  link: string;
  source: string;
  categoria: string;
  categoriaAr: string;
  publishedAt?: string;
}

type XmlNode = Record<string, any> | string | undefined;

type RssEntry = {
  title?: XmlNode;
  description?: XmlNode;
  summary?: XmlNode;
  link?: XmlNode;
  guid?: XmlNode;
  pubDate?: XmlNode;
  updated?: XmlNode;
  ['content:encoded']?: XmlNode;
};

const getText = (node: XmlNode): string => {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return getText(node[0]);
  if (typeof node === 'object') {
    if ('_text' in node) return getText(node._text as XmlNode);
    if ('_cdata' in node) return getText(node._cdata as XmlNode);
    const keys = Object.keys(node);
    if (keys.length === 1) {
      return getText(node[keys[0]] as XmlNode);
    }
    if ('href' in node) {
      return getText(node.href as XmlNode);
    }
  }
  return '';
};

const normaliseSummary = (entry: RssEntry): string => {
  const rawSummary =
    getText(entry.summary) ||
    getText(entry.description) ||
    getText(entry['content:encoded']);

  if (!rawSummary) return '';

  const stripped = rawSummary
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return stripped.length > 250 ? `${stripped.slice(0, 247).trim()}ÔÇª` : stripped;
};

const decodeHtmlEntities = (value: string): string =>
  value
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

const extractTagText = (block: string, tag: string): string | undefined => {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = block.match(regex);
  if (match && match[1]) {
    return decodeHtmlEntities(match[1].trim());
  }
  if (tag === 'link') {
    const attrMatch = block.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i);
    if (attrMatch && attrMatch[1]) {
      return decodeHtmlEntities(attrMatch[1].trim());
    }
  }
  return undefined;
};

const parseFallback = (xml: string, feedName: string, categoria: string, categoriaAr: string): RevistaArticle[] => {
  const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];

  if (itemMatches.length === 0) {
    console.warn(`Parse manual fall├│: no se encontraron entradas en ${feedName}.`);
    return [];
  }

  return itemMatches.map((block) => {
    const entry: RssEntry = {
      title: extractTagText(block, 'title'),
      description: extractTagText(block, 'description'),
      summary: extractTagText(block, 'summary'),
      link: extractTagText(block, 'link'),
      guid: extractTagText(block, 'guid'),
      pubDate: extractTagText(block, 'pubDate'),
      updated: extractTagText(block, 'updated'),
      ['content:encoded']: extractTagText(block, 'content:encoded'),
    };

    const title = decodeHtmlEntities(getText(entry.title) || 'Sin t├¡tulo');
    const summary = normaliseSummary(entry) || 'Sin resumen disponible.';
    const linkCandidate = getText(entry.link);
    const link = linkCandidate || getText(entry.guid) || '#';
    const publishedAt = getText(entry.pubDate) || getText(entry.updated);

    return {
      title,
      summary,
      link,
      source: feedName,
      categoria,
      categoriaAr,
      publishedAt,
    } as RevistaArticle;
  });
};


export async function fetchRevistaArticles(limit = 20): Promise<RevistaArticle[]> {
  try {
    console.log('­ƒô░ Iniciando carga de art├¡culos de revista...');
    
    const responses = await Promise.allSettled(
      REVISTA_FEEDS.map(async (feed) => {
        try {
          console.log(`­ƒôí Intentando cargar feed: ${feed.nombre} - ${feed.url}`);
          const response = await fetch(feed.url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
          });
          
          if (!response.ok) {
            console.warn(`ÔØî Feed ${feed.nombre} no disponible (status: ${response.status})`);
            return [];
          }
          
          const text = await response.text();
          console.log(`Ô£à Feed ${feed.nombre} cargado, tama├▒o: ${text.length} caracteres`);
          
          try {
            const parsed = xml2js(text, { compact: true }) as any;

            const items: RssEntry[] = (() => {
              if (parsed?.rss?.channel?.item) {
                return Array.isArray(parsed.rss.channel.item)
                  ? parsed.rss.channel.item
                  : [parsed.rss.channel.item];
              }
              if (parsed?.feed?.entry) {
                return Array.isArray(parsed.feed.entry)
                  ? parsed.feed.entry
                  : [parsed.feed.entry];
              }
              return [];
            })();

            console.log(`­ƒôä ${feed.nombre}: ${items.length} art├¡culos encontrados`);

            return items.map((entry) => {
              const title = decodeHtmlEntities(getText(entry.title) || 'Sin t├¡tulo');
              const summary = normaliseSummary(entry) || 'Sin resumen disponible.';
              const linkCandidate = getText(entry.link);
              const link =
                linkCandidate ||
                getText(entry.guid) ||
                '#';
              const publishedAt = getText(entry.pubDate) || getText(entry.updated);

              return {
                title,
                summary,
                link,
                source: feed.nombre,
                categoria: feed.categoria,
                categoriaAr: feed.categoriaAr,
                publishedAt,
              } as RevistaArticle;
            });
          } catch (parserError) {
            console.warn(`ÔÜá´©Å Parser estricto fall├│ para ${feed.nombre}, usando fallback:`, parserError);
            return parseFallback(text, feed.nombre, feed.categoria, feed.categoriaAr);
          }
        } catch (feedError: any) {
          console.warn(`ÔØî No se pudo cargar el feed ${feed.nombre}:`, feedError?.message || feedError);
          return [] as RevistaArticle[];
        }
      })
    );

    const successful = responses
      .filter((r): r is PromiseFulfilledResult<RevistaArticle[]> => r.status === 'fulfilled')
      .map(r => r.value);

    const flattened = successful.flat().filter(Boolean);
    console.log(`­ƒôè Total de art├¡culos obtenidos de feeds: ${flattened.length}`);

    // Filtrar art├¡culos relevantes sobre mujeres, inmigraci├│n, moda, salud y bienestar
    // Usar palabras clave amplias para capturar contenido relevante
    const relevantKeywords = [
      'mujer', 'mujeres', 'inmigrante', 'inmigraci├│n', 'migraci├│n', 'g├®nero', 'igualdad', 
      'violencia', 'feminismo', 'empoderamiento', 'derechos', 'social', 'sociedad', 
      'familia', 'trabajo', 'empleo', 'salud', 'educaci├│n', 'extranjer├¡a', 'refugiado',
      'refugiada', 'inclusi├│n', 'discriminaci├│n', 'acogida', 'integraci├│n', 'diversidad',
      'moda', 'fashion', 'estilo', 'belleza', 'bienestar', 'fitness', 'nutrici├│n', 'cuidado',
      'prevenci├│n', 'm├®dico', 'medicina', 'ginecolog├¡a', 'maternidad', 'embarazo', 'menopausia',
      'c├íncer', 'mama', 'salud mental', 'ejercicio', 'dieta', 'alimentaci├│n', 'cosm├®tica',
      'tendencia', 'look', 'outfit', 'ropa', 'complementos', 'maquillaje', 'cabello', 'piel'
    ];
    
    // Filtrar art├¡culos relevantes
    let filtered = flattened.filter(article => {
      const textToSearch = `${article.title} ${article.summary}`.toLowerCase();
      return relevantKeywords.some(keyword => textToSearch.includes(keyword));
    });
    
    console.log(`­ƒöì Art├¡culos despu├®s de filtrar: ${filtered.length} de ${flattened.length} totales`);
    
    // Si el filtro dej├│ muy pocos art├¡culos, usar todos (para no dejar la revista vac├¡a)
    if (filtered.length < 3 && flattened.length > 0) {
      console.log('ÔÜá´©Å Pocos art├¡culos filtrados, mostrando todos los disponibles');
      filtered = flattened;
    }

    // Eliminar duplicados basados en el t├¡tulo
    const uniqueArticles = filtered.filter((article, index, self) =>
      index === self.findIndex((a) => a.title.toLowerCase() === article.title.toLowerCase())
    );

    const sorted = uniqueArticles.sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA; // Ordenar por fecha (m├ís recientes primero)
    });

    const result = sorted.slice(0, limit);
    console.log(`Ô£à Total de art├¡culos a mostrar: ${result.length} (todos de feeds RSS actualizados)`);
    return result;
  } catch (error) {
    console.error('ÔØî Error obteniendo art├¡culos de revista:', error);
    // En caso de error, devolver array vac├¡o para que se muestre el estado de "sin art├¡culos"
    return [];
  }
}

export function groupArticlesByCategory(items: RevistaArticle[]): Record<string, RevistaArticle[]> {
  return items.reduce<Record<string, RevistaArticle[]>>((acc, item) => {
    const key = item.categoria;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

