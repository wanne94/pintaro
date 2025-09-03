import { notFound } from 'next/navigation';
import ServiceDetail from '@/components/ServiceDetail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = ['painting', 'plastering', 'facade', 'decorative', 'mold', 'flooring'];

interface PageProps {
  params: Promise<{
    locale: string;
    service: string;
  }>;
}

export async function generateStaticParams() {
  const locales = ['de', 'en', 'it'];
  const params = [];
  
  for (const locale of locales) {
    for (const service of services) {
      params.push({ locale, service });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, service } = await params;
  
  if (!services.includes(service)) {
    return {};
  }
  
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    messages = (await import('@/messages/de.json')).default;
  }
  
  const serviceTitle = messages.services?.items?.[service]?.title || service;
  const siteName = 'Pintaro.ch';
  
  return {
    title: `${serviceTitle} | ${siteName}`,
    description: messages.services?.items?.[service]?.description || '',
    openGraph: {
      title: `${serviceTitle} | ${siteName}`,
      description: messages.services?.items?.[service]?.description || '',
      type: 'website',
      locale: locale === 'de' ? 'de_CH' : locale === 'it' ? 'it_CH' : 'en_US',
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, service } = await params;
  
  if (!services.includes(service)) {
    notFound();
  }
  
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    messages = (await import('@/messages/de.json')).default;
  }
  
  return (
    <>
      <Header messages={messages} locale={locale} />
      <ServiceDetail 
        service={service} 
        messages={messages} 
        locale={locale}
      />
      <Footer messages={messages} />
    </>
  );
}