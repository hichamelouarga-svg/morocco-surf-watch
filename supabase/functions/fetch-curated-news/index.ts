import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsItem {
  title: string;
  link: string;
  snippet: string;
  date: string;
  source: string;
}

async function fetchAndExtract(urls: string[], hostLabel: string, includePath?: RegExp): Promise<NewsItem[]> {
  const items: NewsItem[] = [];

  for (const url of urls) {
    try {
      console.log(`Fetching ${hostLabel} from ${url}`);
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });
      if (!res.ok) continue;
      const html = await res.text();

      // 1) Try to extract from headings with anchor links first (usually the real articles)
      const hTagRegex = /<h[1-3][^>]*>\s*<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/h[1-3]>/gi;
      let match: RegExpExecArray | null;
      while ((match = hTagRegex.exec(html)) && items.length < 5) {
        let link = match[1];
        const title = stripHtml(match[2]).trim();
        if (!title || title.length < 4) continue;
        link = absolutizeLink(link, url);
        if (includePath && !includePath.test(link)) continue;
        pushUnique(items, {
          title,
          link,
          snippet: `${hostLabel} - Dernières actualités`,
          date: new Date().toISOString(),
          source: hostLabel,
        });
      }

      // 2) Fallback: generic anchor extraction (filtering likely article links)
      if (items.length < 5) {
        const aTagRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
        while ((match = aTagRegex.exec(html)) && items.length < 5) {
          let link = match[1];
          const text = stripHtml(match[2]).replace(/\s+/g, " ").trim();
          if (!text || text.length < 8) continue;
          // Heuristics: avoid nav/footer and social links
          if (/^(#|javascript:)/i.test(link)) continue;
          link = absolutizeLink(link, url);
          if (!link.includes(new URL(url).hostname)) continue;
          if (/\b(category|tag|author|login|signup|privacy|terms)\b/i.test(link)) continue;
          if (includePath && !includePath.test(link)) continue;
          pushUnique(items, {
            title: text,
            link,
            snippet: `${hostLabel} - Actualité`,
            date: new Date().toISOString(),
            source: hostLabel,
          });
        }
      }

      if (items.length >= 5) break; // Enough from this host
    } catch (err) {
      console.error(`Failed to fetch ${hostLabel} from ${url}:`, err);
    }
  }

  return items.slice(0, 5);
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ");
}

function absolutizeLink(link: string, baseUrl: string): string {
  try {
    return new URL(link, baseUrl).toString();
  } catch {
    return link;
  }
}

function pushUnique(arr: NewsItem[], item: NewsItem) {
  if (!arr.find((it) => it.link === item.link || it.title.toLowerCase() === item.title.toLowerCase())) {
    arr.push(item);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Sources specified by the user
    const fedesurfUrls = [
      "https://www.fedesurfmaroc.com/",
      "https://www.fedesurfmaroc.com/actualites",
      "https://www.fedesurfmaroc.com/news",
      "https://www.fedesurfmaroc.com/blog",
    ];
    const surferUrls = [
      "https://www.surfer.com/news",
    ];

    const [fedeItems, surferItems] = await Promise.all([
      fetchAndExtract(fedesurfUrls, "Fédération Marocaine de Surf"),
      fetchAndExtract(surferUrls, "Surfer", /\/news\//i),
    ]);

    // Return grouped by source (5 each)
    const payload = {
      fedesurf: fedeItems,
      surfer: surferItems,
    };

    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in fetch-curated-news:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch curated news" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});