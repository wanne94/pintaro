import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getMessages } from '@/lib/i18n';

export default async function Home() {
  // Default to German for root page
  const locale = 'de';
  const messages = await getMessages(locale);

  return (
    <>
      <Header messages={messages} locale={locale} />
      <main>
        <Hero messages={messages.hero} />
        <Services messages={messages.services} locale={locale} />
        <About messages={messages.about} />
        <Gallery messages={messages} locale={locale} />
        <Contact messages={messages.contact} />
      </main>
      <Footer messages={messages} />
    </>
  );
}