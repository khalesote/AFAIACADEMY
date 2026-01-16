import { xml2js } from 'xml-js';

const FEEDS = [
  {
    nombre: 'BOE Extranjería',
    url: 'https://www.boe.es/rss/BOE-L-extranjeria.xml',
  },
  {
    nombre: 'Ministerio de Extranjería',
    url: 'https://extranjeros.inclusion.gob.es/es/informacionInteres/actualidad/rss/actualidad.xml',
  },
  {
    nombre: 'Infomigrante.es',
    url: 'https://infomigrante.es/feed/',
  },
  {
    nombre: 'ParaInmigrantes.info',
    url: 'https://www.parainmigrantes.info/feed/',
  },
  {
    nombre: 'Mundo Migra',
    url: 'https://www.migrar.org/feed/',
  },
  {
    nombre: 'El País - Inmigración',
    url: 'https://elpais.com/tag/inmigracion/a/rss',
  },
  {
    nombre: 'El Mundo - Extranjería',
    url: 'https://www.elmundo.es/rss/tag/extranjeria.xml',
  },
  {
    nombre: 'ABC - Inmigración',
    url: 'https://www.abc.es/rss/feeds/abc_internacional.xml',
  },
  {
    nombre: 'RTVE - Sociedad',
    url: 'https://www.rtve.es/rss/temas_sociedad.xml',
  },
  {
    nombre: 'Europa Press - España',
    url: 'https://www.europapress.es/rss/rss.aspx',
  },
];

export interface NewsItem {
  title: string;
  summary: string;
  link: string;
  source: string;
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

  return stripped.length > 220 ? `${stripped.slice(0, 217).trim()}…` : stripped;
};

const decodeHtmlEntities = (value: string): string =>
  value
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

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

const parseFallback = (xml: string, feedName: string): NewsItem[] => {
  const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];

  if (itemMatches.length === 0) {
    console.warn(`Parse manual falló: no se encontraron entradas en ${feedName}.`);
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

    const title = getText(entry.title) || 'Sin título';
    const summary = normaliseSummary(entry) || 'Sin resumen disponible.';
    const linkCandidate = getText(entry.link);
    const link = linkCandidate || getText(entry.guid) || '#';
    const publishedAt = getText(entry.pubDate) || getText(entry.updated);

    return {
      title,
      summary,
      link,
      source: feedName,
      publishedAt,
    } as NewsItem;
  });
};

export async function fetchLatestNews(limit = 6): Promise<NewsItem[]> {
  try {
    const responses = await Promise.all(
      FEEDS.map(async (feed) => {
        try {
          const response = await fetch(feed.url);
          const text = await response.text();
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

            return items.map((entry) => {
              const title = getText(entry.title) || 'Sin título';
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
                publishedAt,
              } as NewsItem;
            });
          } catch (parserError) {
            console.warn(`Parser estricto falló para ${feed.nombre}, usando fallback:`, parserError);
            return parseFallback(text, feed.nombre);
          }
        } catch (feedError) {
          console.warn(`No se pudo cargar el feed ${feed.nombre}:`, feedError);
          return [] as NewsItem[];
        }
      })
    );

    const flattened = responses.flat().filter(Boolean);

    const sorted = flattened.sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });

    return sorted.slice(0, limit);
  } catch (error) {
    console.error('Error obteniendo noticias:', error);
    return [];
  }
}

export function groupNewsBySource(items: NewsItem[]): Record<string, NewsItem[]> {
  return items.reduce<Record<string, NewsItem[]>>((acc, item) => {
    if (!acc[item.source]) {
      acc[item.source] = [];
    }
    acc[item.source].push(item);
    return acc;
  }, {});
}
