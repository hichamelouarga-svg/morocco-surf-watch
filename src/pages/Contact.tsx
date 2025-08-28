import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Send, Camera, Globe, Heart, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailjsConfig, setEmailjsConfig] = useState({
    serviceId: '',
    templateId: '',
    publicKey: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database first
      const { error: dbError } = await (supabase as any)
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          inquiry_type: formData.inquiryType || null,
        });

      if (dbError) {
        console.error('❌ Database error:', dbError);
        throw dbError;
      }

      // Send via EmailJS if configured
      if (emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey) {
        try {
          await emailjs.send(
            emailjsConfig.serviceId,
            emailjsConfig.templateId,
            {
              from_name: formData.name,
              from_email: formData.email,
              subject: formData.subject,
              message: formData.message,
              inquiry_type: formData.inquiryType,
              to_email: 'hicham@surfaumaroc.com'
            },
            emailjsConfig.publicKey
          );
          console.log('✅ EmailJS email sent successfully');
        } catch (emailError) {
          console.error('❌ EmailJS error:', emailError);
        }
      }

      toast({
        title: "Message envoyé avec succès !",
        description: "Merci de nous avoir contactés. Nous vous répondrons bientôt.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error sending message",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const inquiryTypes = [
    { value: 'sponsorship', label: t('sponsorship_inquiry') },
    { value: 'camera', label: t('camera_hosting') },
    { value: 'technical', label: t('technical_support') },
    { value: 'partnership', label: t('partnership') },
    { value: 'media', label: t('media_inquiry') },
    { value: 'other', label: t('other') }
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
              {t('contact_subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-ocean">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">{t('send_message')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t('full_name')} *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{t('email_address')} *</Label>
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
                      <Label htmlFor="inquiry-type">{t('inquiry_type')}</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder={t('select_inquiry_type')} />
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
                      <Label htmlFor="subject">{t('subject')} *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">{t('message')} *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="mt-2 min-h-[120px]"
                        required
                      />
                    </div>

                    {/* EmailJS Configuration */}
                    <div className="border rounded-lg p-4 bg-muted/10">
                      <Label className="text-sm font-medium mb-3 block">EmailJS Configuration (Optional)</Label>
                      <div className="grid gap-3">
                        <Input
                          placeholder="Service ID"
                          value={emailjsConfig.serviceId}
                          onChange={(e) => setEmailjsConfig(prev => ({ ...prev, serviceId: e.target.value }))}
                          className="text-sm"
                        />
                        <Input
                          placeholder="Template ID"
                          value={emailjsConfig.templateId}
                          onChange={(e) => setEmailjsConfig(prev => ({ ...prev, templateId: e.target.value }))}
                          className="text-sm"
                        />
                        <Input
                          placeholder="Public Key"
                          value={emailjsConfig.publicKey}
                          onChange={(e) => setEmailjsConfig(prev => ({ ...prev, publicKey: e.target.value }))}
                          className="text-sm"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Configure EmailJS to automatically send email notifications. Get these from your EmailJS dashboard.
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary-dark" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <AlertCircle className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {t('send_message_btn')}
                        </>
                      )}
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
                  <CardTitle className="font-display text-xl">{t('contact_information')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">{t('email')}</p>
                      <p className="text-sm text-muted-foreground">contact@surfaumaroc.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">{t('phone')}</p>
                      <p className="text-sm text-muted-foreground">+212 XXX-XXXX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">{t('location')}</p>
                      <p className="text-sm text-muted-foreground">Maroc</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-wave">
                <CardHeader>
                  <CardTitle className="font-display text-xl">{t('quick_actions')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Camera className="w-4 h-4 mr-2" />
                    {t('camera_installation')}
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="w-4 h-4 mr-2" />
                    {t('sponsorship_packages')}
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    {t('partnership_opportunities')}
                  </Button>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="bg-gradient-ocean text-white shadow-ocean">
                <CardContent className="p-6 text-center">
                  <h3 className="font-display text-xl font-bold mb-2">
                    {t('fast_response')}
                  </h3>
                  <p className="text-white/90 mb-4">
                    {t('response_time_desc')}
                  </p>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-sm">
                      <strong>{t('business_hours')}</strong><br />
                      {t('business_hours_time')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="font-display text-3xl font-bold text-center text-foreground mb-8">
              {t('faq')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-wave">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">{t('faq_sponsor_q')}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t('faq_sponsor_a')}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-wave">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">{t('faq_camera_q')}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t('faq_camera_a')}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-wave">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">{t('faq_forecast_q')}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t('faq_forecast_a')}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-wave">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">{t('faq_stream_q')}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t('faq_stream_a')}
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