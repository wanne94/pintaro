import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getMessages } from '@/lib/i18n';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ImpressumPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const t = messages.impressum;

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
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t.title}
              </h1>
              <p className="text-xl text-gray-600">
                {t.subtitle}
              </p>
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Company Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {t.company}
                  </h2>
                  <div className="space-y-2 text-gray-700">
                    <p>{t.address}</p>
                    <p>{t.city}</p>
                    <p>{t.country}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t.contact}
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p>{t.phone}</p>
                    <p>{t.email}</p>
                  </div>
                </div>
              </div>

              {/* Legal Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t.management}
                  </h3>
                  <p className="text-gray-700">{t.manager}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t.register}
                  </h3>
                  <p className="text-gray-700">{t.registerInfo}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t.vatId}
                  </h3>
                  <p className="text-gray-700">{t.vatNumber}</p>
                </div>
              </div>
            </div>


            {/* Disclaimer */}
            <div className="mt-12 p-6 border-l-4 border-[#5ab324] bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t.disclaimer}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t.disclaimerText}
              </p>
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