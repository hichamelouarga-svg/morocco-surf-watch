import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-morocco-coast.jpg';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Morocco Coastline" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-secondary/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-lg">
            {t('hero_title')}
          </h1>
          <p className="font-display text-2xl md:text-3xl text-accent mb-6 drop-shadow-md">
            {t('hero_subtitle')}
          </p>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('hero_description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-coral hover:bg-coral/90 text-white shadow-wave text-lg px-8 py-4 h-auto"
            >
              <Link to="/live-cams" className="flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                {t('view_live_cams')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-4 h-auto"
            >
              <Link to="/surf-spots" className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {t('explore_spots')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};