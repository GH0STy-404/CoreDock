import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Mail, MapPin, Sun, Moon } from 'lucide-react';
import { useTranslation } from '../providers/LocaleProvider';
import { useAppTheme } from '../providers/ThemeProvider';
import { BRAND_CONFIG } from '../config/brand';
import CanvasBackground from '../components/CanvasBackground';

// Import logo variations
import logoDark from '../../coredock logo (white).png';  // For dark mode (black backgrounds)
import logoLight from '../../coredock logo (black).png'; // For light mode (white backgrounds)

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const { locale, t, setLocale } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t.nav.home, path: '/' },
    { name: 'Specifications', path: '/specifications' },
    { name: t.nav.materials, path: '/materials' },
    { name: t.nav.applications, path: '/applications' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.contact, path: '/contact' }
  ];

  const handleLocaleToggle = () => {
    setLocale(locale === 'en' ? 'de' : 'en');
  };

  const { themeMode, toggleTheme } = useAppTheme();

  // Select logo depending on dark/light mode
  const activeLogo = themeMode === 'dark' ? logoDark : logoLight;

  return (
    <div className="min-h-screen flex flex-col relative bg-bg-base transition-colors duration-300">
      
      {/* Background canvas */}
      <CanvasBackground />

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 w-full bg-glass border-b border-border-glass backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 select-none group flex-shrink-0">
            <img 
              src={activeLogo} 
              alt="Coredock Lab" 
              className="h-8 w-auto object-contain transition-all duration-300" 
            />
            <div className="flex flex-col select-none leading-none">
              <span className="font-outfit font-bold tracking-widest text-text-primary text-xs sm:text-sm uppercase">
                COREDOCK
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="flex-grow h-[1px] bg-brand-primary min-w-[10px]"></div>
                <span className="text-[8px] sm:text-[9px] font-outfit font-bold tracking-widest text-brand-primary uppercase">
                  LAB
                </span>
                <div className="flex-grow h-[1px] bg-brand-primary min-w-[10px]"></div>
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION — shown at md (768px+) */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-5 xl:gap-7">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-[10px] lg:text-[11px] font-outfit uppercase tracking-wider transition-all duration-300 relative py-1 whitespace-nowrap ${
                    isActive
                      ? "text-brand-primary font-bold"
                      : "text-text-secondary hover:text-text-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-primary shadow-orange-glow"></span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT ACTION BARS — desktop only */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            
            {/* Theme toggle */}
            <button
              id="themeToggleBtn"
              onClick={(e) => toggleTheme(e)}
              className="p-2 rounded bg-bg-surface/50 border border-border-glass text-text-secondary hover:text-text-primary cursor-pointer transition-colors flex items-center justify-center"
              title={themeMode === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Request Datasheet CTA */}
            <Link
              to="/contact"
              className="px-3 lg:px-4 py-1.5 rounded bg-brand-primary text-white border border-brand-primary font-outfit font-semibold tracking-wide text-[10px] lg:text-xs uppercase hover:bg-transparent hover:text-brand-primary transition-all duration-300 shadow-orange-glow whitespace-nowrap"
            >
              Request Datasheet
            </Link>

          </div>

          {/* MOBILE CONTROLS — shown below md */}
          <div className="md:hidden flex items-center gap-2 flex-shrink-0">
            {/* Theme toggle visible on mobile */}
            <button
              onClick={(e) => toggleTheme(e)}
              className="p-1.5 rounded bg-bg-surface/50 border border-border-glass text-text-secondary hover:text-text-primary cursor-pointer transition-colors flex items-center justify-center"
              title={themeMode === 'dark' ? "Light Mode" : "Dark Mode"}
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded bg-bg-surface/50 border border-border-glass text-text-secondary cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER — shown below md */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-bg-base md:hidden flex flex-col p-6 animate-fadeIn overflow-y-auto">
          <div className="flex-grow space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center text-sm font-outfit uppercase tracking-wider text-text-secondary hover:text-brand-primary py-4 border-b border-border-glass transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded bg-brand-primary text-white font-outfit font-bold text-xs uppercase shadow-orange-glow hover:bg-transparent hover:text-brand-primary border border-brand-primary transition-all"
            >
              Request Datasheet
            </Link>
          </div>
        </div>
      )}

      {/* MAIN VIEWPORT */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-bg-surface border-t border-border-primary pt-12 pb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-telemetry-nodes opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 pb-8 border-b border-border-primary/60">
            
            {/* Corporate Profile */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2.5 select-none group">
                <img 
                  src={activeLogo} 
                  alt="Coredock Lab" 
                  className="h-8 w-auto object-contain" 
                />
                <div className="flex flex-col select-none leading-none">
                  <span className="font-outfit font-bold tracking-widest text-text-primary text-xs uppercase">
                    COREDOCK
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="flex-grow h-[1px] bg-brand-primary min-w-[8px]"></div>
                    <span className="text-[8px] font-outfit font-bold tracking-widest text-brand-primary uppercase">
                      LAB
                    </span>
                    <div className="flex-grow h-[1px] bg-brand-primary min-w-[8px]"></div>
                  </div>
                </div>
              </Link>
              <p className="text-xs text-text-secondary leading-relaxed">
                Industrial-grade additive manufacturing machinery engineered for defense, aerospace, and high-precision production gantries.
              </p>
              <div className="flex items-center gap-2.5 text-text-muted">
                {BRAND_CONFIG.certifications.map((cert) => (
                  <span
                    key={cert.id}
                    className="px-1.5 py-0.5 rounded border border-border-primary text-[8px] font-outfit font-semibold text-text-muted hover:border-brand-primary hover:text-brand-primary transition-colors cursor-default"
                    title={cert.desc}
                  >
                    {cert.id.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-outfit font-bold tracking-wider text-text-primary uppercase mb-4">
                Platform Hierarchy
              </h4>
              <ul className="space-y-2 text-xs text-text-secondary font-mono">
                {BRAND_CONFIG.brandHierarchy.slice(0, 2).map((sub) => (
                  <li key={sub.name} className="flex justify-between items-center pr-4">
                    <span className={sub.active ? "text-brand-primary" : "text-text-muted"}>
                      {sub.name}
                    </span>
                    <span className="text-[9px] text-text-muted font-sans italic">{sub.desc}</span>
                  </li>
                ))}
              </ul>
            </div>



            {/* Headquarters */}
            <div className="space-y-3">
              <h4 className="text-xs font-outfit font-bold tracking-wider text-text-primary uppercase mb-4">
                Headquarters
              </h4>
              <div className="flex gap-2 text-xs text-text-secondary">
                <MapPin className="w-4 h-4 text-brand-primary flex-shrink-0" />
                <span>{BRAND_CONFIG.support.address}</span>
              </div>
              <div className="flex gap-2 text-xs text-text-secondary">
                <Mail className="w-4 h-4 text-brand-primary flex-shrink-0" />
                <span>{BRAND_CONFIG.support.salesEmail}</span>
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-text-muted gap-4">
            <div>
              © {new Date().getFullYear()} {BRAND_CONFIG.companyName} Technologies Ltd. All system telemetry logged.
            </div>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Operations</span>
              <span>ISO 9001:2015 Registration</span>
              <span>Standard Warranty: {BRAND_CONFIG.warranty.standardPeriod}</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default RootLayout;
