'use client';

import { useState } from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
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
    <section id="kontakt" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('form.title')}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5ab324] focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5ab324] focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5ab324] focus:border-transparent"
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
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5ab324] focus:border-transparent text-gray-900 appearance-none cursor-pointer"
                    style={{ backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23666\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"%3E%3Cpath d=\"m6 9 6 6 6-6\"%3E%3C/path%3E%3C/svg%3E')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '3rem' }}
                  >
                    <option value="" className="text-gray-600">{t('form.selectService')}</option>
                    <option value="malerarbeiten" className="text-gray-900">{t('form.services.painting')}</option>
                    <option value="gipserarbeiten" className="text-gray-900">{t('form.services.plastering')}</option>
                    <option value="fassadenrenovation" className="text-gray-900">{t('form.services.facade')}</option>
                    <option value="dekorative" className="text-gray-900">{t('form.services.decorative')}</option>
                    <option value="schimmelsanierung" className="text-gray-900">{t('form.services.mold')}</option>
                    <option value="bodenbelaege" className="text-gray-900">{t('form.services.flooring')}</option>
                    <option value="andere" className="text-gray-900">{t('form.services.other')}</option>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5ab324] focus:border-transparent"
                    placeholder={t('form.messagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 text-white px-6 py-4 rounded-lg transition-colors font-semibold" style={{backgroundColor: '#5ab324'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9420'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5ab324'}
                >
                  <Send className="w-5 h-5" />
                  {t('form.submit')}
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