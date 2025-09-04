'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

type TranslationValue = string | string[] | { [key: string]: unknown };

interface ContactProps {
  messages: Record<string, TranslationValue>;
}

const Contact = ({ messages }: ContactProps) => {
  const t = (key: string) => {
    const keys = key.split('.');
    let value: unknown = messages;
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Get current locale from URL or default to 'de'
      const locale = window.location.pathname.split('/')[1] || 'de';
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale: locale,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: locale === 'de' ? 'Vielen Dank! Wir werden uns bald bei Ihnen melden.' :
                   locale === 'it' ? 'Grazie! Vi contatteremo presto.' :
                   'Thank you! We will contact you soon.'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: locale === 'de' ? 'Fehler beim Senden. Bitte versuchen Sie es später erneut.' :
                   locale === 'it' ? 'Errore nell\'invio. Riprova più tardi.' :
                   'Error sending message. Please try again later.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('info.phone'),
      content: '+41 76 520 35 56 / +41 76 568 74 22',
      link: 'tel:+41765203556',
    },
    {
      icon: Mail,
      title: t('info.email'),
      content: 'welcome@pintaro.ch',
      link: 'mailto:welcome@pintaro.ch',
    },
    {
      icon: MapPin,
      title: t('info.address'),
      content: t('info.addressText'),
      link: null,
    },
    {
      icon: Clock,
      title: t('info.hours'),
      content: t('info.hoursText'),
      link: null,
    },
  ];

  return (
    <section id="kontakt" className="section-padding bg-gray-50">
      <div className="container-base">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Two Rows with alternating image-text layout */}
        <div className="mb-16 space-y-12">
          {/* First Row: Image on left, text on right */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="/images/pintaro-car-logo.jpg"
                alt="Pintaro Fahrzeug mit Logo"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Ihr zuverlässiger Partner
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Mit über 20 Jahren Erfahrung sind wir Ihr vertrauenswürdiger Partner für alle Maler- und Gipserarbeiten. 
                Unser professionelles Team steht für Qualität, Präzision und Zuverlässigkeit.
              </p>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#5ab324] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Professionelle Beratung und Planung</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#5ab324] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Hochwertige Materialien und Ausführung</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#5ab324] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Pünktliche und saubere Arbeitsweise</span>
              </div>
            </div>
          </div>

          {/* Second Row: Text on left, image on right */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 md:order-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Kostenlose Beratung
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Wir sind für Sie da! Kontaktieren Sie uns für eine kostenlose Beratung und ein unverbindliches Angebot. 
                Gemeinsam finden wir die perfekte Lösung für Ihr Projekt.
              </p>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#5ab324] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Individuelle Lösungen nach Ihren Wünschen</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#5ab324] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Transparente und faire Preisgestaltung</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#5ab324] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Garantie auf alle ausgeführten Arbeiten</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl bg-white md:order-2">
              <Image 
                src="/images/pintaro-car-branding.png"
                alt="Pintaro Fahrzeugbeschriftung"
                fill
                className="object-contain hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('form.title')}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5ab324] focus:border-transparent"
                      placeholder={t('form.name')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.phone')} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5ab324] focus:border-transparent"
                      placeholder="+41 00 000 00 00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5ab324] focus:border-transparent"
                    placeholder="email@example.ch"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.service')}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-4 text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5ab324] focus:border-transparent text-gray-900 appearance-none cursor-pointer"
                    style={{ backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23666\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"%3E%3Cpath d=\"m6 9 6 6 6-6\"%3E%3C/path%3E%3C/svg%3E')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '3rem' }}
                  >
                    <option value="" className="text-gray-600">{t('form.selectService')}</option>
                    <option value="polishing" className="text-gray-900">{t('form.services.polishing')}</option>
                    <option value="dent_removal" className="text-gray-900">{t('form.services.dentRemoval')}</option>
                    <option value="small_paint_jobs" className="text-gray-900">{t('form.services.smallPaint')}</option>
                    <option value="complete_paint_jobs" className="text-gray-900">{t('form.services.completePaint')}</option>
                    <option value="car_wrapping" className="text-gray-900">{t('form.services.wrapping')}</option>
                    <option value="lettering" className="text-gray-900">{t('form.services.lettering')}</option>
                    <option value="other" className="text-gray-900">{t('form.services.other')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5ab324] focus:border-transparent resize-none"
                    placeholder={t('form.messagePlaceholder')}
                  />
                </div>

                {submitStatus.type && (
                  <div className={`p-4 rounded-lg ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 text-white text-base px-6 py-4 min-h-[56px] rounded-lg transition-colors font-semibold ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`} 
                  style={{backgroundColor: isSubmitting ? '#4a9420' : '#5ab324'}}
                  onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#4a9420')}
                  onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#5ab324')}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{window.location.pathname.split('/')[1] === 'it' ? 'Invio in corso...' : window.location.pathname.split('/')[1] === 'en' ? 'Sending...' : 'Wird gesendet...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('form.submit')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('info.title')}
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const content = info.link ? (
                    <a href={info.link} className="hover:opacity-80" style={{color: '#5ab324'}}>
                      {info.content}
                    </a>
                  ) : (
                    <span className="text-gray-700">{info.content}</span>
                  );
                  
                  return (
                    <div key={info.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#e8f5e1'}}>
                        <Icon className="w-6 h-6" style={{color: '#5ab324'}} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 mb-1">{info.title}</div>
                        {content}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl p-8 text-white" style={{backgroundColor: '#5ab324'}}>
              <h3 className="text-2xl font-semibold mb-4">
                {t('why.title')}
              </h3>
              <ul className="space-y-3">
                {[0, 1, 2, 3].map(i => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="block w-2 h-2 bg-white rounded-full mt-1.5 flex-shrink-0" />
                    <span>{t(`why.reasons.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;