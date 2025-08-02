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
      title: 'Perfect Waves Hit Taghazout This Week',
      excerpt: 'Surfers flock to Morocco\'s surf capital as Atlantic swells deliver perfect conditions.',
      image: surfWaves,
      date: '2024-01-15',
      author: 'Surf Team',
      category: 'Conditions'
    },
    {
      id: '2',
      title: 'New Live Camera Installation at Imsouane',
      excerpt: 'Experience the famous right-hand point break in real-time with our new HD camera.',
      image: surfWaves,
      date: '2024-01-12',
      author: 'Tech Team',
      category: 'Technology'
    },
    {
      id: '3',
      title: 'Winter Swell Forecast: What to Expect',
      excerpt: 'Our meteorologists break down the upcoming winter swell patterns for Morocco.',
      image: surfWaves,
      date: '2024-01-10',
      author: 'Weather Team',
      category: 'Forecast'
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
              Stay updated with the latest surf conditions, forecasts, and news from Morocco
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
                      Read More
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
                  Good Conditions Alert!
                </h2>
                <p className="text-xl mb-6 text-white/90">
                  Perfect surf conditions detected at Mehdia Beach - 2.1m waves with offshore winds
                </p>
                <Badge className="bg-white text-sunset text-lg px-4 py-2">
                  🏄‍♂️ Excellent Surf Conditions
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