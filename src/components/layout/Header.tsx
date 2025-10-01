'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from '../LanguageSwitcher';

interface NavigationItem {
  id: string;
  labelKey: string;
  href: string;
  section?: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'home', labelKey: 'navigation.home', href: '#hero', section: 'hero' },
  { id: 'about', labelKey: 'navigation.about', href: '#about', section: 'about' },
  { id: 'products', labelKey: 'navigation.products', href: '#products', section: 'products' },
  { id: 'contact', labelKey: 'navigation.contact', href: '#contact', section: 'contact' },
];

interface HeaderProps {
  locale: 'ko' | 'en';
  currentSection?: string;
}

export default function Header({ locale, currentSection }: HeaderProps) {
  const t = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(currentSection || 'hero');

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.section).filter(Boolean);
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId!);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top <= 100 && rect.bottom >= 100;
          
          if (isInView) {
            setActiveSection(sectionId!);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling to sections
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href={`/${locale}`}
              className="flex items-center"
              onClick={() => handleSectionClick('hero')}
            >
              <div className="text-2xl lg:text-3xl font-bold text-[#0082FB] hover:text-[#0064E0] transition-colors">
                HYPERSTONE
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => item.section && handleSectionClick(item.section)}
                className={`text-sm lg:text-base font-medium transition-colors duration-200 hover:text-[#0082FB] ${
                  activeSection === item.section
                    ? 'text-[#0082FB] border-b-2 border-[#0082FB] pb-1'
                    : isScrolled
                    ? 'text-[#1C2B33]'
                    : 'text-white'
                }`}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </nav>

          {/* Desktop Language Switcher */}
          <div className="hidden md:flex items-center">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden mobile-menu-container">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isScrolled ? 'text-[#1C2B33]' : 'text-white'
              } hover:text-[#0082FB] focus:outline-none focus:ring-2 focus:ring-[#0082FB]`}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                <div className="px-4 py-3 border-b border-gray-100">
                  <LanguageSwitcher />
                </div>
                
                <nav className="py-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => item.section && handleSectionClick(item.section)}
                      className={`w-full text-left px-4 py-3 text-base font-medium transition-colors hover:bg-[#F1F5F8] hover:text-[#0082FB] ${
                        activeSection === item.section
                          ? 'text-[#0082FB] bg-[#F1F5F8] border-r-4 border-[#0082FB]'
                          : 'text-[#1C2B33]'
                      }`}
                    >
                      {t(item.labelKey)}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}