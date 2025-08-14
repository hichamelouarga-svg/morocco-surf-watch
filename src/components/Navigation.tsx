import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from './LanguageSelector';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Waves, Sun, Moon, LogOut, User } from 'lucide-react';

export const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'surf_spots', path: '/surf-spots' },
    { key: 'live_cams', path: '/live-cams' },
    { key: 'news', path: '/news' },
    { key: 'sponsor', path: '/sponsor' },
    { key: 'contact', path: '/contact' },
    { key: 'about', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-ocean shadow-ocean">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-white">
            <Waves className="w-8 h-8" />
            <span className="font-display font-bold text-xl">Surf au Maroc</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`text-white hover:text-primary-light transition-colors font-medium ${
                  location.pathname === item.path ? 'text-accent' : ''
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-white hover:bg-white/20 p-2"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            
            <LanguageSelector />
            
            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <User className="w-4 h-4 mr-2" />
                  {user.email}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-white hover:bg-white/20"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button asChild variant="secondary" size="sm">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark Mode Toggle for Mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-white hover:bg-white/20 p-2"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            
            <LanguageSelector />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/20"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary-dark/95 backdrop-blur-sm rounded-b-lg">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`block py-2 text-white hover:text-primary-light transition-colors ${
                    location.pathname === item.path ? 'text-accent' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
               ))}
               
               {/* Mobile Auth Section */}
               <div className="border-t border-white/20 pt-2 mt-2">
                 {user ? (
                   <div className="space-y-2">
                     <div className="py-2 text-white text-sm">
                       <User className="w-4 h-4 inline mr-2" />
                       {user.email}
                     </div>
                     <Button
                       variant="ghost"
                       size="sm"
                       onClick={signOut}
                       className="w-full justify-start text-white hover:bg-white/20"
                     >
                       <LogOut className="w-4 h-4 mr-2" />
                       Sign Out
                     </Button>
                   </div>
                 ) : (
                   <Button asChild variant="secondary" size="sm" className="w-full">
                     <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                   </Button>
                 )}
               </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};