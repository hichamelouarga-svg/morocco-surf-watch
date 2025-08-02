import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RSSService, RSSItem } from '@/services/rssService';
import surfWaves from '@/assets/surf-waves.jpg';

const News = () => {
  const { t } = useTranslation();
  const [rssArticles, setRssArticles] = useState<RSSItem[]>([]);
  const [originalSurfArticles, setOriginalSurfArticles] = useState<RSSItem[]>([]);
  const [wslArticles, setWslArticles] = useState<RSSItem[]>([]);
  const [isLoadingRss, setIsLoadingRss] = useState(true);

  useEffect(() => {
    const fetchRSSFeeds = async () => {
      try {
        const [federationArticles, originalSurfArticles, wslArticles] = await Promise.all([
          RSSService.fetchRSSFeed('https://www.fedesurfmaroc.com/feed/'),
          RSSService.fetchRSSFeed('https://www.originalsurfmorocco.com/feed/'),
          RSSService.fetchRSSFeed('https://www.worldsurfleague.com/news')
        ]);
        setRssArticles(federationArticles);
        setOriginalSurfArticles(originalSurfArticles);
        setWslArticles(wslArticles);
      } catch (error) {
        console.error('Failed to fetch RSS feeds:', error);
      } finally {
        setIsLoadingRss(false);
      }
    };

    fetchRSSFeeds();
  }, []);

  const newsArticles = [
    {
      id: '1',
      title: t('perfect_waves_title'),
      excerpt: t('perfect_waves_excerpt'),
      image: surfWaves,
      date: '2024-01-15',
      author: 'Surf Team',
      category: t('conditions')
    },
    {
      id: '2',
      title: t('new_camera_title'),
      excerpt: t('new_camera_excerpt'),
      image: surfWaves,
      date: '2024-01-12',
      author: 'Tech Team',
      category: t('technology')
    },
    {
      id: '3',
      title: t('winter_forecast_title'),
      excerpt: t('winter_forecast_excerpt'),
      image: surfWaves,
      date: '2024-01-10',
      author: 'Weather Team',
      category: t('forecast')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('news')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('news_subtitle')}
            </p>
          </div>

          {/* Latest from Federation */}
          {rssArticles.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Dernières nouvelles de la Fédération
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rssArticles.map((article, index) => (
                  <Card key={index} className="shadow-wave hover:shadow-ocean transition-shadow duration-300 overflow-hidden">
                    <div className="aspect-video overflow-hidden bg-gradient-sunset">
                      <div className="w-full h-full flex items-center justify-center text-white font-semibold">
                        Fédération Surf Maroc
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Fédération</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {RSSService.formatDate(article.pubDate)}
                        </div>
                      </div>
                      
                      <CardTitle className="font-display text-xl leading-tight line-clamp-2">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {article.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {article.author && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="w-4 h-4 mr-1" />
                            {article.author}
                          </div>
                        )}
                        
                        <a 
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-primary hover:text-primary-dark transition-colors"
                        >
                          Lire l'article
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Original Surf Morocco */}
          {originalSurfArticles.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Original Surf Morocco
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {originalSurfArticles.map((article, index) => (
                  <Card key={index} className="shadow-wave hover:shadow-ocean transition-shadow duration-300 overflow-hidden">
                    <div className="aspect-video overflow-hidden bg-gradient-ocean">
                      <div className="w-full h-full flex items-center justify-center text-white font-semibold">
                        Original Surf Morocco
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Original Surf</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {RSSService.formatDate(article.pubDate)}
                        </div>
                      </div>
                      
                      <CardTitle className="font-display text-xl leading-tight line-clamp-2">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {article.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {article.author && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="w-4 h-4 mr-1" />
                            {article.author}
                          </div>
                        )}
                        
                        <a 
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-primary hover:text-primary-dark transition-colors"
                        >
                          Lire l'article
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* World Surf League */}
          {wslArticles.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                World Surf League
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {wslArticles.map((article, index) => (
                  <Card key={index} className="shadow-wave hover:shadow-ocean transition-shadow duration-300 overflow-hidden">
                    <div className="aspect-video overflow-hidden bg-gradient-primary">
                      <div className="w-full h-full flex items-center justify-center text-white font-semibold">
                        World Surf League
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">WSL</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {RSSService.formatDate(article.pubDate)}
                        </div>
                      </div>
                      
                      <CardTitle className="font-display text-xl leading-tight line-clamp-2">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {article.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {article.author && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="w-4 h-4 mr-1" />
                            {article.author}
                          </div>
                        )}
                        
                        <a 
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-primary hover:text-primary-dark transition-colors"
                        >
                          Lire l'article
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Local News */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Actualités locales
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article) => (
              <Card key={article.id} className="shadow-wave hover:shadow-ocean transition-shadow duration-300 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{article.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <CardTitle className="font-display text-xl leading-tight">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                    
                    <Link 
                      to={`/news/${article.id}`}
                      className="flex items-center text-primary hover:text-primary-dark transition-colors"
                    >
                      {t('read_more')}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured Banner */}
          <div className="mt-16">
            <Card className="bg-gradient-sunset text-white shadow-ocean">
              <CardContent className="p-8 text-center">
                <h2 className="font-display text-3xl font-bold mb-4">
                  {t('good_conditions_alert')}
                </h2>
                <p className="text-xl mb-6 text-white/90">
                  {t('perfect_surf_conditions')}
                </p>
                <Badge className="bg-white text-sunset text-lg px-4 py-2">
                  {t('excellent_surf_badge')}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;