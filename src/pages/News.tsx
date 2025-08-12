import { Navigation } from '@/components/Navigation';
import { GoogleNewsFeed } from '@/components/GoogleNewsFeed';
import { ManualNewsSection } from '@/components/ManualNewsSection';
import { YouTubeVideosSection } from '@/components/YouTubeVideosSection';

const News = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Actualités Surf Maroc
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dernières actualités de la Fédération Marocaine de Surf et Surfer.com, et 5 dernières vidéos YouTube sur "Surf Morocco".
            </p>
          </div>

          {/* Google News Feed */}
          <div className="mb-16">
            <GoogleNewsFeed />
          </div>

          {/* YouTube Videos Section */}
          <div className="mb-16">
            <YouTubeVideosSection />
          </div>

          {/* Manual News Section */}
          <div className="mb-16">
            <ManualNewsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;