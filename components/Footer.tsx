'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';

type TranslationValue = string | string[] | { [key: string]: unknown };

interface FooterProps {
  messages: Record<string, TranslationValue>;
  locale?: string;
}

const Footer = ({ messages, locale = 'de' }: FooterProps) => {
  const t = (key: string) => {
    const keys = key.split('.');
    let value: unknown = messages.footer;
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  const servicesData = messages.services as Record<string, unknown>;
  const items = servicesData?.items as Record<string, Record<string, string>>;
  
  const services = [
    items?.painting?.title || 'Painting Services',
    items?.plastering?.title || 'Plastering Services',
    items?.facade?.title || 'Facade Renovation',
    items?.decorative?.title || 'Decorative Techniques',
    items?.mold?.title || 'Mold Remediation',
    items?.flooring?.title || 'Floor Coverings',
  ];

  const basePath = locale === 'de' ? '' : `/${locale}`;

  const quickLinks = [
    { href: '/', label: t('links.home') },
    { href: '#dienstleistungen', label: t('links.services') },
    { href: '#uber-uns', label: t('links.about') },
    { href: '#kontakt', label: t('links.contact') },
    { href: `${basePath}/impressum`, label: t('links.imprint') },
    { href: `${basePath}/privacy`, label: t('links.privacy') },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-base py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-48 h-14">
                <Image
                  src="/images/pintaro-logo.png"
                  alt="Pintaro - Maler & Gipser"
                  fill
                  className="object-contain brightness-0 invert"
                  priority
                />
              </div>
            </Link>
            <p className="mb-4">
              {t('description')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/p/Pintaro-100063611643810/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 rounded-lg flex items-center justify-center transition-colors hover:bg-[#5ab324]"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="#dienstleistungen"
                    className="transition-colors hover:text-[#5ab324]"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[#5ab324]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5" style={{color: '#5ab324'}} />
                <div>
                  <a href="tel:+41765203556" className="transition-colors hover:text-[#5ab324]">
                    +41 76 520 35 56
                  </a>
                  <br/>
                  <a href="tel:+41765687422" className="transition-colors hover:text-[#5ab324]">
                    +41 76 568 74 22
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5" style={{color: '#5ab324'}} />
                <div>
                  <a href="mailto:welcome@pintaro.ch" className="transition-colors hover:text-[#5ab324]">
                    welcome@pintaro.ch
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5" style={{color: '#5ab324'}} />
                <div>
                  {t('address.street')}<br />
                  {t('address.city')}<br />
                  {t('address.country')}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              {t('copyright')}
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/agb" className="transition-colors hover:text-[#5ab324]">
                {t('links.terms')}
              </Link>
              <Link href={`${basePath}/impressum`} className="transition-colors hover:text-[#5ab324]">
                {t('links.imprint')}
              </Link>
              <Link href={`${basePath}/privacy`} className="transition-colors hover:text-[#5ab324]">
                {t('links.privacy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;