export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  category?: string;
  author?: string;
}

export class RSSService {
  static async fetchRSSFeed(url: string): Promise<RSSItem[]> {
    try {
      // Use a CORS proxy to fetch the RSS feed
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        console.warn(`Failed to fetch RSS feed from ${url}: ${response.status}`);
        return [];
      }
      
      const xmlText = await response.text();
      
      // Check if it's actually XML/RSS content
      if (!xmlText.includes('<rss') && !xmlText.includes('<feed')) {
        console.warn(`No RSS/XML content found at ${url}`);
        return [];
      }
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      const items = xmlDoc.querySelectorAll('item');
      const rssItems: RSSItem[] = [];
      
      items.forEach((item) => {
        const title = item.querySelector('title')?.textContent?.trim() || '';
        const link = item.querySelector('link')?.textContent?.trim() || '';
        const description = item.querySelector('description')?.textContent?.trim() || '';
        const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
        const category = item.querySelector('category')?.textContent?.trim() || '';
        const author = item.querySelector('dc\\:creator, creator')?.textContent?.trim() || '';
        
        if (title && link) {
          rssItems.push({
            title: this.cleanHtml(title),
            link,
            description: this.cleanHtml(description),
            pubDate,
            category,
            author
          });
        }
      });
      
      return rssItems.slice(0, 2); // Return only the 2 most recent articles
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
      return [];
    }
  }
  
  private static cleanHtml(text: string): string {
    // Remove HTML tags and decode HTML entities
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    return tempDiv.textContent || tempDiv.innerText || '';
  }
  
  static formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  }
}