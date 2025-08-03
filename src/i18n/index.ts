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
      
      // Sponsor page content
      "sponsor_subtitle": "Partenariez avec Surf au Maroc pour atteindre des milliers d'amateurs de surf et soutenir la communauté surf du Maroc",
      "most_popular": "Plus Populaire",
      "premium": "Premium",
      "choose_plan": "Choisir le Forfait",
      
      // Sponsor page features
      "sponsor_page_feature_1": "Placement de logo sur une page",
      "sponsor_page_feature_2": "Rapport d'analyse mensuel",
      "sponsor_page_feature_3": "Mentions sur les réseaux sociaux",
      "sponsor_page_feature_4": "Informations de contact direct",
      
      "sponsor_spot_feature_1": "Logo sur la page du spot de surf",
      "sponsor_spot_feature_2": "Branding superposé sur caméra live",
      "sponsor_spot_feature_3": "Placement premium dans les listes",
      "sponsor_spot_feature_4": "Rapports de performance hebdomadaires",
      "sponsor_spot_feature_5": "Promotion sur les réseaux sociaux",
      "sponsor_spot_feature_6": "Mentions dans la newsletter",
      
      "sponsor_website_feature_1": "Placement de logo sur tout le site",
      "sponsor_website_feature_2": "Espace bannière sur la page d'accueil",
      "sponsor_website_feature_3": "Branding superposé sur toutes les caméras",
      "sponsor_website_feature_4": "Priorité dans toutes les listes",
      "sponsor_website_feature_5": "Rapports d'analyse quotidiens",
      "sponsor_website_feature_6": "Promotion sociale dédiée",
      "sponsor_website_feature_7": "Distribution de communiqués de presse",
      "sponsor_website_feature_8": "Création de contenu personnalisé",
      
      // Host camera section
      "host_cam_desc": "Vous avez un excellent emplacement de spot de surf ? Partenariez avec nous pour installer une caméra live et rejoindre notre réseau.",
      "host_cam_feature_1": "Installation gratuite de caméra",
      "host_cam_feature_2": "Programme de partage des revenus",
      "host_cam_feature_3": "Support technique inclus",
      "host_cam_feature_4": "Promouvoir votre emplacement",
      "become_camera_host": "Devenir Hôte de Caméra",
      
      // Benefits section
      "why_sponsor": "Pourquoi Sponsoriser Surf au Maroc ?",
      "monthly_visitors": "Visiteurs Mensuels",
      "monthly_visitors_desc": "Atteignez des milliers d'amateurs de surf du monde entier",
      "live_coverage": "Couverture Live",
      "live_coverage_desc": "Votre marque visible 24h/24 sur les flux en direct",
      "surf_focused": "Axé sur le Surf",
      "surf_focused_desc": "Audience ciblée de surfeurs passionnés et d'amateurs de sports nautiques",
      
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
       "coming_soon_count": "Bientôt Disponible :",
       "forecasts": "Prévisions",
      
      // News Page
      "news_subtitle": "Restez informé des dernières conditions de surf, prévisions et actualités du Maroc",
      "read_more": "Lire la Suite",
      "conditions": "Conditions",
      "technology": "Technologie",
      "forecast": "Prévisions",
      "perfect_waves_title": "Vagues Parfaites à Taghazout Cette Semaine",
      "perfect_waves_excerpt": "Les surfeurs affluent vers la capitale du surf du Maroc alors que les houles atlantiques offrent des conditions parfaites",
      "new_camera_title": "Nouvelle Installation de Caméra Live à Imsouane", 
      "new_camera_excerpt": "Découvrez le célèbre break de droite en temps réel avec notre nouvelle caméra HD",
      "winter_forecast_title": "Prévisions Houle d'Hiver : À Quoi S'Attendre",
      "winter_forecast_excerpt": "Nos météorologues analysent les modèles de houle hivernale à venir pour le Maroc",
      
      // Featured Banner
      "good_conditions_alert": "Alerte Bonnes Conditions !",
      "perfect_surf_conditions": "Conditions de surf parfaites détectées à Plage de Mehdia - vagues de 2.1m avec vent offshore",
      "excellent_surf_badge": "🏄‍♂️ Excellentes Conditions de Surf",
      "interactive_surf_spots_map": "Carte Interactive des Spots de Surf",
      "live_hd_cameras": "Caméras HD en Direct",
      "live_cameras_description": "Regardez les conditions de surf en temps réel aux meilleurs spots de surf du Maroc avec des flux de caméras HD cristallins",
      "accurate_forecasts": "Prévisions Précises",
      "forecasts_description": "Obtenez des prévisions de surf précises sur 7 jours avec la hauteur des vagues, les conditions de vent et les informations de marée",
      "local_community": "Communauté Locale",
      
      // Surf Spot Info Translations
      "beginner": "Débutant",
      "intermediate": "Intermédiaire", 
      "advanced": "Avancé",
      "expert": "Expert",
      "beach_break": "Beach Break",
      "point_break": "Point Break", 
      "reef_break": "Reef Break",
      "low": "Faible",
      "medium": "Moyen",
      "high": "Élevé",
      "autumn": "Automne",
      "winter": "Hiver",
      "spring": "Printemps",
      "summer": "Été",
      "skill_level": "Niveau de Compétence",
      "wave_type": "Type de Vague",
      "crowd_level": "Niveau d'Affluence",
      "best_seasons": "Meilleures Saisons",
      "community_description": "Connectez-vous avec la communauté de surf du Maroc et restez informé des événements et nouvelles locaux",
      "ready_to_surf_morocco": "Prêt à Surfer au Maroc?",
      "join_surfers_description": "Rejoignez des milliers de surfeurs utilisant déjà SurfMaroc pour trouver les vagues parfaites",
      "watch_now": "Regarder Maintenant",
      "view_forecasts": "Voir les Prévisions",
      "join_community": "Rejoindre la Communauté", 
      "start_watching": "Commencer à Regarder",
      "support_us": "Nous Soutenir",
      "watch_live_cameras": "Regarder les Caméras en Direct",
      "home_hero_subtitle": "Découvrez les conditions de surf en temps réel aux meilleurs spots du Maroc",
      
      // About Page
      "our_story": "Notre Histoire",
      "about_story_p1": "Surf au Maroc est né d'une idée simple en 2001 : rendre la culture surf incroyable du Maroc plus accessible aux surfeurs marocains et du monde entier. Avec ses 2 500 kilomètres de côte atlantique, le Maroc offre certaines des conditions de surf les plus constantes et diversifiées au monde. L'idée est d'avoir un œil sur ses meilleurs spots en direct.",
      "about_story_p2": "Notre plateforme combine une technologie de pointe avec une expertise locale pour fournir des conditions de surf en temps réel, des prévisions météo et des flux de caméras live depuis les destinations surf les plus prisées du Maroc. Des vagues puissantes de Taghazout aux breaks doux de la plage de Mehdia, nous sommes là pour vous aider à trouver la vague parfaite.",
      "about_story_p3": "Plus qu'un simple service de prévisions, Surf au Maroc est une célébration du riche patrimoine côtier du Maroc et de la communauté surf internationale grandissante qui considère ces eaux comme leur maison.",
      "our_mission": "Notre Mission",
      "mission_text": "Fournir la plateforme de prévisions de surf la plus précise, accessible et complète pour le Maroc, en soutenant les communautés de surf locales et internationales tout en promouvant un tourisme côtier durable.",
      "our_vision": "Notre Vision",
      "vision_text": "Devenir la ressource de référence pour les conditions de surf au Maroc et en Afrique du Nord, en favorisant une communauté mondiale de surfeurs tout en préservant et célébrant la culture côtière unique du Maroc.",
      "our_values": "Nos Valeurs",
      "transparency": "Transparence",
      "transparency_desc": "Données météo et conditions de surf en temps réel et précises en qui vous pouvez avoir confiance",
      "community": "Communauté",
      "community_desc": "Soutenir la communauté surf du Maroc et promouvoir la culture locale",
      "innovation": "Innovation", 
      "innovation_desc": "Technologie de pointe pour améliorer votre expérience surf",
      "excellence": "Excellence",
      "excellence_desc": "Engagé à fournir la meilleure plateforme de prévisions surf",
      "our_journey": "Notre Parcours",
      "milestone_1": "Lancement de Surf au Maroc avec la première caméra live à la plage de Mehdia",
      "milestone_2": "Support multilingue ajouté (Français, Anglais, Arabe)",
      "milestone_3": "Partenariat avec Open-Meteo pour des données météo précises",
      "milestone_4": "Réseau croissant de spots de surf à travers le Maroc",
      "our_team": "Notre Équipe",
      "founder_role": "Fondateur & PDG",
      "founder_desc": "Surfeur professionnel et entrepreneur tech passionné par la culture surf du Maroc.",
      "tech_head_role": "Responsable Technologie",
      "tech_head_desc": "Expert en technologie de streaming live et intégration de données météo.",
      "forecaster_role": "Prévisionniste Surf",
      "forecaster_desc": "Météorologue marin avec plus de 15 ans d'expérience des conditions météo atlantiques.",
      "platform_stats": "Statistiques Plateforme",
      "surf_spots_count": "Spots de Surf :",
      "live_cameras_count": "Caméras Live :",
      "growing": "1 (En croissance)",
      "languages_count": "Langues :",
      "data_updates": "Mises à jour :",
      "data_updates_freq": "4x par jour",
      "join_mission": "Rejoignez Notre Mission",
      "join_mission_desc": "Partenaire avec nous pour étendre le réseau de surveillance surf du Maroc",
      "get_in_touch": "Nous Contacter",
      
      // Contact Page
      "contact_subtitle": "Contactez notre équipe pour des partenariats, support technique, ou toute question sur Surf au Maroc",
      "send_message": "Envoyez-nous un message",
      "full_name": "Nom Complet",
      "email_address": "Adresse Email",
      "inquiry_type": "Type de Demande",
      "select_inquiry_type": "Sélectionnez le type de demande",
      "sponsorship_inquiry": "Demande de Sponsoring",
      "camera_hosting": "Hébergement Caméra",
      "technical_support": "Support Technique", 
      "partnership": "Partenariat",
      "media_inquiry": "Demande Média",
      "other": "Autre",
      "subject": "Sujet",
      "message": "Message",
      "send_message_btn": "Envoyer le Message",
      "contact_information": "Informations de Contact",
      "email": "Email",
      "phone": "Téléphone",
      "location": "Localisation",
      "quick_actions": "Actions Rapides",
      "camera_installation": "Installation Caméra",
      "sponsorship_packages": "Packages de Sponsoring",
      "partnership_opportunities": "Opportunités de Partenariat",
      "fast_response": "Réponse Rapide",
      "response_time_desc": "Nous répondons généralement à toutes les demandes dans les 24 heures pendant les jours ouvrables.",
      "business_hours": "Heures d'Ouverture :",
      "business_hours_time": "Lundi - Vendredi : 9h00 - 18h00 (GMT)",
      "faq": "Questions Fréquemment Posées",
      "faq_sponsor_q": "Comment puis-je sponsoriser un spot de surf ?",
      "faq_sponsor_a": "Visitez notre page de sponsoring pour voir les packages disponibles, ou contactez-nous directement pour des opportunités de sponsoring personnalisées.",
      "faq_camera_q": "Puis-je héberger une caméra à mon emplacement ?",
      "faq_camera_a": "Oui ! Nous recherchons toujours de nouveaux emplacements pour caméras. Contactez-nous pour discuter des exigences techniques et conditions de partenariat.",
      "faq_forecast_q": "Quelle est la précision des prévisions météo ?",
      "faq_forecast_a": "Nos prévisions utilisent les données d'Open-Meteo et sont mises à jour quatre fois par jour pour une précision maximale.",
      "faq_stream_q": "Le streaming live est-il disponible 24h/24 et 7j/7 ?",
      "faq_stream_a": "Oui, nos caméras live fonctionnent en continu. Les fenêtres de maintenance occasionnelles sont annoncées à l'avance.",
      
      // Surf Spot Detail Page
      "current_conditions": "Conditions Actuelles",
      "spot_information": "Informations du Spot",
      "sunrise": "Lever du Soleil",
      "sunset": "Coucher du Soleil",
      "unable_to_load_weather": "Impossible de charger les données météo",
      "camera_installation_planned": "Installation de caméra prévue"
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
      "stream_unavailable": "Stream Unavailable",
      
      // 404 Page
      "page_not_found": "Page not found",
      "page_not_found_message": "Oops! The page you're looking for doesn't exist",
      "return_home": "Return Home",
      
      // Map Interface
      "click_marker_explore": "Click on a marker to explore Morocco's surf spots",
      "select_surf_spot": "Select a Surf Spot",
      "click_marker_details": "Click on a marker on the map to see details for that surf spot",
      "quick_stats": "Quick Stats",
      "total_spots": "Total Spots:",
      "live_cameras": "Live Cameras:",
      "coming_soon_count": "Coming Soon:",
      "forecasts": "Forecasts",
      
      // News Page
      "news_subtitle": "Stay updated with the latest surf conditions, forecasts and news from Morocco",
      "read_more": "Read More",
      "conditions": "Conditions",
      "technology": "Technology",
      "forecast": "Forecast",
      "perfect_waves_title": "Perfect Waves at Taghazout This Week",
      "perfect_waves_excerpt": "Surfers flock to Morocco's surf capital as Atlantic swells deliver perfect conditions",
      "new_camera_title": "New Live Camera Installation at Imsouane", 
      "new_camera_excerpt": "Experience the famous right-hand break in real-time with our new HD camera",
      "winter_forecast_title": "Winter Swell Forecast: What to Expect",
      "winter_forecast_excerpt": "Our meteorologists analyze upcoming winter swell patterns for Morocco",
      
      // Featured Banner
      "good_conditions_alert": "Good Conditions Alert!",
      "perfect_surf_conditions": "Perfect surf conditions detected at Mehdia Beach - 2.1m waves with offshore wind",
      "excellent_surf_badge": "🏄‍♂️ Excellent Surf Conditions",
      "interactive_surf_spots_map": "Interactive Surf Spots Map",
      "live_hd_cameras": "Live HD Cameras",
      "live_cameras_description": "Watch real-time surf conditions at Morocco's best surf spots with crystal clear HD camera feeds",
      "accurate_forecasts": "Accurate Forecasts", 
      "forecasts_description": "Get precise 7-day surf forecasts with wave height, wind conditions, and tide information",
      "local_community": "Local Community",
      "community_description": "Connect with Morocco's surf community and stay updated with local events and news",
      "ready_to_surf_morocco": "Ready to Surf Morocco?",
      "join_surfers_description": "Join thousands of surfers already using SurfMaroc to find the perfect waves",
      "watch_now": "Watch Now",
      "view_forecasts": "View Forecasts", 
      "join_community": "Join Community",
      "start_watching": "Start Watching",
      "support_us": "Support Us",
      "watch_live_cameras": "Watch Live Cameras",
      
      // Surf Spot Detail Page  
      "current_conditions": "Current Conditions",
      "spot_information": "Spot Information",
      "skill_level": "Skill Level",
      "wave_type": "Wave Type",
      "crowd_level": "Crowd Level", 
      "best_seasons": "Best Seasons",
      "sunrise": "Sunrise",
      "sunset": "Sunset",
      "unable_to_load_weather": "Unable to load weather data",
      "camera_installation_planned": "Camera installation planned"
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