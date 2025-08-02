import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Send, Camera, Globe, Heart } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const inquiryTypes = [
    { value: 'sponsorship', label: 'Sponsorship Inquiry' },
    { value: 'camera', label: 'Camera Hosting' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'media', label: 'Media Inquiry' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('contact')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get in touch with our team for partnerships, technical support, or any questions about Surf au Maroc
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-ocean">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="inquiry-type">Inquiry Type</Label>
                      <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="mt-2 min-h-[120px]"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Contact Details */}
              <Card className="shadow-wave">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">contact@surfaumaroc.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+212 XXX-XXXX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Morocco</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-wave">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Camera className="w-4 h-4 mr-2" />
                    Camera Installation
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="w-4 h-4 mr-2" />
                    Sponsorship Packages
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Partnership Opportunities
                  </Button>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="bg-gradient-ocean text-white shadow-ocean">
                <CardContent className="p-6 text-center">
                  <h3 className="font-display text-xl font-bold mb-2">
                    Fast Response
                  </h3>
                  <p className="text-white/90 mb-4">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-sm">
                      <strong>Business Hours:</strong><br />
                      Monday - Friday: 9:00 AM - 6:00 PM (GMT)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="font-display text-3xl font-bold text-center text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-wave">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">How can I sponsor a surf spot?</h3>
                  <p className="text-muted-foreground text-sm">
                    Visit our sponsorship page to view available packages, or contact us directly for custom sponsorship opportunities.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-wave">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Can I host a camera at my location?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes! We're always looking for new camera locations. Contact us to discuss technical requirements and partnership terms.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-wave">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">How accurate are the weather forecasts?</h3>
                  <p className="text-muted-foreground text-sm">
                    Our forecasts use data from Open-Meteo and are updated four times daily for maximum accuracy.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-wave">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Is the live stream available 24/7?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes, our live cameras operate continuously. Occasional maintenance windows are announced in advance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;