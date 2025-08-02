import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { SurfSpotMap } from '@/components/SurfSpotMap';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <SurfSpotMap />
    </div>
  );
};

export default Index;
