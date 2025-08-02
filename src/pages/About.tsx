import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Camera, Waves, Users, Globe, Heart, Target, Eye, Award } from 'lucide-react';
import heroImage from '@/assets/hero-morocco-coast.jpg';

const About = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: 'Ahmed Benali',
      role: 'Founder & CEO',
      description: 'Professional surfer and tech entrepreneur passionate about Morocco\'s surf culture.',
      icon: <Waves className="w-6 h-6" />
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Technology',
      description: 'Expert in live streaming technology and weather data integration.',
      icon: <Camera className="w-6 h-6" />
    },
    {
      name: 'Omar Fassi',
      role: 'Surf Forecaster',
      description: 'Marine meteorologist with 15+ years of experience in Atlantic weather patterns.',
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const milestones = [
    { year: '2024', event: 'Surf au Maroc launched with first live camera at Mehdia Beach' },
    { year: '2024', event: 'Multi-language support added (French, English, Arabic)' },
    { year: '2024', event: 'Partnership with Open-Meteo for accurate weather data' },
    { year: '2024', event: 'Growing network of surf spots across Morocco' }
  ];

  const values = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Transparency',
      description: 'Real-time, accurate surf conditions and weather data you can trust'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Community',
      description: 'Supporting Morocco\'s surf community and promoting local culture'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Cutting-edge technology to enhance your surf experience'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'Committed to providing the best surf forecasting platform'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative rounded-2xl overflow-hidden mb-16">
            <img 
              src={heroImage} 
              alt="Morocco Coast" 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl">
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                    {t('about')} Surf au Maroc
                  </h1>
                  <p className="text-xl text-white/90 mb-8">
                    Connecting surfers with Morocco's incredible coastline through technology, 
                    real-time data, and a passion for the ocean.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Badge className="bg-white text-primary text-lg px-4 py-2">
                      13 Surf Spots
                    </Badge>
                    <Badge className="bg-coral text-white text-lg px-4 py-2">
                      Live Cameras
                    </Badge>
                    <Badge className="bg-sunset text-white text-lg px-4 py-2">
                      3 Languages
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Our Story */}
              <section>
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="mb-4">
                    Surf au Maroc was born from a simple idea: to make Morocco's incredible surf culture 
                    more accessible to surfers around the world. With its 3,500 kilometers of Atlantic 
                    coastline, Morocco offers some of the most consistent and diverse surf conditions 
                    in the world.
                  </p>
                  <p className="mb-4">
                    Our platform combines cutting-edge technology with local expertise to provide 
                    real-time surf conditions, weather forecasts, and live camera feeds from Morocco's 
                    premier surf destinations. From the powerful waves of Taghazout to the gentle breaks 
                    of Mehdia Beach, we're here to help you find the perfect wave.
                  </p>
                  <p>
                    More than just a forecasting service, Surf au Maroc is a celebration of Morocco's 
                    rich coastal heritage and the growing international surf community that calls 
                    these waters home.
                  </p>
                </div>
              </section>

              {/* Mission & Vision */}
              <section>
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="shadow-wave">
                    <CardHeader>
                      <CardTitle className="font-display text-2xl flex items-center">
                        <Target className="w-6 h-6 mr-2 text-primary" />
                        Our Mission
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        To provide the most accurate, accessible, and comprehensive surf forecasting 
                        platform for Morocco, supporting both local and international surf communities 
                        while promoting sustainable coastal tourism.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-wave">
                    <CardHeader>
                      <CardTitle className="font-display text-2xl flex items-center">
                        <Eye className="w-6 h-6 mr-2 text-secondary" />
                        Our Vision
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        To become the definitive resource for surf conditions in Morocco and North 
                        Africa, fostering a global community of surfers while preserving and 
                        celebrating Morocco's unique coastal culture.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Our Values */}
              <section>
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">Our Values</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <Card key={index} className="shadow-wave">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="text-primary">
                            {value.icon}
                          </div>
                          <div>
                            <h3 className="font-display text-xl font-bold mb-2">{value.title}</h3>
                            <p className="text-muted-foreground">{value.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Timeline */}
              <section>
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">Our Journey</h2>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {milestone.year.slice(-2)}
                      </div>
                      <div className="flex-grow">
                        <div className="bg-muted rounded-lg p-4">
                          <p className="font-medium text-foreground">{milestone.event}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Team */}
              <Card className="shadow-ocean">
                <CardHeader>
                  <CardTitle className="font-display text-2xl flex items-center">
                    <Users className="w-6 h-6 mr-2" />
                    Our Team
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start space-x-3">
                        <div className="text-primary">
                          {member.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{member.name}</h3>
                          <p className="text-sm text-primary font-medium">{member.role}</p>
                          <p className="text-sm text-muted-foreground mt-1">{member.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="shadow-wave">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Platform Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Surf Spots:</span>
                    <span className="font-bold">13</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Live Cameras:</span>
                    <span className="font-bold">1 (Growing)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Languages:</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data Updates:</span>
                    <span className="font-bold">4x Daily</span>
                  </div>
                </CardContent>
              </Card>

              {/* Contact CTA */}
              <Card className="bg-gradient-ocean text-white shadow-ocean">
                <CardContent className="p-6 text-center">
                  <h3 className="font-display text-xl font-bold mb-4">
                    Join Our Mission
                  </h3>
                  <p className="text-white/90 mb-6">
                    Partner with us to expand Morocco's surf monitoring network
                  </p>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="bg-white text-primary hover:bg-white/90 border-white"
                  >
                    <Link to="/contact">
                      Get in Touch
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;