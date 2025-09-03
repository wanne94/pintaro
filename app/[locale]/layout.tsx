import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { getMessages, isValidLocale } from '@/lib/i18n';

export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'it' }];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!isValidLocale(locale)) {
    notFound();
  }
  
  const messages = await getMessages(locale);

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
    keywords: messages.metadata.keywords,
    authors: [{ name: "Pintaro.ch" }],
    openGraph: {
      title: messages.metadata.title,
      description: messages.metadata.description,
      type: "website",
      locale: locale === 'de' ? 'de_CH' : locale === 'it' ? 'it_CH' : 'en_US',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = "${locale}";`,
        }}
      />
      {children}
    </>
  );
}