"use client";

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext'; // Adjust path if LanguageContext.tsx is elsewhere

const PrivacyPolicy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {t('privacy.title')}
        </h1>
        
        <div className="prose prose-indigo max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-600">
            {t('privacy.last_updated')}: October 26, 2023 (Placeholder Date)
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-2">1. {t('privacy.section1.title')}</h2>
            <p>{t('privacy.section1.content1')}</p>
            <p>{t('privacy.section1.content2')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. {t('privacy.section2.title')}</h2>
            <p>{t('privacy.section2.content1')}</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>{t('privacy.section2.list_item1')}</li>
              <li>{t('privacy.section2.list_item2')}</li>
              <li>{t('privacy.section2.list_item3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. {t('privacy.section3.title')}</h2>
            <p>{t('privacy.section3.content1')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. {t('privacy.section4.title')}</h2>
            <p>{t('privacy.section4.content1')}</p>
            <p>{t('privacy.section4.content2')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. {t('privacy.section5.title')}</h2>
            <p>{t('privacy.section5.content1')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. {t('privacy.section6.title')}</h2>
            <p>{t('privacy.section6.content1')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. {t('privacy.section7.title')}</h2>
            <p>{t('privacy.section7.content1')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. {t('privacy.section8.title')}</h2>
            <p>
              {t('privacy.section8.content1')} 
              <a href={`mailto:${t('privacy.contact_email')}`} className="text-indigo-600 hover:text-indigo-800">
                {t('privacy.contact_email')}
              </a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 