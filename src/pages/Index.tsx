import { Navigation } from '@/components/Navigation';
import { SurfSpotMap } from '@/components/SurfSpotMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Camera, Waves, Users, TrendingUp } from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Video Background Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          onLoadStart={() => console.log('Video loading started')}
          onCanPlay={() => console.log('Video can play')}
          onError={(e) => {
            console.log('Video failed to load, showing fallback background');
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'block';
            e.currentTarget.style.display = 'none';
          }}
        >
          <source
            src="https://cdn.pixabay.com/vimeo/450020750/waves-108644.mp4?width=1920&hash=5dc07b94a2b8fb4f0a32b7b03f2b58b7d3f8c9cc"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://sample-videos.com/zip/10/mp4/480/mp4-480-1045-1045-7610.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Fallback Background Image - hidden by default */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1502933691298-84fc14542831?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            display: 'none'
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Hero Content */}
        <div className="relative z-20 text-center text-white px-4 animate-fade-in">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            SurfMaroc
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90 drop-shadow-md">
            {t('home_hero_subtitle')}
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-primary mb-1">12</div>
              <div className="text-sm text-white/80">{t('surf_spots')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-coral mb-1">4</div>
              <div className="text-sm text-white/80">{t('live_cameras')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-sunset mb-1">8</div>
              <div className="text-sm text-white/80">{t('coming_soon_count')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-ocean mb-1">24/7</div>
              <div className="text-sm text-white/80">{t('forecasts')}</div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/live-cams">
              <Button size="lg" className="bg-coral hover:bg-coral-dark text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Camera className="w-5 h-5 mr-2" />
                {t('watch_live_cameras')}
              </Button>
            </Link>
            <Link to="/surf-spots">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg font-semibold shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <Waves className="w-5 h-5 mr-2" />
                {t('explore_spots')}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
      
      {/* Interactive Map Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('interactive_surf_spots_map')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('click_marker_explore')}
            </p>
          </div>
          <SurfSpotMap />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-wave hover:shadow-ocean transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold mb-4">{t('live_hd_cameras')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('live_cameras_description')}
                </p>
                <Link to="/live-cams">
                  <Button variant="outline" className="hover-scale">
                    {t('watch_now')}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-wave hover:shadow-ocean transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold mb-4">{t('accurate_forecasts')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('forecasts_description')}
                </p>
                <Link to="/surf-spots">
                  <Button variant="outline" className="hover-scale">
                    {t('view_forecasts')}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-wave hover:shadow-ocean transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-sunset rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold mb-4">{t('local_community')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('community_description')}
                </p>
                <Link to="/news">
                  <Button variant="outline" className="hover-scale">
                    {t('join_community')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-ocean text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            {t('ready_to_surf_morocco')}
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            {t('join_surfers_description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/live-cams">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105">
                {t('start_watching')}
              </Button>
            </Link>
            <Link to="/sponsor">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105">
                {t('support_us')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;