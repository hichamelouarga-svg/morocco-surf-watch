import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Camera, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sponsor = () => {
  const { t } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');

  // Currency configuration
  const currencies = [
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'USD', symbol: '$', name: 'Dollar' },
    { code: 'MAD', symbol: 'DH', name: 'Dirham' }
  ];

  // Currency conversion rates (base: EUR)
  const exchangeRates = {
    EUR: 1,
    USD: 1.09,
    MAD: 10.8
  };

  // Base prices in EUR
  const basePrices = {
    page: 1000,
    spot: 4000,
    website: 10000
  };

  // Function to convert price based on selected currency
  const convertPrice = (basePrice: number) => {
    const convertedPrice = basePrice * exchangeRates[selectedCurrency as keyof typeof exchangeRates];
    const currency = currencies.find(c => c.code === selectedCurrency);
    
    return `${Math.round(convertedPrice).toLocaleString()} ${currency?.symbol}`;
  };

  // Generate sponsorship plans dynamically based on selected currency
  const sponsorshipPlans = [
    {
      id: 'page',
      title: t('sponsor_page'),
      price: convertPrice(basePrices.page) + ' / an',
      icon: <Star className="w-8 h-8" />,
      color: 'bg-secondary',
      features: [
        t('sponsor_page_feature_1'),
        t('sponsor_page_feature_2'),
        t('sponsor_page_feature_3'),
        t('sponsor_page_feature_4')
      ]
    },
    {
      id: 'spot',
      title: t('sponsor_spot'),
      price: convertPrice(basePrices.spot) + ' / an',
      icon: <Crown className="w-8 h-8" />,
      color: 'bg-primary',
      popular: true,
      features: [
        t('sponsor_spot_feature_1'),
        t('sponsor_spot_feature_2'),
        t('sponsor_spot_feature_3'),
        t('sponsor_spot_feature_4'),
        t('sponsor_spot_feature_5'),
        t('sponsor_spot_feature_6')
      ]
    },
    {
      id: 'website',
      title: t('sponsor_website'),
      price: convertPrice(basePrices.website) + ' / an',
      icon: <Crown className="w-8 h-8" />,
      color: 'bg-gradient-sunset',
      premium: true,
      features: [
        t('sponsor_website_feature_1'),
        t('sponsor_website_feature_2'),
        t('sponsor_website_feature_3'),
        t('sponsor_website_feature_4'),
        t('sponsor_website_feature_5'),
        t('sponsor_website_feature_6'),
        t('sponsor_website_feature_7'),
        t('sponsor_website_feature_8')
      ]
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('sponsor')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('sponsor_subtitle')}
            </p>
            
            {/* Currency Selector */}
            <div className="flex justify-center gap-2 mb-8">
              {currencies.map((currency) => (
                <Badge 
                  key={currency.code} 
                  variant={selectedCurrency === currency.code ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedCurrency === currency.code 
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'hover:bg-primary hover:text-white'
                  }`}
                  onClick={() => setSelectedCurrency(currency.code)}
                >
                  {currency.symbol} {currency.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Sponsorship Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {sponsorshipPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative shadow-wave hover:shadow-ocean transition-all duration-300 ${
                  plan.popular ? 'border-primary border-2' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-coral text-white px-4 py-1">
                      {t('most_popular')}
                    </Badge>
                  </div>
                )}
                
                {plan.premium && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-sunset text-white px-4 py-1">
                      {t('premium')}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="font-display text-2xl font-bold">
                    {plan.title}
                  </CardTitle>
                  <div className="text-3xl font-bold text-primary mt-2">
                    {plan.price}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary-dark' 
                        : plan.premium 
                        ? 'bg-sunset hover:bg-sunset/90'
                        : 'bg-secondary hover:bg-secondary-dark'
                    }`}
                  >
                    <Link to="/contact">
                      {t('choose_plan')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Host a Camera */}
          <Card className="bg-gradient-ocean text-white shadow-ocean">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <Camera className="w-8 h-8 mr-3" />
                    <h2 className="font-display text-3xl font-bold">
                      {t('host_cam')}
                    </h2>
                  </div>
                  <p className="text-xl text-white/90 mb-6">
                    {t('host_cam_desc')}
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 mr-2" />
                      {t('host_cam_feature_1')}
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 mr-2" />
                      {t('host_cam_feature_2')}
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 mr-2" />
                      {t('host_cam_feature_3')}
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 mr-2" />
                      {t('host_cam_feature_4')}
                    </li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <Camera className="w-16 h-16 mx-auto mb-4 text-accent" />
                    <h3 className="font-display text-2xl font-bold mb-4">
                      {t('become_camera_host')}
                    </h3>
                    <Button 
                      asChild 
                      variant="outline" 
                      className="bg-white text-primary hover:bg-white/90 border-white"
                    >
                      <Link to="/contact" className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {t('contact_us')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="mt-16 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              {t('why_sponsor')}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">10k+</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{t('monthly_visitors')}</h3>
                <p className="text-muted-foreground">
                  {t('monthly_visitors_desc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">24/7</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{t('live_coverage')}</h3>
                <p className="text-muted-foreground">
                  {t('live_coverage_desc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">100%</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{t('surf_focused')}</h3>
                <p className="text-muted-foreground">
                  {t('surf_focused_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsor;