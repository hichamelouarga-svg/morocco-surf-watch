import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      // Navigation
      "home": "Accueil",
      "surf_spots": "Spots de Surf",
      "live_cams": "Caméras Live",
      "news": "Actualités",
      "sponsor": "Nous Sponsoriser",
      "contact": "Contact",
      "about": "À Propos",
      
      // Hero Section
      "hero_title": "Surf au Maroc",
      "hero_subtitle": "Découvrez les meilleurs spots de surf du Maroc",
      "hero_description": "Prévisions météo en temps réel, caméras live et conditions de surf pour tous les spots du Maroc",
      "view_live_cams": "Voir les Caméras Live",
      "explore_spots": "Explorer les Spots",
      
      // Weather & Surf Data
      "wave_height": "Hauteur des Vagues",
      "wind_speed": "Vitesse du Vent",
      "water_temp": "Température de l'Eau",
      "tide": "Marée",
      "moon_phase": "Phase Lunaire",
      "daylight": "Heures de Jour",
      "forecast_7_days": "Prévisions 7 Jours",
      "good_conditions": "Bonnes conditions de surf à",
      
      // Surf Spots
      "mehdia_beach": "Plage de Mehdia",
      "rabat_beach": "Plage de Rabat",
      "mohammedia": "Mohammedia",
      "casablanca_beach": "Plage de Casablanca",
      "dar_bouazza": "Dar Bouazza",
      "bouznika": "Bouznika",
      "plage_des_nations": "Plage des Nations",
      "larache": "Larache",
      "assilah": "Assilah",
      "moulay_bouselham": "Moulay Bouselham",
      "safi": "Safi",
      "imsouane": "Imsouane",
      "taghazout": "Taghazout",
      
      // Sponsorship
      "sponsor_page": "Sponsoriser une Page",
      "sponsor_spot": "Sponsoriser un Spot",
      "sponsor_website": "Sponsoriser le Site",
      "host_cam": "Héberger une Caméra",
      "sponsor_page_price": "1 000 € / an",
      "sponsor_spot_price": "4 000 € / an",
      "sponsor_website_price": "10 000 € / an",
      "contact_us": "Nous Contacter",
      
      // Live Streams
      "live_now": "En Direct",
      "coming_soon": "Bientôt Disponible",
      "stream_unavailable": "Stream Indisponible",
      
      // 404 Page
      "page_not_found": "Page non trouvée",
      "page_not_found_message": "Oups ! La page que vous cherchez n'existe pas",
      "return_home": "Retour à l'accueil",
      
      // Map Interface
      "click_marker_explore": "Cliquez sur un marqueur pour explorer les spots de surf du Maroc",
      "select_surf_spot": "Sélectionner un Spot de Surf",
      "click_marker_details": "Cliquez sur un marqueur sur la carte pour voir les détails de ce spot de surf",
      "quick_stats": "Statistiques Rapides",
      "total_spots": "Total des Spots :",
      "live_cameras": "Caméras Live :",
      "coming_soon_count": "Bientôt Disponible :"
    }
  },
  en: {
    translation: {
      // Navigation
      "home": "Home",
      "surf_spots": "Surf Spots",
      "live_cams": "Live Cams",
      "news": "News",
      "sponsor": "Sponsor Us",
      "contact": "Contact",
      "about": "About",
      
      // Hero Section
      "hero_title": "Surf in Morocco",
      "hero_subtitle": "Discover Morocco's Best Surf Spots",
      "hero_description": "Real-time weather forecasts, live cameras and surf conditions for all Morocco's surf spots",
      "view_live_cams": "View Live Cams",
      "explore_spots": "Explore Spots",
      
      // Weather & Surf Data
      "wave_height": "Wave Height",
      "wind_speed": "Wind Speed",
      "water_temp": "Water Temperature",
      "tide": "Tide",
      "moon_phase": "Moon Phase",
      "daylight": "Daylight Hours",
      "forecast_7_days": "7-Day Forecast",
      "good_conditions": "Good surf conditions at",
      
      // Surf Spots
      "mehdia_beach": "Mehdia Beach",
      "rabat_beach": "Rabat Beach",
      "mohammedia": "Mohammedia",
      "casablanca_beach": "Casablanca Beach",
      "dar_bouazza": "Dar Bouazza",
      "bouznika": "Bouznika",
      "plage_des_nations": "Plage des Nations",
      "larache": "Larache",
      "assilah": "Assilah",
      "moulay_bouselham": "Moulay Bouselham",
      "safi": "Safi",
      "imsouane": "Imsouane",
      "taghazout": "Taghazout",
      
      // Sponsorship
      "sponsor_page": "Sponsor a Page",
      "sponsor_spot": "Sponsor a Spot",
      "sponsor_website": "Sponsor the Website",
      "host_cam": "Host a Camera",
      "sponsor_page_price": "€1,000 / year",
      "sponsor_spot_price": "€4,000 / year",
      "sponsor_website_price": "€10,000 / year",
      "contact_us": "Contact Us",
      
      // Live Streams
      "live_now": "Live Now",
      "coming_soon": "Coming Soon",
      "stream_unavailable": "Stream Unavailable"
    }
  },
  ar: {
    translation: {
      // Navigation
      "home": "الرئيسية",
      "surf_spots": "أماكن السيرف",
      "live_cams": "كاميرات مباشرة",
      "news": "الأخبار",
      "sponsor": "ادعمنا",
      "contact": "اتصل بنا",
      "about": "حولنا",
      
      // Hero Section
      "hero_title": "السيرف في المغرب",
      "hero_subtitle": "اكتشف أفضل أماكن السيرف في المغرب",
      "hero_description": "توقعات الطقس في الوقت الفعلي وكاميرات مباشرة وأحوال السيرف لجميع أماكن السيرف في المغرب",
      "view_live_cams": "مشاهدة الكاميرات المباشرة",
      "explore_spots": "استكشاف الأماكن",
      
      // Weather & Surf Data
      "wave_height": "ارتفاع الأمواج",
      "wind_speed": "سرعة الرياح",
      "water_temp": "درجة حرارة الماء",
      "tide": "المد والجزر",
      "moon_phase": "مرحلة القمر",
      "daylight": "ساعات النهار",
      "forecast_7_days": "توقعات 7 أيام",
      "good_conditions": "ظروف سيرف جيدة في",
      
      // Surf Spots
      "mehdia_beach": "شاطئ المهدية",
      "rabat_beach": "شاطئ الرباط",
      "mohammedia": "المحمدية",
      "casablanca_beach": "شاطئ الدار البيضاء",
      "dar_bouazza": "دار بوعزة",
      "bouznika": "بوزنيقة",
      "plage_des_nations": "شاطئ الأمم",
      "larache": "العرائش",
      "assilah": "أصيلة",
      "moulay_bouselham": "مولاي بوسلهام",
      "safi": "آسفي",
      "imsouane": "إمسوان",
      "taghazout": "تاغازوت",
      
      // Sponsorship
      "sponsor_page": "رعاية صفحة",
      "sponsor_spot": "رعاية موقع",
      "sponsor_website": "رعاية الموقع",
      "host_cam": "استضافة كاميرا",
      "sponsor_page_price": "1000 يورو / سنة",
      "sponsor_spot_price": "4000 يورو / سنة",
      "sponsor_website_price": "10000 يورو / سنة",
      "contact_us": "اتصل بنا",
      
      // Live Streams
      "live_now": "مباشر الآن",
      "coming_soon": "قريباً",
      "stream_unavailable": "البث غير متاح"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // default language
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;