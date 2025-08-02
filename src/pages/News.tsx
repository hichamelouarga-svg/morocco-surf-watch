import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import surfWaves from '@/assets/surf-waves.jpg';

const News = () => {
  const { t } = useTranslation();

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