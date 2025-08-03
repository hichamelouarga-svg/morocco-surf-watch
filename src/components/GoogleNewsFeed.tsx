import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink, Newspaper } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface GoogleNewsItem {
  title: string;
  link: string;
  snippet: string;
  date: string;
  source: string;
}

export const GoogleNewsFeed = () => {
  const [news, setNews] = useState<GoogleNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchGoogleNews();
  }, []);

  const fetchGoogleNews = async () => {
    try {
      setLoading(true);
      
      // Call Supabase Edge Function to fetch Google News
      const { data, error } = await supabase.functions.invoke('fetch-google-news', {
        method: 'GET'
      });
      
      if (error) {
        throw error;
      }
      
      setNews(data || []);
      
    } catch (error) {
      console.error('Erreur lors du chargement des actualités:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les actualités Google News",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-4/5"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Newspaper className="w-6 h-6 text-primary" />
        <h2 className="font-display text-2xl font-bold text-foreground">
          Actualités Surf Maroc - Google News
        </h2>
      </div>
      
      {news.map((article, index) => (
        <Card key={index} className="shadow-wave hover:shadow-ocean transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">{article.source}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(article.date)}
              </div>
            </div>
            
            <CardTitle className="font-display text-xl leading-tight line-clamp-2">
              {article.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {article.snippet}
            </p>
            
            <div className="flex justify-end">
              <a 
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:text-primary-dark transition-colors"
              >
                Lire l'article complet
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="text-center text-sm text-muted-foreground">
        <p>Actualités mises à jour automatiquement depuis Google News</p>
      </div>
    </div>
  );
};