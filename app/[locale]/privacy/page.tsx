import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getMessages } from '@/lib/i18n';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Clock, Users, Cookie, Mail } from 'lucide-react';

export default async function PrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const t = messages.privacy;

  return (
    <>
      <Header messages={messages} locale={locale} />
      <main className="min-h-screen bg-white">
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back button */}
            <Link 
              href={locale === 'de' ? '/' : `/${locale}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#5ab324] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === 'de' ? 'Zurück zur Startseite' : 
               locale === 'en' ? 'Back to Homepage' : 
               'Torna alla Homepage'}
            </Link>

            {/* Page Title */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#e8f5e1]">
                <Shield className="w-8 h-8 text-[#5ab324]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t.title}
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                {t.subtitle}
              </p>
              <p className="text-sm text-gray-500">
                {t.lastUpdated}
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-12 p-6 bg-[#e8f5e1] rounded-lg">
              <p className="text-lg text-gray-800 leading-relaxed">
                {t.intro}
              </p>
            </div>

            {/* Privacy Sections */}
            <div className="space-y-12">
              {/* Controller */}
              <section className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {t.controller}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t.controllerInfo}
                  </p>
                </div>
              </section>

              {/* Data Collection */}
              <section className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {t.dataCollection}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t.dataCollectionText}
                  </p>
                </div>
              </section>

              {/* Purpose */}
              <section className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {t.purpose}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t.purposeText}
                  </p>
                </div>
              </section>

              {/* Legal Basis */}
              <section className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {t.legalBasis}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t.legalBasisText}
                  </p>
                </div>
              </section>

              {/* Storage */}
              <section className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {t.storage}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t.storageText}
                  </p>
                </div>
              </section>

              {/* Rights */}
              <section className="p-6 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {t.rights}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t.rightsText}
                </p>
              </section>

              {/* Cookies */}
              <section className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {t.cookies}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t.cookiesText}
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section className="p-6 border-l-4 border-[#5ab324] bg-[#e8f5e1]">
                <div className="flex items-start gap-3">
                  <Mail className="w-6 h-6 text-[#5ab324] mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {t.contact}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {t.contactText}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer messages={messages} locale={locale} />
    </>
  );
}

export function generateStaticParams() {
  return [
    { locale: 'de' },
    { locale: 'en' },
    { locale: 'it' }
  ];
}