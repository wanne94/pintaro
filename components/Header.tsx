'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

type TranslationValue = string | string[] | { [key: string]: unknown };

interface HeaderProps {
  messages: Record<string, TranslationValue>;
  locale: string;
}

const Header = ({ messages, locale }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = (key: string) => {
    const keys = key.split('.');
    let value: unknown = messages.header;
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  const navItems = [
    { href: locale === 'de' ? '/' : `/${locale}`, label: t('home') },
    { href: '#dienstleistungen', label: t('services') },
    { href: '#uber-uns', label: t('about') },
    { href: '#kontakt', label: t('contact') },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-sm">
      <div className="container-base">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={locale === 'de' ? '/' : `/${locale}`} className="flex items-center">
            <div className="relative w-32 sm:w-40 md:w-48 h-10 sm:h-12 md:h-14">
              <Image
                src="/images/pintaro-logo.png"
                alt="Pintaro - Maler & Gipser"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 font-medium transition-colors hover:text-[#5ab324]"
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <a
              href="tel:+41765203556"
              className="flex items-center gap-2 text-white px-6 py-3 rounded-lg transition-colors" style={{backgroundColor: '#5ab324'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9420'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5ab324'}
            >
              <Phone className="w-4 h-4" />
              <span>{t('call')}</span>
            </a>
          </nav>

          {/* Mobile Menu Button and Language Switcher */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t animate-slideDown">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 font-medium transition-all py-4 px-2 min-h-[48px] flex items-center hover:text-[#5ab324] hover:bg-gray-50 rounded-lg active:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="tel:+41765203556"
                className="flex items-center justify-center gap-2 text-white px-6 py-4 min-h-[56px] rounded-lg transition-all font-medium mt-2 active:scale-95" style={{backgroundColor: '#5ab324'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9420'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5ab324'}
              >
                <Phone className="w-4 h-4" />
                <span>{t('call')}</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;