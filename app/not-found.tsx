'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">
                Pintaro<span style={{color: '#5ab324'}}>.ch</span>
              </span>
            </Link>
            
            <nav className="flex items-center space-x-8">
              <a
                href="tel:+41765203556"
                className="flex items-center gap-2 text-white px-6 py-3 rounded-lg transition-colors hover:opacity-90"
                style={{backgroundColor: '#5ab324'}}
              >
                <Phone className="w-4 h-4" />
                <span>Anrufen</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-3xl w-full text-center py-20">
          {/* 404 with brand color */}
          <h1 className="text-[180px] font-bold leading-none mb-8" style={{color: '#5ab324', opacity: 0.2}}>
            404
          </h1>
          
          {/* Error Message */}
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Seite nicht gefunden
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Die angeforderte Seite konnte leider nicht gefunden werden. 
            Möglicherweise wurde sie verschoben oder existiert nicht mehr.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-white font-semibold transition-all hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: '#5ab324' }}
            >
              Zur Startseite
            </Link>
            
            <Link
              href="/#kontakt"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
            >
              Kontakt aufnehmen
            </Link>
          </div>
          
          {/* Language Selection */}
          <div className="border-t border-gray-200 pt-12">
            <p className="text-sm text-gray-500 mb-6">Wählen Sie Ihre Sprache / Choose your language / Scegli la tua lingua</p>
            <div className="flex justify-center gap-8">
              <Link
                href="/"
                className="group flex items-center gap-2 text-gray-700 hover:text-green-600 transition-all"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🇩🇪</span>
                <span className="font-medium">Deutsch</span>
              </Link>
              <Link
                href="/en"
                className="group flex items-center gap-2 text-gray-700 hover:text-green-600 transition-all"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🇬🇧</span>
                <span className="font-medium">English</span>
              </Link>
              <Link
                href="/it"
                className="group flex items-center gap-2 text-gray-700 hover:text-green-600 transition-all"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🇮🇹</span>
                <span className="font-medium">Italiano</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-2xl font-bold">
                Pintaro<span style={{color: '#5ab324'}}>.ch</span>
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Ihr Partner für professionelle Malerarbeiten
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Pintaro.ch - Alle Rechte vorbehalten
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}