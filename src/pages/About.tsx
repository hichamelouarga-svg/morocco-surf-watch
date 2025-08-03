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
      role: t('founder_role'),
      description: t('founder_desc'),
      icon: <Waves className="w-6 h-6" />
    },
    {
      name: 'Sarah Johnson',
      role: t('tech_head_role'),
      description: t('tech_head_desc'),
      icon: <Camera className="w-6 h-6" />
    },
    {
      name: 'Omar Fassi',
      role: t('forecaster_role'),
      description: t('forecaster_desc'),
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const milestones = [
    { year: '2024', event: t('milestone_1') },
    { year: '2024', event: t('milestone_2') },
    { year: '2024', event: t('milestone_3') },
    { year: '2024', event: t('milestone_4') }
  ];

  const values = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: t('transparency'),
      description: t('transparency_desc')
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('community'),
      description: t('community_desc')
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t('innovation'),
      description: t('innovation_desc')
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t('excellence'),
      description: t('excellence_desc')
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
                    {t('about_story_p1')}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Badge className="bg-white text-primary text-lg px-4 py-2">
                      15 {t('surf_spots')}
                    </Badge>
                    <Badge className="bg-coral text-white text-lg px-4 py-2">
                      {t('live_cameras')}
                    </Badge>
                    <Badge className="bg-sunset text-white text-lg px-4 py-2">
                      3 {t('languages_count').replace(':', '')}
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
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">{t('our_story')}</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="mb-4">
                    {t('about_story_p1')}
                  </p>
                  <p className="mb-4">
                    {t('about_story_p2')}
                  </p>
                  <p>
                    {t('about_story_p3')}
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
                        {t('our_mission')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {t('mission_text')}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-wave">
                    <CardHeader>
                      <CardTitle className="font-display text-2xl flex items-center">
                        <Eye className="w-6 h-6 mr-2 text-secondary" />
                        {t('our_vision')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {t('vision_text')}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Our Values */}
              <section>
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">{t('our_values')}</h2>
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
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">{t('our_journey')}</h2>
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
                    {t('our_team')}
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
                  <CardTitle className="font-display text-xl">{t('platform_stats')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('surf_spots_count')}</span>
                    <span className="font-bold">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('live_cameras_count')}</span>
                    <span className="font-bold">{t('growing')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('languages_count')}</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('data_updates')}</span>
                    <span className="font-bold">{t('data_updates_freq')}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Contact CTA */}
              <Card className="bg-gradient-ocean text-white shadow-ocean">
                <CardContent className="p-6 text-center">
                  <h3 className="font-display text-xl font-bold mb-4">
                    {t('join_mission')}
                  </h3>
                  <p className="text-white/90 mb-6">
                    {t('join_mission_desc')}
                  </p>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="bg-white text-primary hover:bg-white/90 border-white"
                  >
                    <Link to="/contact">
                      {t('get_in_touch')}
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