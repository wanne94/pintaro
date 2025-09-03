import { notFound } from 'next/navigation';
import ServiceDetail from '@/components/ServiceDetail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = ['painting', 'plastering', 'facade', 'decorative', 'mold', 'flooring'];

interface PageProps {
  params: Promise<{
    service: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    service,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { service } = await params;
  
  if (!services.includes(service)) {
    return {};
  }
  
  const messages = (await import('@/messages/it.json')).default;
  
  const serviceTitle = messages.services?.items?.[service as keyof typeof messages.services.items]?.title || service;
  const siteName = 'Pintaro.ch';
  
  return {
    title: `${serviceTitle} | ${siteName}`,
    description: messages.services?.items?.[service as keyof typeof messages.services.items]?.description || '',
    openGraph: {
      title: `${serviceTitle} | ${siteName}`,
      description: messages.services?.items?.[service as keyof typeof messages.services.items]?.description || '',
      type: 'website',
      locale: 'it_CH',
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { service } = await params;
  
  if (!services.includes(service)) {
    notFound();
  }
  
  const messages = (await import('@/messages/it.json')).default;
  const locale = 'it';
  
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